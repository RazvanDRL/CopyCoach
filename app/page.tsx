"use client"
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
import { Pen, Book, Sparkles, Star, Frown, Smile, Mail, FileText, ArrowRight, Gem, MessageSquare, LineChart } from 'lucide-react';
import localFont from 'next/font/local';
import Image from 'next/image';
import CeciuAvatar from '@/public/avatars/ceciu.jpg';
import Pricing from '@/components/pricing';
import Head from 'next/head';

const BricolageGrotesque = localFont({
    src: './fonts/BricolageGrotesque.ttf',
    weight: '100 900',
    variable: '--font-bricolage-grotesque',
});

const examples = [
    {
        title: "Get hands-on experience",
        description: "All our exercises are realistic, meant to mirror real life copywriting tasks from various niches. Choose one that suits your needs.",
        benefits: [
            "Realistic copywriting tasks",
            "Choose from various niches",
            "Improve your skills in a practical way",
        ],
        image: CeciuAvatar,
    },
    {
        title: "Improve with AI feedback",
        description: "Get personalized, actionable feedback on your copy. Our AI analyzes your work for clarity, persuasiveness, tone, and more, offering specific suggestions for improvement and personalized tips.",
        benefits: [
            "Personalized feedback",
            "Actionable suggestions",
            "Relevant criteria",
            "Revised version of your copy",
        ],
        image: CeciuAvatar,
    },
    {
        title: "Level up and unlock new opportunities",
        description: "Complete multiple exercises, level up your writing skills to get confident in your abilities and unlock exclusive rewards. Reach level <X> and get access to our SteveJobs Community.",
        benefits: [
            "Get confident in your writing skills",
            "Track your progress",
            "Unlock surprise benefits with each level",
            "Access exclusive opportunities",
        ],  
        image: CeciuAvatar,
    },
]

const faq = [
    {
        question: "What makes CopyCoach's exercises unique?",
        answer: "Our exercises are designed to simulate real-world copywriting scenarios. You'll work on tasks for 'practice clients' in various niches, preparing you for actual client work. This hands-on approach ensures you're developing practical skills that translate directly to your copywriting career."
    },
    {
        question: "How does the AI feedback work?",
        answer: "CopyCoach uses advanced AI models to provide personalized, actionable feedback on your copy. Our AI analyzes your work for clarity, persuasiveness, tone, and more, offering specific suggestions for improvement. It's like having a professional copywriter review your work 24/7, helping you refine your skills with every exercise."
    },
    {
        question: "Can CopyCoach really help me land clients?",
        answer: "Absolutely! Reach level <X> and get access to our SteveJobs Community. This network connects you directly with businesses actively seeking skilled copywriters."
    },
    {
        question: "Is CopyCoach for me?",
        answer: "CopyCoach is designed for copywriters of all levels, from beginners to professionals. Whether you're just starting out or looking to refine your skills, our exercises are tailored to meet your needs, ensuring you get the most out of your practice time."
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
        "Stuck in tutorial hell",
        "Unable to see progress",
        "Constantly doubting your skills",
        "General advice",
    ]
}]

const withCopyCoach = [{
    title: "You with CopyCoach",
    list: [
        "Able to put skills to practice",
        "See your progress",
        "Confidence in your skills",
        "Tips to improve exactly where you need it",
    ]
}]

const howItWorks = [
    {
        title: "Exercise",
        description: "Work on realistic copywriting exercises designed to improve your skills in a practical way.",
    },
    {
        title: "Get Feedback",
        description: "Receive detailed feedback on your copy, with specific suggestions for improvement and personalized tips.",
    },
    {
        title: "Improve",
        description: "Track your progress and continuously improve your copywriting skills with each exercise.",
    }
]

const LandingPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState(1);

    return (
        <>
            <Head>
                <meta name="description" content="Learn copywriting by doing. Master copywriting by exercising with real-world scenarios. Improve with custom AI feedback." />
                <link rel="canonical" href="https://copy-coach.com" />
            </Head>
            <Navbar />
            <main className="bg-white max-w-5xl mx-auto">
                {/* Section - landing */}
                <section className="flex flex-col items-center justify-center min-h-[85dvh] relative overflow-hidden">
                    {/* Background symbols */}
                    <div className="absolute inset-0 z-0 opacity-25">
                        <Pen className="absolute top-1/4 left-1/4 h-10 w-10 sm:h-16 sm:w-16 text-[#6CB4EE] transform -rotate-12" />
                        <Book className="absolute top-1/3 right-1/4 h-10 w-10 sm:h-16 sm:w-16 text-[#6CB4EE] transform rotate-6" />
                        <Sparkles className="absolute bottom-1/4 left-1/3 h-8 w-8 sm:h-12 sm:w-12 text-[#6CB4EE]" />
                        <Pen className="absolute bottom-1/3 right-[20%] lg:right-1/3 h-10 w-10 sm:h-14 sm:w-14 text-[#6CB4EE] transform rotate-90" />
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-center gap-10 md:gap-12 z-50">
                        <h1 className={`${BricolageGrotesque.className} bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 text-[3.2rem] sm:text-6xl md:text-7xl lg:text-8xl relative font-bold`}>
                            Learn by <span className='underline decoration-dashed decoration-[#007FFF] underline-offset-8'>doing</span>
                        </h1>

                        <h2 className="-mt-4 md:-mt-0 text-base sm:text-lg md:text-xl lg:text-2xl text-center text-black/50 font-semibold relative">
                            Master copywriting by exercising with real-world scenarios.<br className="hidden sm:block" />
                            Improve with custom AI feedback.
                        </h2>

                        <Link href="/signup">
                            <Button
                                className={`${BricolageGrotesque.className} bg-[#007FFF] hover:bg-[#007FFF] hover:scale-105 transition-all duration-200 text-2xl md:text-3xl font-bold h-[4rem] md:h-[4.5rem] rounded-xl px-8 md:px-12`}
                            >
                                Start now
                            </Button>
                        </Link>
                        {/* Social proof - single person */}
                        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
                            <div className="flex items-center justify-center space-x-0.5">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                            </div>
                            <p className="text-center text-xs sm:text-sm font-medium">
                                {"Amazing. Best copywriting platform I've found."}
                            </p>
                            {/* image + name + followers count */}
                            <div className="flex items-center justify-center space-x-4">
                                <Image src={CeciuAvatar} alt="ceciu" width={36} height={36} className="rounded-full sm:w-12 sm:h-12" />
                                <div className="flex flex-col items-left space-y-1 z-50">
                                    <Link href="https://www.instagram.com/ceciu.gmi/" className="cursor-pointer hover:underline text-left text-xs sm:text-sm font-semibold">
                                        Ceciu Sebasitan
                                    </Link>
                                    <p className="text-left text-xs sm:text-sm flex items-center">
                                        654 followers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Video demo */}
                <div className="w-full max-w-5xl mx-auto relative aspect-video">
                    <iframe
                        className="absolute px-6 top-0 left-0 w-full h-full"
                        src="https://www.tella.tv/video/clyfhffbb023g09jnae7uhx4z/embed?b=0&amp;title=0&amp;a=1&amp;loop=0&amp;t=0&amp;muted=0&amp;wt=1"
                        allowFullScreen={true}
                    ></iframe>
                </div>

                {/* Section - Problem agitation without vs with */}
                <section className="flex flex-col items-center justify-center mt-24 px-6">
                    <h2 className={`${BricolageGrotesque.className} text-2xl sm:text-4xl md:text-5xl font-black text-center`}>
                        Theory alone is not enough.
                        <br />
                        You need <span className='text-[#007FFF]'>real practice</span> too.
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
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFBF00] text-[#FFBF00]" />
                        </div>
                        <p className="text-center text-xs sm:text-sm font-medium text-neutral-700">
                            {"Amazing. Best copywriting platform I've found."}
                        </p>
                        {/* image + name + followers count */}
                        <div className="flex items-center justify-center space-x-4 text-neutral-700/70">
                            <Image src={CeciuAvatar} alt="ceciu" width={36} height={36} className="rounded-full sm:w-12 sm:h-12" />
                            <div className="flex flex-col items-left space-y-1 z-50">
                                <Link href="https://www.instagram.com/ceciu.gmi/" className="cursor-pointer hover:underline text-left text-xs sm:text-sm font-semibold">
                                    Ceciu Sebasitan
                                </Link>
                                <p className="text-left text-xs sm:text-sm flex items-center">
                                    654 followers
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* cta */}
                    <Link href="/signup" className="mt-16">
                        <Button className={`${BricolageGrotesque.className} bg-[#007FFF] scale-125 sm:scale-150 hover:bg-[#007FFF] text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 text-white font-bold rounded-lg shadow-lg transform hover:scale-110 sm:hover:scale-125 transition-all duration-200`}>
                            Start now
                        </Button>
                    </Link>
                </section>

                {/* Section - How it works */}
                <section className="flex flex-col items-center justify-center mt-24">
                    <h2 className={`${BricolageGrotesque.className} text-center text-3xl sm:text-4xl md:text-5xl font-black`}>
                        How it works
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full">
                        {howItWorks.map((item, index) => (
                            <div key={index} className="flex flex-col items-left text-left justify-center p-6 sm:p-8 bg-white rounded-xl w-full">
                                <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                                <p className="mt-2 text-sm sm:text-base text-neutral-700">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section - Features */}
                <section className="flex flex-col items-center justify-center mt-24">
                    <h2 className={`${BricolageGrotesque.className} text-center text-3xl sm:text-4xl md:text-5xl font-black`}>
                        Automate boring problems.
                        <br />
                        Focus on what really matters.
                    </h2>
                    {/* menu with 4 options */}
                    <div className="mt-16 flex items-center justify-center gap-2 sm:gap-6 w-full">
                        <Button
                            className={`p-4 sm:p-8 rounded-xl ${selectedOption === 1 ? 'text-[#007FFF] bg-[#007FFF]/10 hover:text-[#007FFF] hover:bg-[#007FFF]/10' : 'hover:text-[#007FFF]/70 hover:bg-[#007FFF]/10'}`}
                            variant='ghost'
                            onClick={() => {
                                setSelectedOption(1);
                            }}
                        >
                            <Pen className="w-4 h-4 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                            className={`p-4 sm:p-8 ${selectedOption === 2 ? 'text-[#007FFF] bg-[#007FFF]/10 hover:text-[#007FFF] hover:bg-[#007FFF]/10' : 'hover:text-[#007FFF]/70 hover:bg-[#007FFF]/10'}`}
                            variant='ghost'
                            onClick={() => {
                                setSelectedOption(2);
                            }}
                        >
                            <Book className="w-4 h-4 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                            className={`p-4 sm:p-8 ${selectedOption === 3 ? 'text-[#007FFF] bg-[#007FFF]/10 hover:text-[#007FFF] hover:bg-[#007FFF]/10' : 'hover:text-[#007FFF]/70 hover:bg-[#007FFF]/10'}`}
                            variant='ghost'
                            onClick={() => {
                                setSelectedOption(3);
                            }}
                        >
                            <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                            className={`p-4 sm:p-8 ${selectedOption === 4 ? 'text-[#007FFF] bg-[#007FFF]/10 hover:text-[#007FFF] hover:bg-[#007FFF]/10' : 'hover:text-[#007FFF]/70 hover:bg-[#007FFF]/10'}`}
                            variant='ghost'
                            onClick={() => {
                                setSelectedOption(4);
                            }}
                        >
                            <FileText className="w-4 h-4 sm:w-6 sm:h-6" />
                        </Button>
                    </div>
                    <div className="mt-16 flex items-start justify-between w-[99.1vw] bg-[#007FFF] p-6 sm:p-12">
                        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row">
                            <div className="flex-1 pr-0 sm:pr-8 max-w-full sm:max-w-sm mb-8 sm:mb-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-white">{examples[selectedOption - 1].title}</h1>
                                <p className="text-sm sm:text-md text-white/70 mt-4">{examples[selectedOption - 1].description}</p>
                                <ul className="text-sm sm:text-md text-white mt-6">
                                    {examples[selectedOption - 1].benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-shrink-0">
                                <Image
                                    src={examples[selectedOption - 1].image}
                                    alt={examples[selectedOption - 1].title}
                                    width={300}
                                    height={600}
                                    className="rounded-lg shadow-lg w-full sm:w-auto"
                                />
                            </div>
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
                            <Gem className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 mb-4" />
                            Ready to grow your copywriting skills?
                        </h2>
                    </div>
                    <Link href="/signup" className="mt-16">
                        <Button className={`${BricolageGrotesque.className} hover:scale-105 bg-white text-[#007FFF] hover:bg-white hover:text-[#007FFF] font-bold text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-7 px-6 sm:px-8 md:px-10 rounded-lg shadow-lg transform transition-all duration-200`}>
                            Start now
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-3" />
                        </Button>
                    </Link>
                </section>
            </main >
            <Footer />
        </>
    );
};

export default LandingPage;
