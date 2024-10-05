'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LogOut, Sparkles, CreditCard, BadgePlus } from "lucide-react"
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabaseClient"
import { useRouter, usePathname } from 'next/navigation'
import Avvvatars from 'avvvatars-react'
import CopyCoachLogo from '@/public/logo.svg'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCredits = localStorage.getItem('credits');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCredits) {
      setCredits(Number(storedCredits));
    }

    const fetchUserAndCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user credits:', error);
        }

        if (data) {
          setCredits(data.credits);
          localStorage.setItem('credits', data.credits.toString());
        }
      }
    }

    fetchUserAndCredits();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem('user', JSON.stringify(session.user));
        fetchUserAndCredits();
      } else {
        setCredits(null);
        localStorage.removeItem('user');
        localStorage.removeItem('credits');
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('credits');
    router.replace('/');
  }

  return (
    <nav className="bg-white shadow-sm z-50 absolute top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <Image src={CopyCoachLogo} alt="CopyCoach Logo" width={200} height={40} />
            </Link>
          </div>
          <div className="flex items-center z-50">
            {user ? (
              <div className="relative flex items-center">
                {pathname === '/' ? (
                  <Button
                    variant="outline"
                    className="mr-4"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <div className="mr-4 flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{credits !== null ? credits : '...'} credits</span>
                    </div>
                    <Button
                      variant="outline"
                      className="mr-4"
                      onClick={() => alert('This feature is not available for beta testers.')}
                    >
                      <BadgePlus className="mr-2 h-4 w-4 text-blue-500" />
                      Add Credits
                    </Button>
                  </>
                )}
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger className="flex items-center">
                    <Avvvatars value={user.email || ''} size={32} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="ml-4">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="ml-4">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
