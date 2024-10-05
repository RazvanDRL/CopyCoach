"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Home, LogIn } from "lucide-react";
import GoogleLogo from "@/public/logos/google.svg"
import Image from "next/image";

const SignupPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                router.replace('/dashboard');
            }
        };
        checkUser();
    }, [router]);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'https://copy-coach.com/dashboard',
            },
        });
        if (error) {
            setError(error.message);
        } else {
            setMessage("Magic link sent! Please check your email.");
        }
        setLoading(false);
    };

    const handleOAuthLogin = async (provider: "google") => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : 'https://copy-coach.com/dashboard',
            },
        });
        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <Link href="/" className="absolute top-8 left-8">
                <Button variant="ghost">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                </Button>
            </Link>
            <Link href="/login" className="absolute top-8 right-8">
                <Button variant="ghost">
                    <LogIn className="h-4 w-4 mr-2" />
                    Don&apos;t have an account?
                </Button>
            </Link>
            <div className="max-w-md w-full bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-2 text-center">
                    Create an account
                </h2>
                <p className="text-sm text-black/50 mb-6 text-center">
                    Signup to get access to our AI copywriting coach
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 mb-4">{message}</p>}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full"
                            placeholder="name@example.com"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending magic link..." : "Send Magic Link"}
                    </Button>
                </form>
                <div className="mt-6 flex flex-col gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                or
                            </span>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleOAuthLogin("google")}
                        disabled={loading}
                    >
                        <Image src={GoogleLogo} alt="Google Logo" className="w-4 h-4 mr-2" />
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
