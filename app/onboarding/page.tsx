"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import Loading from "@/components/loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp, ArrowRight, Dices, Star, History, Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { sleep } from "openai/core.mjs"
import { bricolage } from "@/fonts/font"
import Combobox from "@/components/combobox";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { niches, tasks } from "@/constants";
import { useRouter } from 'next/navigation'
import { useOnborda } from "onborda";

// Add proper type definitions
type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "";
type GoalType = "Freelancing" | "Job Skills" | "Personal Projects" | "";
type LearningStyle = "Structured" | "Open-ended" | "";
type OnboardingStep = 1 | 2 | 3;

interface UserProfile {
    name: string;
    experience: ExperienceLevel;
    goal: GoalType;
    type: LearningStyle;
}

export default function Onboarding() {
    const router = useRouter()
    const { startOnborda } = useOnborda();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        experience: "",
        goal: "",
        type: ""
    });
    const [step, setStep] = useState<OnboardingStep>(1);
    const [niche, setNiche] = useState<string>("");
    const [task, setTask] = useState<string>("");

    // Improve user fetching logic
    useEffect(() => {
        const fetchUserAndProfile = async () => {
            try {
                setLoading(true);
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError) throw new Error(userError.message);
                if (!user) throw new Error("User not found");

                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (profileError) throw new Error(profileError.message);

                setUser(user);
                setProfile({
                    name: user?.user_metadata?.full_name || "",
                    experience: profileData.experience || "",
                    goal: profileData.goal || "",
                    type: profileData.type || ""
                });

                // Auto-advance if profile is complete
                if (profileData.experience && profileData.goal && profileData.type) {
                    setStep(3);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
                router.push("/signup");
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndProfile();
    }, [router]);

    // Improve profile update logic
    const updateProfile = async () => {
        try {
            if (!user?.id) throw new Error("User ID not found");

            const { error } = await supabase
                .from("profiles")
                .update({
                    name: profile.name,
                    experience: profile.experience,
                    goal: profile.goal,
                    type: profile.type
                })
                .eq("id", user.id);

            if (error) throw new Error(error.message);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update profile");
        }
    };

    // Optimize step change handling
    useEffect(() => {
        if (step === 3) {
            window.scrollTo(0, 0);
            updateProfile();
            setTimeout(handleOnborda, 300);
        }
    }, [step]);

    // Add form validation
    const canProceedStep1 = profile.name.trim() && profile.experience;
    const canProceedStep2 = profile.goal && profile.type;

    const handleOnborda = () => {
        startOnborda();
    }

    const randomSelect = () => {
        setNiche(niches[Math.floor(Math.random() * niches.length)].value);
        setTask(tasks[Math.floor(Math.random() * tasks.length)].value);
    };

    const ProfileCard = () => (
        <Card className="fixed right-[14rem] top-[16rem] w-72 hidden lg:block" id="profile-card">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <span className="text-2xl">{profile.name ? profile.name[0]?.toUpperCase() : '?'}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-4">{profile.name || 'Your Name'}</h3>
                    <div className="w-full space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Experience:</span>
                            <span className="font-medium">{profile.experience || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Goal:</span>
                            <span className="font-medium">{profile.goal || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Exercise Type:</span>
                            <span className="font-medium">{profile.type || 'Not set'}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            {step < 3 && (
                <ProfileCard />
            )}
            {step < 3 && (
                <div className="flex flex-col items-center min-h-screen px-8 relative">

                    <h1 className={`${bricolage.className} mt-24 sm:mt-32 text-3xl sm:text-4xl font-bold mb-3 text-center`}>
                        {step === 1 ? "👋 Let's get to know you" : "😉 One more thing..."}
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 mb-10 text-center">
                        {step === 1 ? "We'll customize your experience based on your profile" : "Let's get you started with your first exercise!"}
                    </p>
                    {step === 1 && (
                        <>
                            <Card className="w-full max-w-xl">
                                <CardContent className="pt-6">
                                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                                        What should we call you?
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-gray-300 mb-8 focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
                                    />
                                    <div className="mb-8">
                                        <label className="block text-lg font-semibold text-gray-800 mb-2">
                                            What&apos;s your copywriting experience?
                                        </label>
                                        <p className="text-gray-600 mb-4">We&apos;ll adjust the difficulty of exercises accordingly</p>

                                        <div className="space-y-4" id="experience-select">
                                            {[
                                                {
                                                    level: 'Beginner',
                                                    description: 'New to copywriting or just starting out',
                                                    icon: '🌱'
                                                },
                                                {
                                                    level: 'Intermediate',
                                                    description: 'Have some experience writing copy',
                                                    icon: '⭐'
                                                },
                                                {
                                                    level: 'Advanced',
                                                    description: 'Experienced copywriter looking to master the craft',
                                                    icon: '🚀'
                                                }
                                            ].map(({ level, description, icon }) => (
                                                <button
                                                    key={level}
                                                    className={`w-full px-6 py-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-all duration-200 ${profile.experience === level
                                                        ? 'border-[#007FFF] bg-blue-50 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    onClick={() => setProfile({ ...profile, experience: level as ExperienceLevel })}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{icon}</span>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-800">{level}</div>
                                                            <div className="text-sm text-gray-600">{description}</div>
                                                        </div>
                                                        {profile.experience === level && (
                                                            <Check className="text-[#007FFF] h-5 w-5" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full"
                                        onClick={() => setStep(2)}
                                        disabled={!canProceedStep1}
                                    >
                                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Card className="w-full max-w-xl">
                                <CardContent className="pt-6">
                                    <h2 className={`${bricolage.className} text-lg font-semibold mb-3`}>What are your goals?</h2>
                                    <div className="space-y-4 mb-8" id="goals-section">
                                        {[
                                            {
                                                goal: 'Freelancing',
                                                description: 'Build a successful freelance copywriting business and work with clients',
                                                icon: '💼'
                                            },
                                            {
                                                goal: 'Job Skills',
                                                description: 'Level up your professional writing abilities for career growth',
                                                icon: '📈'
                                            },
                                            {
                                                goal: 'Personal Projects',
                                                description: 'Create compelling copy for your own business or side projects',
                                                icon: '🎯'
                                            }
                                        ].map(({ goal, description, icon }) => (
                                            <button
                                                key={goal}
                                                className={`w-full px-6 py-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${goal === profile.goal
                                                    ? 'border-[#007FFF] bg-blue-50 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setProfile({ ...profile, goal: goal as GoalType })}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{goal}</div>
                                                        <div className="text-sm text-gray-600">{description}</div>
                                                    </div>
                                                    {profile.goal === goal && (
                                                        <Check className="text-[#007FFF] h-5 w-5" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <h2 className={`${bricolage.className} text-lg font-semibold`}>Learning Style</h2>
                                    <p className="text-base text-gray-600 mb-3">
                                        Choose how you&apos;d like to approach the exercises:
                                    </p>

                                    <div className="space-y-4 mb-8" id="learning-style">
                                        {[
                                            {
                                                type: 'Structured',
                                                description: 'Clear, guided exercises with detailed frameworks and examples',
                                                icon: '📝'
                                            },
                                            {
                                                type: 'Open-ended',
                                                description: 'Flexible exercises that let you explore your creative approach',
                                                icon: '🎨'
                                            }
                                        ].map(({ type, description, icon }) => (
                                            <button
                                                key={type}
                                                className={`w-full px-6 py-4 text-left border-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${type === profile.type
                                                    ? 'border-[#007FFF] bg-blue-50 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                onClick={() => setProfile({ ...profile, type: type as LearningStyle })}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{type}</div>
                                                        <div className="text-sm text-gray-600">{description}</div>
                                                    </div>
                                                    {profile.type === type && (
                                                        <Check className="text-[#007FFF] h-5 w-5" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="w-1/3"
                                        >
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                        </Button>
                                        <Button
                                            className="w-2/3"
                                            onClick={() => {
                                                setStep(3)
                                                router.refresh()
                                            }}
                                            disabled={!canProceedStep2}
                                        >
                                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            )}
            {step === 3 && (
                <main className="flex flex-col items-center min-h-screen px-8">
                    <h1 className={`${bricolage.className} mt-24 sm:mt-48 text-3xl sm:text-4xl font-bold mb-3 text-center line-clamp-1`}>👋 Welcome, {profile.name}</h1>
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
                                id="niche-select"
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
                                options={tasks}
                                className={cn("w-full sm:w-[200px]", task ? "border-green-500" : "")}
                                disabled={!niche}
                                id="task-select"
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
                            id="random-button"
                        >
                            <Dices className="mr-2 h-4 w-4" />
                            Random
                        </Button>
                        <Button
                            className="w-full sm:w-auto bg-[#007FFF] hover:bg-[#007FFF] text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 flex items-center justify-center"
                            disabled={!niche || !task}
                            id="start-button"
                        >
                            <div className="flex items-center justify-center">
                                <Star className="mr-2 h-4 w-4" />
                                Ready to Start!
                            </div>
                        </Button>
                    </div>
                    <div id="exercise-history" className="mt-16 w-full max-w-5xl mx-auto">
                        <h2 className={`${bricolage.className} text-2xl md:text-3xl font-bold mb-4 text-left flex items-center`}>
                            <History className="mr-2 h-6 w-6" />
                            Exercise History
                        </h2>
                        <Card>
                            <CardContent className="text-center py-8">
                                <p className="text-base sm:text-lg text-gray-600">You haven&apos;t completed any exercises yet. Start one now!</p>
                            </CardContent>
                        </Card>
                    </div>
                </main >
            )}
            <Footer />
        </>
    );
}