"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Eye, BarChart2, Lightbulb, Loader2, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loading from '@/components/loading';
import { Cover } from '@/components/ui/cover';
import DOMPurify from 'dompurify';
import { bricolage } from '@/fonts/font';
import Link from 'next/link';


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
        tips: {
            title: string;
            description: string;
        }[];
        improvedVersion: string;
    };
};

export default function Analyze() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(true);
    const [response, setResponse] = useState('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    function htmlToStructuredText(html: string) {
        // Replace empty paragraphs with <br> tags
        html = html.replace(/<p>\s*<\/p>/g, '<br>');

        // Move <br> tags outside of <p> tags
        html = html.replace(/<p>(.*?)<br>(.*?)<\/p>/g, (match, p1, p2) => {
            return `<p>${p1}</p><br><p>${p2}</p>`;
        });

        return html;
    }

    function getColor(value: number) {
        if (value < 1) {
            return 'bg-red-500';
        } else if (value < 2) {
            return 'bg-red-400';
        } else if (value < 3) {
            return 'bg-orange-500';
        } else if (value < 4) {
            return 'bg-orange-400';
        } else if (value < 5) {
            return 'bg-yellow-500';
        } else if (value < 6) {
            return 'bg-yellow-400';
        } else if (value < 7) {
            return 'bg-green-400';
        } else if (value < 8) {
            return 'bg-green-500';
        } else if (value < 9) {
            return 'bg-blue-400';
        } else if (value < 10) {
            return 'bg-blue-500';
        } else {
            return 'bg-[#FFD700]';
        }
    }

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
                        .update({ grade: jsonResult.scores.overallScore })
                        .eq('id', params.id);

                    if (updateError) {
                        console.error('Error updating grade:', updateError);
                    }
                } else {
                    console.log('No existing analysis found. Initiating analysis...');
                    const session = await supabase.auth.getSession();
                    const token = session.data.session?.access_token;

                    const res = await fetch('/api/analyze', {
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
                        .update({ grade: analysisData.scores.overallScore })
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

    console.log('Analysis result:', analysisResult);

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
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Exercises
                        </Button>
                    </Link>
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

                <h1 className={`${bricolage.className} text-4xl font-bold mb-8 text-center text-gradient`}>Analysis Results</h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-fit font-semibold shadow-sm"
                        >
                            <Eye className="mr-2 h-5 w-5" />
                            Compare Original and Improved Responses
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-full max-h-[100vh]">
                        <DialogHeader>
                            <DialogTitle>Response Comparison</DialogTitle>
                        </DialogHeader>
                        <div className="h-[60vh] overflow-auto">
                            {response && analysisResult?.improvement?.improvedVersion && (
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-1/2 pr-2">
                                        <h3 className="text-base md:text-lg font-semibold mb-2">Original Response</h3>
                                        <div
                                            className="text-sm md:text-base bg-gray-100 p-4 rounded"
                                            dangerouslySetInnerHTML={{ __html: htmlToStructuredText(DOMPurify.sanitize(response)) }}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                        <h3 className="text-base md:text-lg font-semibold mb-2">Improved Version</h3>
                                        <div
                                            className="text-sm md:text-base bg-gray-100 p-4 rounded"
                                            dangerouslySetInnerHTML={{ __html: htmlToStructuredText(DOMPurify.sanitize(analysisResult.improvement.improvedVersion)) }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <Card className="mt-8 shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#007FFF] to-blue-300 text-white rounded-t-lg">
                        <CardTitle className="flex items-center text-2xl">
                            <BarChart2 className="mr-2 h-6 w-6" />
                            <span className={`${bricolage.className} text-2xl font-bold`}>Scores</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="mb-8 text-center">
                            <span className={`${bricolage.className} text-lg font-medium opacity-60`}>Overall Score</span>
                            <div className={`${bricolage.className} text-4xl font-bold`}>
                                {analysisResult?.scores?.overallScore ? `${analysisResult.scores.overallScore.toFixed(1)}/10 ` : 'N/A'}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(analysisResult?.scores || {}).map(([key, value]) => {
                                if (typeof value === 'number' && key !== 'overallScore') {
                                    return (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-sm font-medium opacity-80 mb-1 capitalize flex items-center">
                                                {value === 10 && <Crown className="w-4 h-4 mr-1" />}
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <Progress value={value * 10} indicatorClassName={`${getColor(value)}`} className={`h-2`} />
                                            <span className="text-right text-sm font-medium mt-1 opacity-80">{value}/10</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-8 shadow-lg overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-[#007FFF] to-blue-300 text-white rounded-t-lg">
                        <CardTitle className="flex items-center text-2xl">
                            <Lightbulb className="mr-2 h-6 w-6" />
                            <span className={`${bricolage.className} text-2xl font-bold`}>Improvement Tips</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="prose prose-sm max-w-none">
                            {analysisResult?.improvement?.tips ? (
                                <div>
                                    {analysisResult.improvement.tips.map((tip, index) => (
                                        <div key={index} className="mb-4">
                                            <h4 className="font-medium">{tip.title}</h4>
                                            <p className="text-gray-600">{tip.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No improvement tips available</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                {process.env.NODE_ENV === 'development' && analysisResult && (
                    <Card className="mt-8 shadow-lg overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-[#007FFF] to-blue-300 text-white rounded-t-lg">
                            <CardTitle className="flex items-center text-2xl">
                                <Eye className="mr-2 h-6 w-6" />
                                <span className={`${bricolage.className} text-2xl font-bold`}>AI Response (Debug)</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                                Response
                            </h3>
                            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                                {JSON.stringify(analysisResult, null, 4)}
                            </pre>

                            <h3 className="text-lg font-semibold mb-2 mt-8 flex items-center justify-between">
                                Improvement Tips
                            </h3>

                            <div>
                                {analysisResult.improvement.tips.map((tip, index) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-medium">{tip.title}</h4>
                                        <p className="text-gray-600">{tip.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-8 flex items-center justify-between">
                                Improved Version
                            </h3>
                            <div
                                className="bg-gray-100 p-4 rounded-md"
                                dangerouslySetInnerHTML={{ __html: htmlToStructuredText(DOMPurify.sanitize(analysisResult.improvement.improvedVersion)) }}
                            />
                        </CardContent>
                    </Card>
                )}
            </main >
            <Footer />
        </>
    );
}

function GeneratingAnalysis() {
    const [showStuckButton, setShowStuckButton] = useState(false);
    const [startTime] = useState(Date.now());

    useEffect(() => {
        // Add the CSS for the animation to the document
        const style = document.createElement('style');
        style.textContent = `
            .tetrominos {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-112px, -96px);
            }

            .tetromino {
                width: 96px;
                height: 112px;
                position: absolute;
                transition: all ease 0.3s;
                background: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%23000" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%23fff" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center;
            }

            .box1 { animation: tetromino1 1.5s ease-out infinite; }
            .box2 { animation: tetromino2 1.5s ease-out infinite; }
            .box3 { animation: tetromino3 1.5s ease-out infinite; z-index: 2; }
            .box4 { animation: tetromino4 1.5s ease-out infinite; }

            @keyframes tetromino1 {
                0%, 40% { transform: translate(0, 0); }
                50% { transform: translate(48px, -27px); }
                60%, 100% { transform: translate(96px, 0); }
            }

            @keyframes tetromino2 {
                0%, 20% { transform: translate(96px, 0px); }
                40%, 100% { transform: translate(144px, 27px); }
            }

            @keyframes tetromino3 {
                0% { transform: translate(144px, 27px); }
                20%, 60% { transform: translate(96px, 54px); }
                90%, 100% { transform: translate(48px, 27px); }
            }

            @keyframes tetromino4 {
                0%, 60% { transform: translate(48px, 27px); }
                90%, 100% { transform: translate(0, 0); }
            }
        `;
        document.head.appendChild(style);

        const timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            if (elapsedTime >= 60) {
                setShowStuckButton(true);
                clearInterval(timer);
            }
        }, 1000);

        // Clean up function
        return () => {
            document.head.removeChild(style);
            clearInterval(timer);
        };
    }, [startTime]);

    return (
        <div className="h-screen flex flex-col items-center justify-center mx-auto px-4 py-8 max-w-4xl">
            {showStuckButton && (
                <div className="mt-8">
                    <p className="text-center mb-4">Taking longer than expected...</p>
                    <Link href="/dashboard">
                        <Button variant="outline" className="w-full mb-10">Are you stuck?</Button>
                    </Link>
                </div>
            )}
            <h1 className="text-4xl font-bold mb-8 text-center">Generating your feedback...</h1>
            <p className="text-center opacity-60 mb-48">Don&apos;t worry, we&apos;re working as fast as possible :)</p>
            <div className="tetrominos mt-36">
                <div className="tetromino box1"></div>
                <div className="tetromino box2"></div>
                <div className="tetromino box3"></div>
                <div className="tetromino box4"></div>
            </div>

        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-10 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-12 w-full" />
            <Card className="mt-8 rounded-lg">
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
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
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
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
