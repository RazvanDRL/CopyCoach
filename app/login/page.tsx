"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Home } from "lucide-react";

const LoginPage = () => {
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
        });
        if (error) {
            setError(error.message);
        } else {
            setMessage("Magic link sent! Please check your email.");
        }
        setLoading(false);
    };

    const handleOAuthLogin = async (provider: "google" | "github") => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
        });
        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <Link href="/" className="absolute top-4 left-4">
                <Button variant="ghost" size="icon">
                    <Home className="h-5 w-5" />
                </Button>
            </Link>
            <div className="max-w-md w-full bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending magic link..." : "Send Magic Link"}
                    </Button>
                </form>
                <div className="mt-6">
                    <p className="text-center text-gray-600">Or continue with</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin("google")}
                            disabled={loading}
                        >
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOAuthLogin("github")}
                            disabled={loading}
                        >
                            GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
