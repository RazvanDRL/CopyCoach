"use client";
import React from "react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";

// Shadcn
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Icons
import { X } from "lucide-react";

// Confetti
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export const TourCard: React.FC<CardComponentProps> = ({
    step,
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    arrow,
}) => {
    // Onborda hooks
    const { closeOnborda } = useOnborda();
    const router = useRouter();

    function handleConfetti() {
        closeOnborda();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    }

    function handleClose() {
        closeOnborda();
        router.push("/dashboard");
    }

    return (
        <div className="flex justify-center">
            <Card className="relative border-0 w-[50vw] sm:w-full max-w-lg z-[999] bg-white border-none">
                <CardHeader>
                    <div className="flex items-start justify-between w-full space-x-4">
                        <div className="flex flex-col space-y-2">
                            <CardDescription className="text-black/50">
                                {currentStep + 1} of {totalSteps}
                            </CardDescription>
                            <CardTitle className="mb-2 text-lg text-black">
                                {step.icon} {step.title}
                            </CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            className="text-black/50 absolute top-4 right-2 hover:bg-transparent hover:text-black/80"
                            onClick={handleClose}
                        >
                            Skip
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="text-black">{step.content}</CardContent>
                <CardFooter className="text-black">
                    <div className="flex flex-row justify-between w-full gap-4">
                        {currentStep !== 0 && (
                            <Button
                                onClick={() => prevStep()}
                                className="bg-[#007FFF] hover:bg-[#007FFF]/80 text-white hover:text-white w-full sm:w-auto"
                            >
                                Back
                            </Button>
                        )}
                        {currentStep + 1 !== totalSteps && (
                            <Button
                                onClick={() => nextStep()}
                                className="bg-[#007FFF] hover:bg-[#007FFF]/80 text-white hover:text-white ml-auto w-full sm:w-auto"
                            >
                                Next
                            </Button>
                        )}
                        {currentStep + 1 === totalSteps && (
                            <Button
                                className="bg-[#007FFF] hover:bg-[#007FFF]/80 text-white hover:text-white ml-auto w-full sm:w-auto"
                                onClick={handleConfetti}
                            >
                                🎉 Finish!
                            </Button>
                        )}
                    </div>
                </CardFooter>
                <span className="text-white">{arrow}</span>
            </Card>
        </div>
    );
};