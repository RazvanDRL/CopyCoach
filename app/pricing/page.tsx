"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';
import StripeLogo from '@/public/logos/stripe.svg';
import localFont from 'next/font/local';
import Image from 'next/image';

const BricolageGrotesque = localFont({
    src: '../fonts/BricolageGrotesque.ttf',
    weight: '100 900',
    variable: '--font-bricolage-grotesque',
});

const plans = [
    {
        title: "Newbie",
        emoji: "🌱",
        description: "Perfect for occasional exercising and learning",
        price: 19,
        features: [
            "20 exercises",
            "Custom AI feedback",
            "Community access",
            "Basic theory"
        ],
        cta: "Get Started",
        paymentLink: "4gw14k4gw",
        popular: false
    },
    {
        title: "Learner",
        emoji: "🚀",
        description: "For ambitious learners seeking the best value",
        price: 49,
        features: [
            "60 exercises",
            "Custom AI feedback",
            "Exclusive community access",
            "Advanced theory",
            "Weekly theory deep-dives"
        ],
        cta: "Level Up Now",
        paymentLink: "5kOaEa4gw",
        popular: true
    },
    {
        title: "Master",
        emoji: "🏆",
        description: "Only for people who want to master copywriting",
        price: 149,
        features: [
            "Unlimited exercises",
            "Custom AI feedback",
            "Exclusive group access",
            "Advanced theory",
            "Weekly theory deep-dives",
            "1:1 expert mentoring call"
        ],
        cta: "Go Pro",
        paymentLink: "6oC14k4gw",
        popular: false
    }
];

export function Pricing({ className, user }: { className?: string; user?: User | null }) {
    return (
        <div className={`${className} py-16 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-5xl mx-auto mt-16">
                <h1 className={cn("text-4xl sm:text-5xl font-extrabold mb-8 text-center", BricolageGrotesque.className)}>
                    Unlock Your <span className="text-[#007FFF]">Copywriting Potential</span> Today
                </h1>
                <p className="text-xl text-muted-foreground text-center mb-12">
                    1 exercise = 1 credit. <span className="decoration underline decoration-dashed underline-offset-4">Recharge only when you need</span>—no monthly fees, no strings attached.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <Card key={index} className={cn(
                            "flex flex-col px-6 rounded-xl",
                            plan.popular ? "border-[#007FFF] border-2 shadow-lg md:scale-105" : "",
                            "transition-all duration-200 hover:shadow-md"
                        )}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#007FFF] text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4">
                                    <CardTitle className={cn("text-2xl font-bold", BricolageGrotesque.className)}>{plan.title}</CardTitle>
                                    <span className="text-3xl">{plan.emoji}</span>
                                </div>
                                <CardDescription className="text-md">{plan.description}</CardDescription>
                                <div className={cn("text-4xl font-bold mb-2", BricolageGrotesque.className)}>
                                    ${plan.price}
                                    <span className="text-lg font-normal text-muted-foreground"> one-time</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <Check className="mr-2 h-5 w-5 text-[#007FFF]" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className={cn("w-full text-lg py-6 font-bold", BricolageGrotesque.className, plan.popular ? "bg-[#007FFF] text-white" : "bg-white text-black")} variant={plan.popular ? "default" : "outline"} asChild>
                                    <Link href={`https://buy.stripe.com/${plan.paymentLink}?prefilled_email=${user?.email}&client_reference_id=${user?.id}`}>
                                        {plan.cta}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Link href="https://stripe.com/" target="_blank" className="flex items-center justify-center mt-8 h-10">
                    <Lock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Secured by</span>
                    <Image src={StripeLogo} alt="Stripe" width={37} height={10} className="ml-1" />
                </Link>
            </div>
        </div>
    );
}

export default Pricing;
