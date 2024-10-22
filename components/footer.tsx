import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { bricolage } from '@/fonts/font'
import Xlogo from '@/public/logos/x.svg'

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter subscription logic here
  }

  return (
    <footer className="bg-background mt-12 px-8">
      <div className="max-w-5xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className={`${bricolage.className} text-2xl font-bold text-primary hover:opacity-90 transition-opacity`}>
              CopyC<span className="text-[#007FFF]">o</span>ach
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering writers with AI-driven insights and practical exercises to master the art of copywriting.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="hover:bg-[#007FFF]/10 transition-colors" asChild>
                <Link href="https://instagram.com/arthurluca101/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#007FFF]/10 transition-colors" asChild>
                <Link href="https://x.com/arthurluca101" target="_blank" rel="noopener noreferrer">
                  <Image src={Xlogo} alt="X" className="h-4 w-4" />
                  <span className="sr-only">X</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-[#007FFF]/10 transition-colors" asChild>
                <Link href="mailto:contact@copycoach.com">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
          <nav className="space-y-6">
            <h3 className="text-sm font-semibold text-primary">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Pricing</Link></li>
              <li><Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Testimonials</Link></li>
              <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">FAQ</Link></li>
            </ul>
          </nav>
          <nav className="space-y-6">
            <h3 className="text-sm font-semibold text-primary">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-primary">Stay updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest copywriting tips and product updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow focus:ring-2 focus:ring-[#007FFF]"
                required
              />
              <Button
                type="submit"
                className="bg-[#007FFF] hover:bg-[#007FFF]/90 text-white transition-colors w-full"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CopyCoach. All rights reserved.
          </p>
          <nav className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Terms</Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-[#007FFF] transition-colors">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}