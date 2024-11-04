"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Pen, Book, Sparkles, Star, Frown, Smile, Mail, FileText, ArrowRight, Gem, MessageSquare, LineChart, Plus } from 'lucide-react';
import localFont from 'next/font/local';
import Image from 'next/image';
import Pricing from '@/components/pricing';
import VarameaAvatar from '@/public/avatars/varamea.jpg';
import CeciuAvatar from '@/public/avatars/ceciu.jpg';
import Openreplay from '@/components/openReplay';

const BricolageGrotesque = localFont({
    src: './fonts/BricolageGrotesque.ttf',
    weight: '100 900',
    variable: '--font-bricolage-grotesque',
});

const examples = [
    {
        title: "Practice copywriting with real-world scenarios",
        description: "You'll get a fictive client alongside a brief of their business, experiencing what it's like to write for real businesses, and learning exactly what works!",
        video: "/steps/step1.gif",
    },

    {
        title: "Get feedback that matters",
        description: "With each exercise, you'll receive a score, tips on where you can improve, and a revised version of your work, showing you exactly what, why and how to improve.",
        video: "/steps/step2.gif",
    },
    {
        title: "Watch your skills grow",
        description: "Complete exercises, level up, and build confidence in your writing abilities! Plus, you're never alone - you will be part of a community of dedicated writers helping each other!",
        video: "/steps/step3.gif",
    },
]

const faq = [
    {
        question: "Is CopyCoach right for me?",
        answer: "If you're interested in copywriting but tired of just watching tutorials, CopyCoach is perfect for you. Whether you're just starting out or looking to sharpen your skills, our practical exercises help you learn by doing - the most effective way to improve your writing."
    },
    {
        question: "How does the practice system work?",
        answer: "Each exercise is based on real-world scenarios. You'll get a brief (just like from a real client), write your copy, and receive instant AI feedback on your work. Plus, you'll see how a pro would approach the same task - helping you learn faster and more effectively."
    },
    {
        question: "What makes CopyCoach different?",
        answer: "Unlike traditional courses or tutorials, CopyCoach focuses on practical experience. You'll write real copy, get specific feedback, and improve with every exercise. It's like having a personal writing coach available 24/7."
    },
    {
        question: "How does the AI feedback work?",
        answer: "CopyCoach uses advanced AI models to provide personalized, actionable feedback on your copy. Our AI analyzes your work for clarity, persuasiveness, tone, and more, offering specific suggestions for improvement. It's like having a professional copywriter review your work 24/7, helping you refine your skills with every exercise."
    },
    {
        question: "Can CopyCoach really help me land clients?",
        answer: "Absolutely! Reach level 30 and get access to our Jobs Community. This network connects you directly with businesses actively seeking skilled copywriters."
    },
    {
        question: "Do you have an affiliate program?",
        answer: "Yes! We offer a generous 50% commission on all sales you refer to CopyCoach. Join our affiliate program to earn passive income while helping others improve their copywriting skills. It's a win-win!"
    },
    {
        question: "Can I use CopyCoach on my mobile device?",
        answer: "Absolutely! CopyCoach is fully responsive and works seamlessly on mobile devices. Practice your copywriting skills anytime, anywhere – on your commute, during lunch breaks, or whenever inspiration strikes!"
    },
    {
        question: "What if I'm not satisfied with CopyCoach?",
        answer: "We want you to be completely satisfied with CopyCoach. That's why we offer a 7-day money-back guarantee. If you're not happy with your experience within the first 7 days, we'll provide a full refund - no questions asked. Your satisfaction is our priority!"
    }
]

const withoutCopyCoach = [{
    title: "You without CopyCoach",
    list: [
        "Stuck on tutorials instead of actually writing",
        "Doubting your skills",
        "Never knowing if you're improving",
        "Getting generic, one-size-fits-all advice",
    ]
}]

const withCopyCoach = [{
    title: "You with CopyCoach",
    list: [
        "Able to put your skills into practice",
        "Building confidence with every exercise",
        "Tracking your growth in one place",
        "Getting personalized feedback that matters",
    ]
}]

const LandingPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<1 | 2 | 3>(1);

    return (
        <>
            <Openreplay />
            <Navbar />
            <main className="bg-white max-w-5xl mx-auto">
                {/* Section - landing */}
                <section className="flex flex-col items-center justify-center min-h-[85dvh] relative overflow-hidden">
                    {/* Background symbols */}
                    {/* <div className="absolute inset-0 z-0 opacity-25">
                        <Pen className="absolute top-1/4 left-[10%] h-10 w-10 sm:h-16 sm:w-16 text-[#6CB4EE] transform -rotate-12" />
                        <Book className="absolute top-1/3 right-[10%] h-10 w-10 sm:h-16 sm:w-16 text-[#6CB4EE] transform rotate-6" />
                        <Sparkles className="absolute bottom-1/4 left-1/3 h-8 w-8 sm:h-12 sm:w-12 text-[#6CB4EE]" />
                        <Pen className="absolute bottom-1/3 right-[20%] lg:right-1/3 h-10 w-10 sm:h-14 sm:w-14 text-[#6CB4EE] transform rotate-90" />
                    </div> */}
                    <div className="mt-24 flex flex-col items-center justify-center gap-10 md:gap-12 z-50">
                        <h1 className={`${BricolageGrotesque.className} bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl relative font-bold`}>
                            Learn by <span className='underline decoration-dashed decoration-[#007FFF] underline-offset-8'>doing</span>
                        </h1>

                        <h2 className="-mt-4 md:-mt-0 px-4 md:px-0 text-base sm:text-lg md:text-xl lg:text-2xl text-center text-black/50 font-semibold relative">
                            Practice copywriting with real-world scenarios.<br className="hidden sm:block" />
                            Get personalized AI feedback to improve faster.
                        </h2>

                        <Link href="/signup">
                            <Button
                                className={`${BricolageGrotesque.className} bg-[#007FFF] hover:bg-[#007FFF] hover:scale-105 transition-all duration-200 text-2xl md:text-3xl font-bold h-[4rem] md:h-[4.5rem] rounded-xl px-8 md:px-12`}
                            >
                                Start now
                            </Button>
                        </Link>
                        {/* Social proof - single person */}
                        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-6">
                            <div className="flex items-center justify-center space-x-0.5">
                                {[...Array(5)].map((_, index) => (
                                    <Star key={index} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                                ))}
                            </div>
                            <p className="text-center text-xs sm:text-sm font-medium text-black/70">
                                {"Best way to learn copywriting right now."}
                            </p>
                            {/* image + name + followers count */}
                            <div className="flex items-center justify-center space-x-4 text-black/50">
                                <Image src={VarameaAvatar} alt="varamea" width={140} height={140} quality={10} className="w-12 h-12 rounded-full aspect-square object-cover" />
                                <div className="flex flex-col items-left space-y-1 z-50">
                                    <Link href="https://www.instagram.com/bianca_tirsin/" className="cursor-pointer hover:underline text-left text-xs sm:text-sm font-semibold ">
                                        Tirsin Bianca
                                    </Link>
                                    <p className="text-left text-xs sm:text-sm flex items-center">
                                        70k followers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Video demo */}
                {/* <div className="w-full max-w-5xl mx-auto relative aspect-video">
                    <iframe
                        className="absolute px-6 top-0 left-0 w-full h-full"
                        src="https://www.tella.tv/video/clyfhffbb023g09jnae7uhx4z/embed?b=0&amp;title=0&amp;a=1&amp;loop=0&amp;t=0&amp;muted=0&amp;wt=1"
                        allowFullScreen={true}
                    ></iframe>
                </div> */}

                {/* Section - Problem agitation without vs with */}
                <section className="flex flex-col items-center justify-center mt-24 px-6">
                    <h2 className={`${BricolageGrotesque.className} text-2xl sm:text-4xl md:text-5xl font-black text-center`}>
                        Tired of endless tutorials?
                        <br />
                        It&apos;s time to <span className='text-[#007FFF]'>take action</span>
                    </h2>
                    {/* 2 cards side by side */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                        <div className="flex flex-col items-left text-left justify-center p-6 sm:p-8 bg-red-50 rounded-xl w-full sm:w-1/2">
                            <Frown className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                            <h3 className="mt-4 text-lg sm:text-xl font-bold text-red-500">{withoutCopyCoach[0].title}</h3>
                            <ul className="mt-4 text-sm sm:text-base font-medium text-red-700 list-disc list-inside">
                                {withoutCopyCoach[0].list.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col items-left text-left justify-center p-6 sm:p-8 bg-green-50 rounded-xl w-full sm:w-1/2">
                            <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                            <h3 className="mt-4 text-lg sm:text-xl font-bold text-green-500">{withCopyCoach[0].title}</h3>
                            <ul className="mt-4 text-sm sm:text-base font-medium text-green-700 list-disc list-inside">
                                {withCopyCoach[0].list.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* social proof - single person */}
                    <div className="mt-16 flex flex-col items-center justify-center space-y-4 relative">
                        <div className="flex items-center justify-center gap-[0.5px]">
                            {[...Array(5)].map((_, index) => (
                                <Star key={index} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                            ))}
                        </div>
                        <p className="text-center text-xs sm:text-sm font-medium text-neutral-700">
                            With CopyCoach you can easily learn how to
                            <br />
                            write copy that provides value & connects with the audience
                        </p>
                        {/* image + name + followers count */}
                        <div className="flex items-center justify-center space-x-4 text-neutral-700/70">
                            <Image src={CeciuAvatar} alt="ceciu" width={36} height={36} className="rounded-full sm:w-12 sm:h-12" />
                            <div className="flex flex-col items-left space-y-1 z-50">
                                <Link href="https://www.instagram.com/ceciu.gmi/" className="cursor-pointer hover:underline text-left text-xs sm:text-sm font-semibold">
                                    Ceciu Sebastian
                                </Link>
                                <p className="text-left text-xs sm:text-sm flex items-center">
                                    648 followers
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* cta */}
                    <Link href="/signup">
                        <Button
                            className={`mt-16 ${BricolageGrotesque.className} bg-[#007FFF] hover:bg-[#007FFF] hover:scale-105 transition-all duration-200 text-2xl md:text-3xl font-bold h-[4rem] md:h-[4.5rem] rounded-xl px-8 md:px-12`}
                        >
                            Start now
                        </Button>
                    </Link>
                </section>

                {/* Section - Features */}
                <section className="flex flex-col items-center justify-center mt-[10rem] px-4 sm:px-6 lg:px-8">
                    <h2 className={`${BricolageGrotesque.className} text-center text-3xl sm:text-4xl md:text-5xl font-black`}>
                        Focus on what matters:
                        <br />
                        Writing better copy.
                    </h2>
                    <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20 mt-16 w-full max-w-7xl mx-auto">
                        <ul className="w-full space-y-2 px-8">
                            <li>
                                <button
                                    className={`group relative flex gap-3 sm:gap-5 items-center w-full py-4 sm:py-5 text-sm sm:text-base md:text-lg font-medium text-left ${selectedOption === 1 ? 'text-[#007FFF]' : ''}`}
                                    onClick={() => setSelectedOption(1)}
                                    aria-expanded={selectedOption === 1}
                                >
                                    <span className={`scale-125 sm:scale-150 duration-100 ${selectedOption === 1 ? 'text-[#007FFF]' : ''}`}>
                                        <Pen className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </span>
                                    <span className={`flex items-center justify-between group-hover:translate-x-1 duration-150 flex-1 text-base-content font-semibold ${selectedOption === 1 ? 'text-[#007FFF]' : ''}`}>
                                        <h3 className="inline">{examples[0].title}</h3>
                                        {selectedOption !== 1 && <Plus className="w-4 h-4 ml-2" />}
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${selectedOption === 1 ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-4 sm:pb-5 px-4 sm:px-6 leading-relaxed text-sm sm:text-base text-black/50">
                                        {examples[0].description}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    className={`group relative flex gap-3 sm:gap-5 items-center w-full py-4 sm:py-5 text-sm sm:text-base md:text-lg font-medium text-left ${selectedOption === 2 ? 'text-[#007FFF]' : ''}`}
                                    onClick={() => setSelectedOption(2)}
                                    aria-expanded={selectedOption === 2}
                                >
                                    <span className={`scale-125 sm:scale-150 duration-100 ${selectedOption === 2 ? 'text-[#007FFF]' : ''}`}>
                                        <Book className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </span>
                                    <span className={`flex items-center justify-between group-hover:translate-x-1 duration-150 flex-1 text-base-content font-semibold ${selectedOption === 2 ? 'text-[#007FFF]' : ''}`}>
                                        <h3 className="inline">{examples[1].title}</h3>
                                        {selectedOption !== 2 && <Plus className="w-4 h-4 ml-2" />}
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${selectedOption === 2 ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-4 sm:pb-5 px-4 sm:px-6 leading-relaxed text-sm sm:text-base text-black/50">
                                        {examples[1].description}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    className={`group relative flex gap-3 sm:gap-5 items-center w-full py-4 sm:py-5 text-sm sm:text-base md:text-lg font-medium text-left ${selectedOption === 3 ? 'text-[#007FFF]' : ''}`}
                                    onClick={() => setSelectedOption(3)}
                                    aria-expanded={selectedOption === 3}
                                >
                                    <span className={`scale-125 sm:scale-150 duration-100 ${selectedOption === 3 ? 'text-[#007FFF]' : ''}`}>
                                        <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </span>
                                    <span className={`flex items-center justify-between group-hover:translate-x-1 duration-150 flex-1 text-base-content font-semibold ${selectedOption === 3 ? 'text-[#007FFF]' : ''}`}>
                                        <h3 className="inline">{examples[2].title}</h3>
                                        {selectedOption !== 3 && <Plus className="w-4 h-4 ml-2" />}
                                    </span>
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${selectedOption === 3 ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pb-4 sm:pb-5 px-4 sm:px-6 leading-relaxed text-sm sm:text-base text-black/50">
                                        {examples[2].description}
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="rounded-lg aspect-square w-full max-w-[26rem] mx-auto lg:mx-0 border-2 border-[#007FFF]/10">
                            <Image
                                src={examples[selectedOption - 1].video}
                                alt="steps gif"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover aspect-square relative"
                                unoptimized
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* Section - Pricing */}
                <section className="flex flex-col items-center justify-center mt-24">
                    <Pricing className="w-full px-6 lg:px-0" />
                </section>

                {/* Section - FAQ */}
                <section className="px-8 flex flex-col items-center justify-center mt-48">
                    <h2 className={`${BricolageGrotesque.className} text-center text-3xl sm:text-4xl md:text-5xl font-black`}>
                        Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mt-12">
                        {faq.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="mb-4">
                                <AccordionTrigger className="text-base sm:text-lg text-left font-semibold">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-sm sm:text-base">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* Section - Ready CTA */}
                <section className="flex w-full p-12 md:rounded-lg bg-[#007FFF] flex-col items-left justify-between mt-24 min-h-[250px]">
                    <div className="flex flex-col items-left justify-between">
                        <h2 className={`${BricolageGrotesque.className} text-left text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-[500px]`}>
                            Your first step to
                            <div className="flex items-center">
                                mastery
                                <Gem className="ml-2 w-5 h-5 md:w-8 md:h-8" />
                            </div>
                            is one exercise away.
                        </h2>
                    </div>
                    <Link href="/signup" className="mt-16">
                        <Button className={`${BricolageGrotesque.className} hover:scale-105 bg-white text-[#007FFF] hover:bg-white hover:text-[#007FFF] font-bold text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-7 px-6 sm:px-8 md:px-10 rounded-lg shadow-lg transform transition-all duration-200`}>
                            Start your journey
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-3" />
                        </Button>
                    </Link>
                </section >
            </main >
            <Footer />
        </>
    );
};

export default LandingPage;
