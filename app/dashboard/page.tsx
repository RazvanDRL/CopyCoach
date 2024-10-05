"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArrowDown, ArrowRight, Check, ChevronsUpDown, CircleAlert, Dices, Star } from "lucide-react"

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
          className={cn("w-[200px] justify-between", className)}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
      <main className="flex flex-col items-center min-h-screen py-2">
        <h1 className="mt-48 text-4xl font-bold mb-3">👋 Welcome, {user.email?.split('@')[0]}</h1>
        <p className="text-lg text-gray-600 mb-10">Customize your copywriting exercise or try a random one</p>
        <div className="py-8 flex gap-8">
          <div className="flex items-center">
            <Combobox
              placeholder="Select niche"
              value={niche}
              onChange={setNiche}
              options={niches}
              className={niche ? "border-green-500" : ""}
            />
            <ArrowRight className="ml-8 h-4 w-4" />
          </div>
          <div className="flex items-center">
            <Combobox
              placeholder="Select task"
              value={task}
              onChange={setTask}
              options={availableTasks}
              className={task ? "border-green-500" : ""}
              disabled={!niche}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={randomSelect}>
            <Dices className="mr-2 h-4 w-4" />Random
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 flex items-center"
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
                {exerciseHistory.filter(exercise => exercise.grade).slice(0, 12).map((exercise) => (
                  <Link href={`/analyze/${exercise.id}`} key={exercise.id}>
                    <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl overflow-hidden">
                      <CardHeader className="bg-gray-100 text-gray-800 p-4">
                        <CardTitle className="text-xl font-bold">{exercise.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white p-6 flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <Star className="text-yellow-500 w-6 h-6" />
                          <p className="text-xl font-semibold text-gray-800">Grade: {exercise.grade}</p>
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
                <p className="text-lg text-gray-600">You haven&apos;t completed any exercises yet. Start one now!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}