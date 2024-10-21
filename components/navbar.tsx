'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LogOut, CreditCard, BadgePlus, Menu, NotebookPen, Award, ArrowRight } from "lucide-react"
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
import localFont from 'next/font/local';
import Level from '@/components/level';

const BricolageGrotesque = localFont({
  src: "../app/fonts/BricolageGrotesque.ttf",
  weight: "100 900",
  variable: '--font-bricolage-grotesque',
})

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [totalXp, setTotalXp] = useState<number | null>(null)
  const [level, setLevel] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCredits = localStorage.getItem('credits');
    const storedXp = localStorage.getItem('totalXp');
    const storedLevel = localStorage.getItem('level');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCredits) {
      setCredits(Number(storedCredits));
    }

    if (storedXp) {
      setTotalXp(Number(storedXp));
    }

    if (storedLevel) {
      setLevel(Number(storedLevel));
    }

    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('credits,total_xp,level')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
        }

        if (data) {
          setCredits(data.credits);
          setTotalXp(data.total_xp);
          setLevel(data.level);
          localStorage.setItem('credits', data.credits.toString());
          localStorage.setItem('totalXp', data.total_xp.toString());
          localStorage.setItem('level', data.level.toString());
        }
      }
    }

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        localStorage.setItem('user', JSON.stringify(session.user));
        fetchUserData();
      } else {
        setCredits(null);
        setTotalXp(null);
        setLevel(null);
        localStorage.removeItem('user');
        localStorage.removeItem('credits');
        localStorage.removeItem('totalXp');
        localStorage.removeItem('level');
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
    localStorage.removeItem('totalXp');
    localStorage.removeItem('level');
    router.replace('/');
  }

  return (
    <nav className="bg-white shadow-sm z-50 absolute top-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <Image src={CopyCoachLogo} alt="CopyCoach Logo" width={200} height={40} className="h-[30px] md:h-[40px] w-auto" />
            </Link>
          </div>
          <div className="hidden sm:flex items-center z-50">
            {user ? (
              <div className="relative flex items-center">
                {pathname === '/' ? (
                  <Button
                    variant="outline"
                    className={`${BricolageGrotesque.className} mr-4`}
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                ) : (
                  <>
                    {/* <div className="mr-4 flex items-center">
                      <NotebookPen className="mr-2 h-4 w-4 text-[#007FFF]" />
                      <span className="text-sm font-medium">{credits !== null ? credits : '...'} exercises</span>
                    </div> */}
                    {level !== null && totalXp !== null && (
                      <div className="mr-4">
                        <Level level={level} total_xp={totalXp} />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      className={`${BricolageGrotesque.className} mr-4 border-[#007FFF]`}
                      onClick={() => alert('This feature is not available for beta testers.')}
                    >
                      <BadgePlus className="mr-2 h-4 w-4 text-[#007FFF]" />
                      Add Exercises
                    </Button>
                  </>
                )}
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger className="flex items-center">
                    <Avvvatars value={user.email || ''} size={32} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="line-clamp-1">
                      <div className="flex flex-col">
                        <label className="text-xs opacity-50">Email</label>
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className={`${BricolageGrotesque.className}`}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default" className={`ml-4 bg-[#007FFF] font-semibold ${BricolageGrotesque.className} text-white`}>
                    Start now
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                {pathname === '/' && (
                  <Button
                    variant="outline"
                    className={`${BricolageGrotesque.className} w-full text-left`}
                    onClick={() => {
                      router.push('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                )}
                {pathname !== '/' && (
                  <>
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-[#007FFF]" />
                        <span className="text-sm font-medium">{credits !== null ? credits : '...'} exercises</span>
                      </div>
                    </div>
                    {level !== null && totalXp !== null && (
                      <div className="px-4 py-2">
                        <Level level={level} total_xp={totalXp} showTooltip={false} />
                      </div>
                    )}
                  </>
                )}
                <Button
                  variant="outline"
                  className={`${BricolageGrotesque.className} w-full text-left border-[#007FFF]`}
                  onClick={() => alert('This feature is not available for beta testers.')}
                >
                  <BadgePlus className="mr-2 h-4 w-4 text-[#007FFF]" />
                  Add Exercises
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-left"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="outline" className={`w-full text-center ${BricolageGrotesque.className}`}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                  <Button variant="default" className={`w-full text-center bg-[#007FFF] ${BricolageGrotesque.className} text-white`}>
                    Start now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
