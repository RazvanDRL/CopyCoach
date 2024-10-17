"use client"
import Pricing from "@/components/pricing";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type User = {
    email: string;
    id: string;
}

export default function PricingPage() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user.email || !data.user.id) {
                console.error(error);
            } else {
                setUser({ email: data.user.email, id: data.user.id });
            }
        };
        fetchUser();
    }, []);

    return <Pricing user={user} />;
}