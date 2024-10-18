"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User as UserType } from "@supabase/supabase-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Target, Lightbulb, Pencil, Send, Bold as BoldIcon, Italic as ItalicIcon, Strikethrough, Link as LinkIcon, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify';
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import { toast, Toaster } from 'sonner';

type Exercise = {
    id: string;
    title: string;
    description: string;
    needs: string;
    details: string;
    notes: string;
    created_at: string;
    niche: string;
    task: string;
    client_avatar: string;
};

export default function Chat({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Italic,
            Bold,
            Strike,
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Type your response here...',
            }),
            CharacterCount.configure({
                limit: 10000,
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            localStorage.setItem(`exerciseResponse_${params.id}`, html);
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[100px]',
            },
        },
    })

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (!user) {
                router.replace('/login');
            }
            return user;
        };
        fetchUser();
    }, []);


    useEffect(() => {
        async function getTask() {
            setLoading(true);

            const { data, error } = await supabase
                .from('history')
                .select('exercise_id, response')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error(error);
                setLoading(false);
            } else {
                const { data: exerciseData, error: exerciseError } = await supabase
                    .from('exercise')
                    .select('*')
                    .eq('id', data.exercise_id)
                    .single();

                if (exerciseError) {
                    console.error(exerciseError);
                } else {
                    setExercise(exerciseData);
                    if (data.response) {
                        editor?.commands.setContent(data.response);
                    }
                }
                setLoading(false);
            }
        }

        getTask();

        // Load response from localStorage if it exists
        const savedResponse = localStorage.getItem(`exerciseResponse_${params.id}`);
        if (savedResponse) {
            editor?.commands.setContent(savedResponse);
        }
    }, [params.id, editor]);

    const handleSubmit = async () => {
        setSubmitting(true);
        if (!user) {
            toast.error('You must be logged in to submit a response.');
            setSubmitting(false);
            return;
        }
        try {
            const response = editor?.getHTML() || '';
            const sanitizedResponse = DOMPurify.sanitize(response);

            // Check if the response is empty or only contains whitespace
            if (!sanitizedResponse.trim()) {
                toast.warning('Please write a response before submitting.');
                setSubmitting(false);
                return;
            }

            // Check if the response is too short (e.g., less than 50 words)
            if (editor?.storage.characterCount.words() < 50) {
                toast.warning('Your response seems too short. Please provide a more detailed answer. (Minimum 50 words)');
                setSubmitting(false);
                return;
            }

            // Check if the user has copied text from exercise fields
            const copiedText = [exercise?.description, exercise?.needs, exercise?.details, exercise?.notes].some(
                field => field && sanitizedResponse.includes(field)
            );

            if (copiedText) {
                toast.warning('Please write your own response without copying from the exercise description, task, details, or notes.');
                setSubmitting(false);
                return;
            }

            const { data, error } = await supabase
                .from('history')
                .update({
                    response: sanitizedResponse,
                    title: exercise?.title
                })
                .eq('id', params.id);

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('completed_exercises')
                .eq('id', user.id)
                .single();

            if (profileError) {
                console.error('Error fetching profile:', profileError);
            } else {
                const updatedExercises = profileData?.completed_exercises || [];
                if (exercise?.id && !updatedExercises.includes(exercise.id)) {
                    updatedExercises.push(exercise.id);

                    const { data: updateData, error: updateError } = await supabase
                        .from('profiles')
                        .update({
                            completed_exercises: updatedExercises
                        })
                        .eq('id', user.id);

                    if (updateError) {
                        console.error('Error updating profile:', updateError);
                    }
                }
            }

            if (error) {
                console.error('Error uploading response:', error);
                toast.error('Failed to submit response. Please try again.');
            } else {
                console.log('Response uploaded successfully:', data);
                toast.success('Response submitted successfully!');
                router.push(`/analyze/${params.id}`);
            }
        } catch (error) {
            console.error('Error during submission:', error);
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!exercise) {
        return <div className="text-center py-10">No exercise found.</div>;
    }

    return (
        <>
            <Navbar />
            <Toaster richColors position="top-center" />
            <div className="mt-16 container mx-auto px-4 py-8 max-w-4xl">
                <Button variant="outline" className="mb-6" onClick={() => {
                    router.push('/dashboard');
                }}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
                </Button>

                <h1 className="text-3xl font-bold mb-6 text-center">{exercise.title}</h1>

                <div className="grid gap-4 md:grid-cols-2">
                    <ExerciseCard
                        icon={<BookOpen className="h-5 w-5" />}
                        title="Description"
                        content={exercise.description}
                        bgColor="bg-blue-100"
                    />
                    <ExerciseCard
                        icon={<Target className="h-5 w-5" />}
                        title="Task"
                        content={exercise.needs}
                        bgColor="bg-green-100"
                    />
                    <ExerciseCard
                        icon={<Pencil className="h-5 w-5" />}
                        title="Details"
                        content={exercise.details}
                        bgColor="bg-yellow-100"
                    />
                    <ExerciseCard
                        icon={<Lightbulb className="h-5 w-5" />}
                        title="Notes"
                        content={exercise.notes}
                        bgColor="bg-purple-100"
                    />
                </div>
                {exercise.client_avatar && (
                    <div className="mt-4">
                        <ExerciseCard
                            icon={<User className="h-5 w-5" />}
                            title="Client Avatar"
                            content={exercise.client_avatar}
                            bgColor="bg-pink-100"
                        />
                    </div>
                )}

                <div className="mt-16">
                    <h2 className="text-lg font-bold mb-2">Your Response</h2>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                className={editor?.isActive('bold') ? 'is-active' : ''}
                            >
                                <BoldIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                className={editor?.isActive('italic') ? 'is-active' : ''}
                            >
                                <ItalicIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => editor?.chain().focus().toggleStrike().run()}
                                className={editor?.isActive('strike') ? 'is-active' : ''}
                            >
                                <Strikethrough className="h-4 w-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    const url = window.prompt('Enter the URL')
                                    if (url) {
                                        editor?.chain().focus().setLink({ href: url }).run()
                                    }
                                }}
                                className={editor?.isActive('link') ? 'is-active' : ''}
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-sm text-gray-500">
                            {editor?.storage.characterCount.words()} words
                        </div>
                    </div>
                    <div className="relative border rounded-lg shadow-sm p-4">
                        <EditorContent editor={editor} className="w-full outline-none ring-0 border-0 pr-16 prose-sm" />
                        <Button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="absolute right-3 bottom-2 rounded-lg"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

