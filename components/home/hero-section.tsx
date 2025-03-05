import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full text-center overflow-hidden">
      {/* Image Wrapper */}
      <div className="relative w-full">
        {/* Mobile Image */}
        <div className="block sm:hidden">
          <Image
            src="/images/mobile1.svg"
            alt="Hero background mobile"
            width={500} // Adjust based on actual image size
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Tablet Image */}
        <div className="hidden sm:block md:hidden">
          <Image
            src="/images/tap1.svg"
            alt="Hero background tablet"
            width={800} // Adjust based on actual image size
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block xl:hidden">
          <Image
            src="/images/desktop1.svg"
            alt="Hero background desktop"
            width={1200} // Adjust based on actual image size
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Large Screen Image */}
        <div className="hidden xl:block">
          <Image
            src="/images/large.svg"
            alt="Hero background large"
            width={1600} // Adjust based on actual image size
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-top text-white px-6 mt-16 sm:mt-10 md:mt-22 space-y-6 sm:space-y-6 md:space-y-6">
        <h1 className="mt-4 lg:mt-16 xl:mt-24 sm:mt-4 text-2xl xs:text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Connect, Learn, and Grow with InfyCo
        </h1>
        <p className="text-base xs:text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-white mb-4 sm:mb-6 px-6 max-w-xl">
          Get personalized mentorship from industry experts and accelerate your career growth
        </p>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 justify-center">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/mentors">
              Book Free Session <ArrowRight className="ml-1 h-4 w-8" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
