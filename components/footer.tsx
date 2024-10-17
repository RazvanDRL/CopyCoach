import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { bricolage } from '@/fonts/font'

export default function Footer() {
  return (
    <footer className="bg-background mt-12">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className={`${bricolage.className} text-2xl font-bold text-primary`}>
              CopyC<span className="text-[#007FFF]">o</span>ach
            </Link>
            <p className="text-sm text-muted-foreground">Empowering your writing with AI-driven insights.</p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://www.instagram.com/arthurluca101/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              {/* Add more social media buttons here */}
            </div>
          </div>
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </nav>
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </nav>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">Stay updated</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest updates.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CopyCoach. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer >
  )
}