function ExerciseCard({ icon, title, content, bgColor }: { icon: React.ReactNode, title: string, content: string, bgColor: string }) {
    return (
        <Card>
            <CardHeader className={`${bgColor} rounded-t-lg mb-4 py-4`}>
                <CardTitle className="flex items-center text-lg font-semibold">
                    <div className={`${bgColor} rounded-full mr-2`}>
                        {icon}
                    </div>
                    <span>{title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{content}</p>
            </CardContent>
        </Card>
    );
}

function LoadingSkeleton() {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'];
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-16">
            <Skeleton className="h-10 w-32 mb-6 bg-gray-100" />
            <Skeleton className="h-10 w-3/4 mx-auto mb-6 bg-gray-100" />
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className={`${colors[i]} rounded-t-lg mb-4 py-4`}>
                            <Skeleton className="h-6 w-1/3 bg-gray-100" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2 bg-gray-100" />
                            <Skeleton className="h-4 w-2/3 bg-gray-100" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* @dev client avatar card */}
            {/* <div className="mt-6">
                <Card>
                    <CardHeader className={`${colors[4]} rounded-t-lg mb-4 py-4`}>
                        <Skeleton className="h-6 w-1/3 bg-gray-100" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2 bg-gray-100" />
                        <Skeleton className="h-4 w-2/3 bg-gray-100" />
                    </CardContent>
                </Card>
            </div> */}
        </div>
    );
}