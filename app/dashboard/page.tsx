"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowDown, ArrowRight, Check, ChevronsUpDown, Dices, CircleHelp, Star, History, Redo2, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { niches, Task, tasks } from "@/constants"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabaseClient"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { User } from '@supabase/supabase-js'
import Loading from "@/components/loading"
import Footer from "@/components/footer"
import { bricolage } from "@/fonts/font"
import { sleep } from "openai/core.mjs"
import { toast, Toaster } from 'sonner'
import Combobox from "@/components/combobox"

interface ExerciseHistoryItem {
  id: string;
  title: string;
  grade: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [niche, setNiche] = useState("");
  const [task, setTask] = useState("");
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [availableTasks, setAvailableTasks] = useState<typeof tasks>([]);
  const [showAllExercises, setShowAllExercises] = useState(false);
  const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUser().then(user => {
            if (user) {
                fetchExerciseHistory(user);
            }
        });
    }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (!user) {
      router.replace('/login');
    }
    return user;
  };

  const fetchExerciseHistory = async (user: User) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('history')
      .select("id, title, grade")
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching exercise history:', error);
    } else {
      console.log(data)
      setExerciseHistory(data)
    }
  };

  const randomSelect = () => {
    const randomNiche = niches[Math.floor(Math.random() * niches.length)];
    const randomTask = randomNiche.tasks[Math.floor(Math.random() * randomNiche.tasks.length)];

    setNiche(randomNiche.value);

    const selectedTask = tasks.find(t => t.value === randomTask);
    if (selectedTask) {
      setTask(selectedTask.value);
    } else {
      setTask(tasks.find(t => randomNiche.tasks.includes(t.value))?.value || "");
    }
  };

  useEffect(() => {
    if (niche) {
      const selectedNiche = niches.find(n => n.value === niche);
      if (selectedNiche) {
        const availableTasks = tasks.filter(t => selectedNiche.tasks.includes(t.value));
        setAvailableTasks(availableTasks);
        // Only set task when changing niches and task is not empty
        if (task && !selectedNiche.tasks.includes(task as Task)) {
          setTask(availableTasks[0]?.value || "");
        }
      }
    } else {
      setAvailableTasks([]);
      setTask(""); // Reset task when niche is cleared
    }
  }, [niche, task]);

  const handleSubmit = async () => {
    if (!user) return;

    setSubmitting(true);

    // First fetch user's completed exercises
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('completed_exercises')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return;
    }

    const completedExercises = profileData?.completed_exercises || [];

    // Fetch exercises excluding completed ones
    const { data: exerciseData, error: exerciseError } = await supabase
      .from('exercise')
      .select('id,title')
      .eq('niche', niche)
      .eq('task', task)
      .not('id', 'in', `(${completedExercises.join(',')})`)

    if (exerciseError) {
      console.error('Error fetching exercise:', exerciseError);
      return;
    }

    if (!exerciseData || exerciseData.length === 0) {
      toast.info("You've completed all exercises in this category! Try another one.");
      return;
    }

    let exData = exerciseData[Math.floor(Math.random() * exerciseData.length)];

    const { data, error } = await supabase
      .from('history')
      .insert([
        {
          user_id: user.id,
          exercise_id: exData.id,
          title: exData.title,
        }
      ])
      .select();

    if (error) {
      console.error('Error creating exercise history:', error);
    } else {
      // add to completed exercises
      const updatedExercises = [...completedExercises, exData.id];
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ completed_exercises: updatedExercises })
        .eq('id', user.id);

      if (updateError) {
        toast.error('Failed to update completed exercises. Please try again.');
      } else {
        const url = `/chat/${data[0].id}`;
        router.push(url);
      }
    }
    setSubmitting(false);
  };

  if (!user) {
    return <Loading />
  }

    return (
        <>
            <Navbar />
            <Toaster position="top-center" richColors />
            <main className="flex flex-col items-center min-h-screen px-8">
                <h1 className={`${bricolage.className} mt-24 sm:mt-48 text-3xl sm:text-4xl font-bold mb-3 text-center`}>👋 Welcome, {user.email?.split('@')[0]}</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-10 text-center">
                    Customize your copywriting exercise or try a random one
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger onClick={async (event) => {
                                event.preventDefault(); // Prevent default behavior
                                const target = event.currentTarget;
                                await sleep(0);
                                target.blur();
                                target.focus();
                            }}
                                className="focus:outline-none" // Remove default focus styles
                            >
                                <span>
                                    <CircleHelp className="text-[#0d0e0f] ml-2 h-4 w-4 opacity-50 hover:opacity-100 cursor-help" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="max-w-sm text-le">
                                    You&apos;ll receive a practice client with details about their business and task. Complete the exercise to get evaluated and personalized tips for improvement!
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </p>
                <div className="py-8 items-center justify-center flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-xl">
                    <div className="flex flex-row items-center w-full sm:w-auto">
                        <Combobox
                            placeholder="1. Select a niche"
                            value={niche}
                            onChange={setNiche}
                            options={niches}
                            className={cn("w-full sm:w-[200px]", niche ? "border-green-500" : "")}
                            id="tour1-step1"
                        />
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger onClick={async (event) => {
                                    event.preventDefault(); // Prevent default behavior
                                    const target = event.currentTarget;
                                    await sleep(0);
                                    target.blur();
                                    target.focus();
                                }}
                                    className="focus:outline-none" // Remove default focus styles
                                >
                                    <span>
                                        <CircleHelp className="ml-2 h-4 w-4 opacity-50 hover:opacity-100 cursor-help" />
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        The niche determines the industry your practice-client operates in.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <ArrowRight className="hidden sm:block ml-4 sm:ml-8 h-4 w-4" />
                    </div>
                    <div className="flex flex-row items-center w-full sm:w-auto mt-4 sm:mt-0">
                        <Combobox
                            placeholder="2. Select a task"
                            value={task}
                            onChange={setTask}
                            options={availableTasks}
                            className={cn("w-full sm:w-[200px]", task ? "border-green-500" : "")}
                            disabled={!niche}
                        />
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger onClick={async (event) => {
                                    event.preventDefault(); // Prevent default behavior
                                    const target = event.currentTarget;
                                    await sleep(0);
                                    target.blur();
                                    target.focus();
                                }}
                                    className="focus:outline-none" // Remove default focus styles
                                >
                                    <span>
                                        <CircleHelp className="ml-2 h-4 w-4 opacity-50 hover:opacity-100 cursor-help" />
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        The task determines the specific type of copywriting exercise you will complete.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-row gap-4 mt-8 w-full max-w-xl">
                    <Button
                        variant="outline"
                        onClick={randomSelect}
                        className="w-full sm:w-auto active:scale-95 transition-transform duration-100"
                    >
                        <Dices className="mr-2 h-4 w-4" />
                        Random
                    </Button>
                    <Button
                        className="w-full sm:w-auto bg-[#007FFF] hover:bg-[#007FFF] text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 flex items-center justify-center"
                        disabled={!niche || !task || submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ?
                            <div className="flex items-center justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </div>
                            :
                            <div className="flex items-center justify-center">
                                <Star className="mr-2 h-4 w-4" />
                                Ready to Start!
                            </div>
                        }
                    </Button>
                </div>
                <div className="mt-16 w-full max-w-5xl mx-auto">
                    <h2 className={`${bricolage.className} text-2xl md:text-3xl font-bold mb-4 text-left flex items-center`}>
                        <History className="mr-2 h-6 w-6" />
                        Exercise History
                    </h2>
                    {exerciseHistory.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {exerciseHistory
                                    .slice(0, showAllExercises ? exerciseHistory.length : 12)
                                    .map((exercise) => (
                                        <div key={exercise.id}>
                                            <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
                                                <CardHeader className={cn(
                                                    "p-4 flex-shrink-0",
                                                    exercise.grade ? "bg-[#007FFF]/10" : "bg-gray-100"
                                                )}>
                                                    <CardTitle className="text-lg font-bold line-clamp-1">{exercise.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="bg-white p-6 flex flex-col items-center justify-between flex-grow">
                                                    {exercise.grade ? (
                                                        <div className="flex items-center space-x-2">
                                                            <Star className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
                                                            <p className={`${bricolage.className} text-xl font-semibold text-gray-800`}>{exercise.grade.toFixed(1)}/10</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <p className="text-gray-500 font-medium">Incomplete</p>
                                                        </div>
                                                    )}
                                                    {exercise.grade ? (
                                                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                                                            <Button variant="ghost" className="mt-4" onClick={() => {
                                                                toast.info("Reach level 20 to redo an exercise!");
                                                            }}>
                                                                <Redo2 className="mr-2 h-4 w-4" />
                                                                Redo
                                                            </Button>
                                                            <Link href={`/feedback/${exercise.id}`}>
                                                                <Button variant="ghost" className="mt-4">
                                                                    View Details
                                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    ) :
                                                        (
                                                            <Link href={`/chat/${exercise.id}`}>
                                                                <Button variant="ghost" className="mt-4">
                                                                    Continue
                                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                            </div>
                            <div>
                                {exerciseHistory.length > 12 && (
                                    <div className="text-center mb-12 md:mb-32">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setShowAllExercises(!showAllExercises);
                                            }}
                                        >
                                            {showAllExercises ? "View Less" : "View More"}
                                            <ArrowDown className={`ml-2 h-4 w-4 ${showAllExercises ? "rotate-180" : ""}`} />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-8">
                                <p className="text-base sm:text-lg text-gray-600">You haven&apos;t completed any exercises yet. Start one now!</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main >
            <Footer />
        </>
    )
}
