import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="bg-background border-t mt-24">
      <div className="container mx-auto py-16 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="font-bold text-xl">InfyCo</h3>
            <p className="text-sm text-muted-foreground">
              Empowering careers through expert mentorship and guidance.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com/infyco">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/company/infyco">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/infyco">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/mentors" className="text-sm text-muted-foreground hover:text-primary">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-muted-foreground hover:text-primary">
                  Book Sessions
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">
                  Give Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} InfyCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}