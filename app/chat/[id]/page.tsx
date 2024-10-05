"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Target, Lightbulb, Pencil, Send, Bold as BoldIcon, Italic as ItalicIcon, Strikethrough, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import DOMPurify from 'dompurify';
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
import Strike from '@tiptap/extension-strike'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

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
};

export default function Chat({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        try {
            const response = editor?.getHTML() || '';
            const sanitizedResponse = DOMPurify.sanitize(response);
            const { data, error } = await supabase
                .from('history')
                .update({
                    response: sanitizedResponse,
                    title: exercise?.title
                })
                .eq('id', params.id);

            if (error) {
                console.error('Error uploading response:', error);
            } else {
                console.log('Response uploaded successfully:', data);
                router.push(`/analyze/${params.id}`);
            }
        } catch (error) {
            console.error('Error during analysis:', error);
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

                <div className="mt-16">
                    <h2 className="text-lg font-bold mb-2">Your Response</h2>
                    <div className="flex space-x-2 mb-2">
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
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-1/3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Mock function to simulate AI evaluation
async function mockEvaluateResponse(response: string, task: string): Promise<number> {
    // In a real scenario, you would send the response to your AI service
    // and receive a grade back. This is just a placeholder.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return Math.floor(Math.random() * 11); // Random grade between 0 and 10
}