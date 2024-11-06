'use client';
import { Card, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { bricolage } from "@/fonts/font";
import { Metadata } from "next";

// Reuse FAQ data from landing page
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
];

export const metadata: Metadata = {
    title: "FAQ - CopyCoach: Common Questions About Our AI Copywriting Platform",
    description: "Find answers to frequently asked questions about CopyCoach's AI-powered copywriting training platform. Learn about our practice system, feedback process, and more.",
    openGraph: {
        title: "FAQ - CopyCoach: Common Questions About Our AI Copywriting Platform",
        description: "Find answers to frequently asked questions about CopyCoach's AI-powered copywriting training platform. Learn about our practice system, feedback process, and more.",
    },
    twitter: {
        title: "FAQ - CopyCoach: Common Questions About Our AI Copywriting Platform",
        description: "Find answers to frequently asked questions about CopyCoach's AI-powered copywriting training platform. Learn about our practice system, feedback process, and more.",
    }
};

export default function FAQPage() {
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px-8 py-24">
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className={`${bricolage.className} text-4xl md:text-5xl font-bold text-center mb-4`}>
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600 text-center mb-12">
                        Everything you need to know about CopyCoach
                    </p>

                    <Card>
                        <CardContent className="p-6">
                            <Accordion type="single" collapsible className="w-full">
                                {faq.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
}
