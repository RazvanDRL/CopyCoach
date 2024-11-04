import { OnbordaProvider, Onborda } from "onborda";
import { onboardingSteps } from "./onboarding";
import { TourCard } from "@/components/tourCard";

export default function OnboardingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <OnbordaProvider>
            <Onborda
                steps={onboardingSteps}
                showOnborda={true}
                shadowRgb="0,0,0"
                shadowOpacity="0.7"
                cardComponent={TourCard}
            >
                {children}
            </Onborda>
        </OnbordaProvider>
    );
}
