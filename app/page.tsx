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
import { Pen, Book, Sparkles, Star, Frown, Smile, Mail, FileText, ArrowRight, Gem } from 'lucide-react';
import localFont from 'next/font/local';
import Image from 'next/image';
import CeciuAvatar from '@/public/avatars/ceciu.jpg';
import Pricing from '@/components/pricing';

const BricolageGrotesque = localFont({
    src: './fonts/BricolageGrotesque.ttf',
    weight: '100 900',
    variable: '--font-bricolage-grotesque',
});

const examples = [
    {
        title: "Marketing Foundation",
        description: "Understand your ideal customer and how your product can win them. This is the core of your marketing strategy.",
        benefits: [
            "User Persona",
            "Customer Journey Map",
            "Positioning",
            "Customer Transformation",
            "Product Portfolio",
        ],
        image: CeciuAvatar,
    },
    {
        title: "Social media",
        description: "Write a social media post for a SaaS company",
        benefits: [
            "Increase brand awareness",
            "Improve SEO",
            "Generate leads",
            "Build a community",
            "Drive sales",
        ],
        image: CeciuAvatar,
    },
    {
        title: "Email marketing",
        description: "Write an email marketing campaign for a SaaS company",
        benefits: [
            "Increase brand awareness",
            "Improve SEO",
            "Generate leads",
            "Build a community",
            "Drive sales",
        ],
        image: CeciuAvatar,
    },
    {
        title: "Flyer",
        description: "Write a flyer for a SaaS company",
        benefits: [
            "Increase brand awareness",
            "Improve SEO",
            "Generate leads",
            "Build a community",
            "Drive sales",
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
        answer: "Absolutely! Complete 100 exercises in a specific niche, and you'll gain access to our exclusive Private Business Community. This network connects you directly with businesses actively seeking skilled copywriters. It's not just practice – it's a pathway to paid opportunities."
    },
    {
        question: "Is CopyCoach suitable for beginners?",
        answer: "Yes! Whether you're just starting out or looking to refine your skills, CopyCoach adapts to your level. Our diverse range of exercises and personalized AI feedback ensure that you're always challenged and improving, no matter your experience."
    },
    {
        question: "How often are new exercises added?",
        answer: "We regularly update our exercise database to keep content fresh and relevant. You'll always have new challenges to tackle, ensuring your skills stay sharp and up-to-date with the latest copywriting trends and techniques."
    },
    {
        question: "Can I use CopyCoach on my mobile device?",
        answer: "Absolutely! CopyCoach is fully responsive and works seamlessly on mobile devices. Practice your copywriting skills anytime, anywhere – on your commute, during lunch breaks, or whenever inspiration strikes!"
    },
    {
        question: "What if I'm not satisfied with CopyCoach?",
        answer: "We're confident in the value CopyCoach provides, which is why we offer a satisfaction guarantee. If you complete 100 exercises and don't secure a paying client within 90 days, we'll provide a full refund. Your success is our priority!"
    }
]

const LandingPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState(1);

    return (
        <>
            <Navbar />
            <main className="bg-white max-w-5xl mx-auto">
                {/* Section - landing */}
                <section className="flex flex-col items-center justify-center min-h-[75vh] py-12 relative overflow-hidden">
                    {/* Background symbols */}
                    <div className="absolute inset-0 z-0 opacity-25">
                        <Pen className="absolute top-1/4 left-1/4 h-12 w-12 sm:h-16 sm:w-16 text-[#6CB4EE] transform -rotate-12" />
                        <Book className="absolute top-1/3 right-1/4 h-12 w-12 sm:h-16 sm:w-16 text-[#6CB4EE] transform rotate-6" />
                        <Sparkles className="absolute bottom-1/4 left-1/3 h-8 w-8 sm:h-12 sm:w-12 text-[#6CB4EE]" />
                        <Pen className="absolute bottom-1/3 right-[20%] lg:right-1/3 h-10 w-10 sm:h-14 sm:w-14 text-[#6CB4EE] transform rotate-90" />
                    </div>

                    <h1 className={`${BricolageGrotesque.className} scale-110 bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans py-4 relative z-20 font-bold tracking-tight`}>
                        Learn by <span className='underline decoration-dashed decoration-[#007FFF] underline-offset-8'>doing</span>
                    </h1>

                    <h2 className="mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-center text-neutral-700/70 dark:text-neutral-300 font-semibold relative">
                        Master copywriting by exercising with real-world scenarios.<br className="hidden sm:block" />
                        Improve with custom AI feedback.
                    </h2>

                    <Link href="/signup" className="my-16">
                        <Button className={`${BricolageGrotesque.className} bg-[#007FFF] scale-125 sm:scale-150 hover:bg-[#007FFF] text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 text-white font-bold rounded-lg shadow-lg transform hover:scale-110 sm:hover:scale-125 transition-all duration-200`}>
                            Start now
                        </Button>
                    </Link>

                    {/* Social proof - single person */}
                    <div className="flex flex-col items-center justify-center space-y-6 relative">
                        <div className="flex items-center justify-center space-x-0.5">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFBF00] text-[#FFBF00]" />
                        </div>
                        <p className="text-center text-xs sm:text-sm font-medium">
                            {"Amazing. Best copywriting platform I've found. TRUSTMEBROLOGY"}
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
                </section>
                {/* Video demo */}
                <div className="w-full max-w-5xl mx-auto relative aspect-video">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.tella.tv/video/clyfhffbb023g09jnae7uhx4z/embed?b=0&amp;title=0&amp;a=1&amp;loop=0&amp;t=0&amp;muted=0&amp;wt=1"
                        allowFullScreen={true}
                    ></iframe>
                </div>

                {/* Section - Problem agitation without vs with */}
                <section className="flex flex-col items-center justify-center mt-24">
                    <h2 className={`${BricolageGrotesque.className} text-3xl sm:text-4xl md:text-5xl font-black text-center`}>
                        Brilliant SaaS idea is not enough.
                        <br />
                        You <span className='text-[#007FFF]'>need brilliant marketing</span> too.
                    </h2>
                    {/* 2 cards side by side */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                        <div className="flex flex-col items-left text-left justify-center p-6 sm:p-8 bg-red-50 rounded-xl w-full sm:w-1/2">
                            <Frown className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                            <h3 className="mt-4 text-lg sm:text-xl font-bold text-red-500">SaaS without marketing strategy</h3>
                            <ul className="mt-4 text-sm sm:text-base font-medium text-red-700 list-disc list-inside">
                                <li>No idea who your ideal customer is</li>
                                <li>Random marketing tactics</li>
                                <li>Leaking marketing funnel</li>
                                <li>Constant uncertainty about next steps</li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-left text-left justify-center p-6 sm:p-8 bg-green-50 rounded-xl w-full sm:w-1/2">
                            <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                            <h3 className="mt-4 text-lg sm:text-xl font-bold text-green-500">SaaS with marketing strategy</h3>
                            <ul className="mt-4 text-sm sm:text-base font-medium text-green-700 list-disc list-inside">
                                <li>Clear understanding of your ideal customer</li>
                                <li>Effective marketing tactics</li>
                                <li>Funnel that converts</li>
                                <li>Predictable and scalable growth</li>
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
                            {"Amazing. Best copywriting platform I've found. TRUSTMEBROLOGY"}
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

                {/* Section - How it works / Features / Examples*/}
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
                    <div className="mt-16 flex items-start justify-between w-screen bg-[#007FFF] p-6 sm:p-12">
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
                    <Pricing className="w-full px-0" />
                </section>

                {/* Section - FAQ */}
                <section className="flex flex-col items-center justify-center mt-48">
                    <h2 className={`${BricolageGrotesque.className} text-center text-3xl sm:text-4xl md:text-5xl font-black`}>
                        Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mt-12" defaultValue="item-0">
                        {faq.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="mb-4">
                                <AccordionTrigger className="text-lg sm:text-xl font-semibold">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-base sm:text-lg">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* Section - Ready CTA */}
                <section className="flex w-full p-12 rounded-lg bg-[#007FFF] flex-col items-left justify-between mt-24 min-h-[250px]">
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
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
