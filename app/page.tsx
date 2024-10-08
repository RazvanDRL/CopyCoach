import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PricingPage from './pricing/page';
import { Pen, Book, Sparkles, ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const LandingPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80svh] px-4 py-12 space-y-8 relative overflow-hidden">
                {/* Background symbols */}
                <div className="absolute inset-0 z-0 opacity-25">
                    <Pen className="absolute top-1/4 left-1/4 h-12 w-12 sm:h-16 sm:w-16 text-blue-500 transform -rotate-12" />
                    <Book className="absolute top-1/3 right-1/4 h-12 w-12 sm:h-16 sm:w-16 text-purple-500 transform rotate-6" />
                    <Sparkles className="absolute bottom-1/4 left-1/3 h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
                    <Pen className="absolute bottom-1/3 right-[20%] lg:right-1/3 h-10 w-10 sm:h-14 sm:w-14 text-yellow-500 transform rotate-90" />
                </div>

                <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans py-4 relative z-20 font-bold tracking-tight">
                    Learn by <span className="decoration-blue-500 decoration-dashed underline underline-offset-8">doing</span>
                </h1>

                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-neutral-700/70 dark:text-neutral-300 font-semibold mb-6 relative z-20">
                    Master copywriting by exercising with real-world scenarios.<br className="hidden sm:block" />
                    Improve with custom AI feedback.
                </h2>

                <Link href="/dashboard" className="z-50">
                    <Button className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Start Now
                    </Button>
                </Link>
            </div>

            {/* Benefits */}
            <div className="py-16 sm:py-24 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center text-neutral-800 dark:text-neutral-200 font-bold mb-12 sm:mb-16">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 max-w-7xl mx-auto">
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 dark:border-blue-900 transform hover:-translate-y-1">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-800 dark:text-neutral-200">
                            Realistic exercises
                        </h3>
                        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                            Select your niche and complete exercises that mirror real-life copywriting tasks, preparing you for actual clients.
                        </p>
                    </div>
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 dark:border-purple-900 transform hover:-translate-y-1">
                        <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-800 dark:text-neutral-200">
                            Custom AI Feedback
                        </h3>
                        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                            Get instant, personalized feedback to improve your skills quickly. Our AI helps you get better, faster.
                        </p>
                    </div>
                    <div className="cursor-pointer bg-white dark:bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 dark:border-green-900 transform hover:-translate-y-1">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neutral-800 dark:text-neutral-200">
                            Get paid fast
                        </h3>
                        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                            Complete exercises, build your skills, and unlock access to businesses looking for top copywriters with our Private Business Community.
                        </p>
                    </div>
                </div>
                {/* CTA button */}
                <div className="flex justify-center mt-12 sm:mt-16">
                    <Link href="/dashboard" className="flex items-center text-sm sm:text-base py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                        Start Improving Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-16 sm:py-24 px-4 sm:px-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-neutral-800 dark:text-neutral-200 font-bold mb-8 sm:mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-sm sm:text-base">What is an exercise?</AccordionTrigger>
                            <AccordionContent className="text-xs sm:text-sm">
                                An exercise is like pretending to work for a real business. You&apos;ll get a &apos;practice client&apos; based on the niche and task you pick before you start.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-sm sm:text-base">How can I be sure that AI gives me the right feedback?</AccordionTrigger>
                            <AccordionContent className="text-xs sm:text-sm">
                                We use the latest AI models and finely-tuned system prompts to provide feedback tailored to each exercise. Our AI is trained to give actionable, precise suggestions to help you improve with each exercise!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-sm sm:text-base">Can I use CopyCoach on mobile?</AccordionTrigger>
                            <AccordionContent className="text-xs sm:text-sm">
                                Yes, CopyCoach works seamlessly on mobile, so you can learn and practice copywriting on the go!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger className="text-sm sm:text-base">What&apos;s the Private Business Community?</AccordionTrigger>
                            <AccordionContent className="text-xs sm:text-sm">
                                A group of businesses actively looking to work with top-notch copywriters. You&apos;ll receive a private email invitation to join if you complete 100 exercises in ONE specific niche.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
