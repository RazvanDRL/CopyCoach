import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PricingPage from './pricing/page';
import { MoveDown } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
                <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-6xl lg:text-8xl font-sans py-4 relative z-20 font-bold tracking-tight">
                    Learn by <span className="decoration-blue-500 decoration-dashed underline underline-offset-8">doing</span>
                </h1>

                <h2 className="text-lg md:text-xl lg:text-2xl text-center text-neutral-700/70 dark:text-neutral-300 font-semibold mb-6">
                    Master copywriting by exercising with real-world scenarios.<br />
                    Improve with custom AI feedback.
                </h2>

                <Link href="/dashboard" className="z-50">
                    <Button className="text-lg py-6 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Start Now
                    </Button>
                </Link>
                {/* <div className="animate-bounce absolute bottom-12">
                    <MoveDown className="w-8 h-8 text-blue-500" />
                </div> */}
            </div>

            {/* Benefits */}
            <div className="py-24">
                <h2 className="text-4xl md:text-6xl lg:text-7xl text-center text-neutral-800 dark:text-neutral-200 font-bold mb-16">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 dark:border-blue-900 transform hover:-translate-y-1">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Real-World Scenarios</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Practice with authentic copywriting exercises that mirror real-world challenges.</p>
                    </div>
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 dark:border-purple-900 transform hover:-translate-y-1">
                        <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Custom AI Feedback</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Receive personalized AI-powered feedback to enhance your copywriting skills rapidly.</p>
                    </div>
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 dark:border-green-900 transform hover:-translate-y-1">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Rapid Improvement</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">Accelerate your learning through consistent practice and immediate, actionable feedback.</p>
                    </div>
                </div>
                {/* CTA button */}
                <div className="flex justify-center mt-16">
                    <Link href="/dashboard" className="text-base py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Start Now
                    </Link>
                </div>
            </div>

            {/* Who is it for? */}
            {/* <div className="bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 py-24">
                <h2 className="text-4xl md:text-6xl lg:text-7xl text-center text-neutral-800 dark:text-neutral-200 font-bold mb-16">
                    Who Can Benefit?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto px-4">
                    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 dark:border-blue-900 transform hover:-translate-y-1">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Copywriters</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Sharpen your skills with real-world scenarios and receive instant AI feedback to elevate your craft.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 dark:border-purple-900 transform hover:-translate-y-1">
                        <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Marketing Professionals</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Enhance your copywriting abilities to create more impactful marketing campaigns and content.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 dark:border-green-900 transform hover:-translate-y-1">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">Content Creators</h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Learn to write compelling copy that engages your audience and boosts your content's performance.
                        </p>
                    </div>
                </div>
            </div> */}
            {/* FAQ */}
            <div className="py-24">
                <h2 className="text-2xl md:text-3xl lg:text-5xl text-center text-neutral-800 dark:text-neutral-200 font-bold mb-16">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto px-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is CopyCoach?</AccordionTrigger>
                            <AccordionContent>
                                CopyCoach is an AI-powered platform designed to help copywriters, marketers, and content creators improve their writing skills through real-time feedback and personalized coaching.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How does CopyCoach work?</AccordionTrigger>
                            <AccordionContent>
                                CopyCoach analyzes your writing in real-time, providing instant feedback on style, tone, and effectiveness. It offers suggestions for improvement and tailored exercises to enhance your skills.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is CopyCoach suitable for beginners?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely! CopyCoach is designed for writers of all levels, from beginners to experienced professionals. The AI adapts its feedback and suggestions based on your skill level.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Can I use CopyCoach for different types of copy?</AccordionTrigger>
                            <AccordionContent>
                                Yes, CopyCoach can assist with various types of copy, including ad copy, email marketing, social media posts, blog articles, and more. The AI is trained on a wide range of copywriting styles and formats.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Is my data secure with CopyCoach?</AccordionTrigger>
                            <AccordionContent>
                                We take data security very seriously. All your writing and personal information are encrypted and stored securely. We never share your data with third parties without your explicit consent.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            {/* <PricingPage /> */}
            < Footer />
        </>
    );
};

export default LandingPage;
