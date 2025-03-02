import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 sm:py-24 px-4 text-center bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Connect, Learn, and Grow with InfyCo
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
          Get personalized mentorship from industry experts and accelerate your career growth
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/mentors">
              Book Free Session <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}