"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user/user-nav";
import { Menu, X } from "lucide-react";

export function NavigationMenu() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto">
        <div className="flex h-14 items-center px-2 sm:px-4">
          {/* Logo */}
          <Link href="/" className="mr-2 lg:mr-6">
            <h1 className="text-lg lg:text-xl font-bold">InfyCo</h1>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="ml-auto lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-6">
            <Link href="/mentors" className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/mentors" ? "text-primary" : "text-muted-foreground"
            )}>
              Find Mentors
            </Link>
            <Link href="/peers" className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/peers" ? "text-primary" : "text-muted-foreground"
            )}>
              Peers
            </Link>
            <Link href="/events" className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/events" ? "text-primary" : "text-muted-foreground"
            )}>
              Events
            </Link>
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden lg:flex items-center space-x-3">
            <UserNav />
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/signup">
                <span className="text-white">Sign up</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="flex flex-col space-y-3 p-3">
              <Link
                href="/mentors"
                className={cn(
                  "text-sm font-medium p-2 rounded-md transition-colors hover:bg-accent",
                  pathname === "/mentors" ? "text-primary bg-accent" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Mentors
              </Link>
              <Link
                href="/peers"
                className={cn(
                  "text-sm font-medium p-2 rounded-md transition-colors hover:bg-accent",
                  pathname === "/peers" ? "text-primary bg-accent" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Peers
              </Link>
              <Link
                href="/events"
                className={cn(
                  "text-sm font-medium p-2 rounded-md transition-colors hover:bg-accent",
                  pathname === "/events" ? "text-primary bg-accent" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <div className="pt-3 border-t flex flex-col space-y-3">
                <UserNav />
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/signup">
                    <span className="text-white">Sign up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}