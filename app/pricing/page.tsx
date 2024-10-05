"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Trophy } from 'lucide-react';

const PricingPage: React.FC = () => {
    const router = useRouter();
    const topRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16">
            <div ref={topRef} className="max-w-6xl w-full space-y-16">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                        Flexible Pricing
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        1 exercise = 1 credit. Recharge only when you need—no monthly fees, no strings attached
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PricingCard
                        icon={<Star className="h-6 w-6 text-yellow-400" />}
                        title="Newbie"
                        price="$7.99"
                        features={[
                            "20 credits",
                            "Custom AI feedback",
                            "Community access",
                            "Basic theory"
                        ]}
                        ctaText="Get Now"
                        onCtaClick={() => router.push('/checkout')}
                        color="bg-yellow-50"
                        ctaColor="bg-yellow-600 hover:bg-yellow-700"
                        description="Perfect for ocassional exercising"
                    />
                    <PricingCard
                        icon={<Zap className="h-6 w-6 text-blue-500" />}
                        title="Learner"
                        price="$13.99"
                        features={[
                            "60 credits",
                            "Custom AI feedback",
                            "Exclusive community access",
                            "Advanced theory",
                            "Weekly theory deep-dives"
                        ]}
                        ctaText="Get Now"
                        popular={true}
                        onCtaClick={() => router.push('/checkout')}
                        color="bg-white"
                        className="scale-105 shadow-lg bg-blue-50 border-2 border-blue-500"
                        ctaColor="bg-blue-600 hover:bg-blue-700"
                        description="For ambitious learners seeking the best value."
                    />
                    <PricingCard
                        icon={<Trophy className="h-6 w-6 text-purple-600" />}
                        title="Master"
                        price="$499"
                        features={[
                            "Unlimited credits",
                            "Custom AI feedback",
                            "Exclusive group access",
                            "Advanced theory",
                            "Weekly theory deep-dives",
                            "1:1 expert mentoring call"
                        ]}
                        ctaText="Get Now"
                        onCtaClick={() => router.push('/checkout')}
                        color="bg-purple-50"
                        ctaColor="bg-purple-600 hover:bg-purple-700"
                        description="Only for people who want to master copywriting."
                    />
                </div>
                <p className="text-center mt-8 text-gray-600 font-semibold">
                    Our Guarantee: Complete 100 exercises and get a paying client in 90 days or get a full refund.
                </p>
            </div>
        </div>
    );
};

interface PricingCardProps {
    icon: React.ReactNode;
    title: string;
    price: string;
    features: string[];
    ctaText: string;
    popular?: boolean;
    onCtaClick: () => void;
    color: string;
    className?: string;
    ctaColor: string;
    description: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ icon, title, price, features, ctaText, popular, onCtaClick, color, className, ctaColor, description }) => {
    return (
        <Card className={`flex flex-col ${color} border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}>
            {popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-bl rounded-tr">
                    Popular
                </div>
            )}
            <CardHeader className="pb-2">
                <div className="flex items-center justify-center mb-2">
                    {icon}
                </div>
                <CardTitle className="text-xl font-semibold text-center mb-2">{title}</CardTitle>
                <p className="text-2xl font-bold text-center">{price}</p>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between p-4">
                <ul className="space-y-2 mb-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto">
                    <div className="h-16 flex items-center justify-center mb-3">
                        <p className="text-sm text-gray-600 text-center italic">{description}</p>
                    </div>
                    <Button onClick={onCtaClick} className={`w-full ${ctaColor} text-white`}>
                        {ctaText}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default PricingPage;
