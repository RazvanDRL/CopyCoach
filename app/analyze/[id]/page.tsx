"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Eye, BarChart2, Lightbulb, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/navbar';
import ReactMarkdown from 'react-markdown';
import Footer from '@/components/footer';
import Loading from '@/components/loading';

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

type AnalysisResult = {
    scores: {
        clarity: number;
        audienceRelevance: number;
        persuasiveness: number;
        structure: number;
        grammar: number;
        tone: number;
        attentionGrabbing: number;
        consistency: number;
        emotionalAppeal: number;
        ctaEffectiveness: number;
        overallScore: number;
    };
    improvement: {
        tips: string;
        improvedVersion: string;
    };
};

export default function Analyze({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [response, setResponse] = useState('');
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchResponseAndAnalyze() {
            setLoading(true);
            try {
                // Fetch history data
                const { data: historyData, error: historyError } = await supabase
                    .from('history')
                    .select('response, exercise_id')
                    .eq('id', params.id)
                    .single();

                if (historyError) {
                    throw new Error('Error fetching response: ' + historyError.message);
                }

                setResponse(historyData.response);

                // Fetch exercise data
                const { data: exerciseData, error: exerciseError } = await supabase
                    .from('exercise')
                    .select('*')
                    .eq('id', historyData.exercise_id)
                    .single();

                if (exerciseError) {
                    throw new Error('Error fetching exercise: ' + exerciseError.message);
                }

                setExercise(exerciseData);

                // Check if analysis result already exists
                const { data: existingAnalysis, error: analysisError } = await supabase
                    .from('analysis_results')
                    .select('result')
                    .eq('history_id', params.id)
                    .single();

                setLoadingData(false);
                if (existingAnalysis && existingAnalysis.result) {
                    const jsonResult = JSON.parse(existingAnalysis.result);
                    setAnalysisResult(jsonResult);

                    // Update the grade in the history table
                    const { error: updateError } = await supabase
                        .from('history')
                        .update({ grade: parseInt(jsonResult.scores.overallScore) })
                        .eq('id', params.id);

                    if (updateError) {
                        console.error('Error updating grade:', updateError);
                    }
                } else {
                    console.log('No existing analysis found. Initiating analysis...');
                    const session = await supabase.auth.getSession();
                    const token = session.data.session?.access_token;

                    const res = await fetch('/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            id: params.id
                        }),
                    });

                    if (!res.ok) {
                        throw new Error('Failed to analyze response');
                    }
                    const analysisData = await res.json();
                    console.log('Analysis data:', analysisData);
                    setAnalysisResult(analysisData);

                    // Update the grade in the history table
                    const { error: updateError } = await supabase
                        .from('history')
                        .update({ grade: parseInt(analysisData.scores.overallScore) })
                        .eq('id', params.id);

                    if (updateError) {
                        console.error('Error updating grade:', updateError);
                    }
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchResponseAndAnalyze();
    }, [params.id]);

    if (loadingData) {
        return <Loading />;
    }

    if (!loadingData && !analysisResult) {
        return <GeneratingAnalysis />;
    }

    if (!loadingData && loading && analysisResult) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="h-screen flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-red-500">Error</h1>
                <p className="text-center mb-8">{error}</p>
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="container min-h-screen mx-auto px-4 py-8 max-w-4xl">
                <Button variant="outline" className="mb-6 mt-16" onClick={() => router.push('/dashboard')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>

                <h1 className="text-4xl font-bold mb-8 text-center text-gradient">Analysis Results</h1>

                <div className="grid gap-6 md:grid-cols-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full hover:bg-blue-50 transition-colors">
                                <Eye className="mr-2 h-4 w-4" /> View Original Response
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Original Response</DialogTitle>
                            </DialogHeader>
                            <div className="prose prose-sm max-w-none">
                                <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: response }} />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full hover:bg-green-50 transition-colors">
                                <Eye className="mr-2 h-4 w-4" /> View Improved Version
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Improved Version</DialogTitle>
                            </DialogHeader>
                            <div className="prose prose-sm max-w-none">
                                <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: analysisResult?.improvement?.improvedVersion || 'No improved version available' }} />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="mt-8 shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                        <CardTitle className="flex items-center text-2xl">
                            <BarChart2 className="mr-2 h-6 w-6" /> Scores
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="mb-8 text-center">
                            <span className="text-3xl font-bold text-gradient">Overall Score: {analysisResult?.scores?.overallScore ?? 'N/A'}/10</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(analysisResult?.scores || {}).map(([key, value]) => {
                                if (typeof value === 'number' && key !== 'overallScore') {
                                    return (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-500 mb-1 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <Progress value={value * 10} className={`h-2`} />
                                            <span className="text-right text-sm font-bold mt-1">{value}/10</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-8 shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                        <CardTitle className="flex items-center text-2xl">
                            <Lightbulb className="mr-2 h-6 w-4" /> Tips for Improvement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="prose prose-sm max-w-none">
                            {analysisResult?.improvement?.tips ? (
                                <ReactMarkdown>{analysisResult.improvement.tips}</ReactMarkdown>
                            ) : (
                                <p className="text-gray-600">No improvement tips available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </>
    );
}

function GeneratingAnalysis() {
    return (
        <div className="h-screen flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Generating Analysis</h1>
            <p className="text-center mb-4">Please wait while we generate the analysis. This process takes about 15 seconds.</p>
            <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
            <Card className="mt-8 rounded-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
                    <Skeleton className="h-8 w-1/3 bg-white/20" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex flex-col">
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-2 w-full mb-1" />
                                <Skeleton className="h-4 w-16 self-end" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-8 rounded-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500">
                    <Skeleton className="h-8 w-1/2 bg-white/20" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i}>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}