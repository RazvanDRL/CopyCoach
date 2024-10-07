"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArrowDown, ArrowRight, Check, ChevronsUpDown, Dices, CircleHelp, Star } from "lucide-react"

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

import { niches, tasks } from "@/constants"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabaseClient"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { User } from '@supabase/supabase-js'
import Loading from "@/components/loading"
import Footer from "@/components/footer"

interface ComboboxProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
  disabled?: boolean
}

function Combobox({ placeholder, value, onChange, options, className, disabled }: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full sm:w-[200px] justify-between", className)}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "block" : "hidden"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  )
}

// Add this interface near the top of the file
interface ExerciseHistoryItem {
  id: string;
  title: string;
  grade: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [niche, setNiche] = useState("");
  const [task, setTask] = useState("");
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [availableTasks, setAvailableTasks] = useState<typeof tasks>([]);

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
    console.log(user.id)

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
    setTask(randomTask);
  };

  useEffect(() => {
    if (niche) {
      const selectedNiche = niches.find(n => n.value === niche);
      if (selectedNiche) {
        setAvailableTasks(tasks.filter(t => selectedNiche.tasks.includes(t.value)));
      }
    } else {
      setAvailableTasks([]);
    }
  }, [niche]);

  const handleSubmit = async () => {
    if (!user) return;

    const { data: exerciseData, error: exerciseError } = await supabase
      .from('exercise')
      .select('id')
      .eq('niche', niche)
      .eq('task', task)


    if (exerciseError) {
      console.error('Error fetching exercise:', exerciseError);
      return;
    }
    let exData;
    if (exerciseData.length > 0) {
      const randomId = Math.floor(Math.random() * exerciseData.length);
      exData = exerciseData[randomId];
    }

    const { data, error } = await supabase
      .from('history')
      .insert([
        {
          user_id: user.id,
          exercise_id: exData!.id,
        }
      ])
      .select();

    if (error) {
      console.error('Error creating exercise history:', error);
    } else {
      const url = `/chat/${data[0].id}`;
      router.push(url);
    }
  };

  if (!user) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen py-2 px-4 sm:px-6 lg:px-8">
        <h1 className="mt-24 sm:mt-48 text-3xl sm:text-4xl font-bold mb-3 text-center">👋 Welcome, {user.email?.split('@')[0]}</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-10 text-center">
          Customize your copywriting exercise or try a random one
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className="ml-2 h-4 w-4 text-blue-800/90" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-sm text-le">
                  You'll receive a practice client with details about their business and task. Complete the exercise to get evaluated and personalized tips for improvement!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <div className="py-8 items-center justify-center flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-xl">
          <div className="flex flex-row items-center w-full sm:w-auto">
            <Combobox
              placeholder="Select niche"
              value={niche}
              onChange={setNiche}
              options={niches}
              className={cn("w-full sm:w-[200px]", niche ? "border-green-500" : "")}
            />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <CircleHelp className="ml-2 h-4 w-4 opacity-50 hover:opacity-100" />
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
              placeholder="Select task"
              value={task}
              onChange={setTask}
              options={availableTasks}
              className={cn("w-full sm:w-[200px]", task ? "border-green-500" : "")}
              disabled={!niche}
            />
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <CircleHelp className="ml-2 h-4 w-4 opacity-50 hover:opacity-100" />
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
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mt-8 w-full max-w-xl">
          <Button variant="outline" onClick={randomSelect} className="w-full sm:w-auto">
            <Dices className="mr-2 h-4 w-4" />Random
          </Button>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 flex items-center justify-center"
            disabled={!niche || !task}
            onClick={handleSubmit}
          >
            <Star className="mr-2 h-4 w-4" />
            <span>Ready to Start!</span>
          </Button>
        </div>
        <div className="mt-16 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Exercise History</h2>
          {exerciseHistory.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
                {exerciseHistory.filter(exercise => exercise.grade).slice(0, 12).map((exercise) => (
                  <Link href={`/analyze/${exercise.id}`} key={exercise.id}>
                    <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl overflow-hidden">
                      <CardHeader className="bg-gray-100 text-gray-800 p-4">
                        <CardTitle className="text-lg sm:text-xl font-bold">{exercise.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white p-6 flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <Star className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
                          <p className="text-lg sm:text-xl font-semibold text-gray-800">Grade: {exercise.grade}</p>
                        </div>
                        <Button variant="ghost" className="mt-4">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div>
                {exerciseHistory.filter(exercise => exercise.grade).length > 12 && (
                  <div className="mt-4 text-center">
                    <Button variant="outline">
                      View More
                      <ArrowDown className="ml-2 h-4 w-4" />
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
      </main>
      <Footer />
    </>
  )
}