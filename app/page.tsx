import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryGrid } from "@/components/home/category-grid";
import { TopMentors } from "@/components/home/top-mentors";
import { HomeFooter } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FCTAButton } from "@/components/chat/fcta-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
    

     {/* Categories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Explore Mentorship Categories
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Top Mentors */}
      <section className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">Featured Mentors</h2>
            <Button asChild variant="outline">
              <Link href="/mentors">
                <span className="text-white">See All Mentors</span>
              </Link>
            </Button>
          </div>
          <TopMentors />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose InfyCo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Expert Mentors</h3>
              <p className="text-muted-foreground">
                Connect with industry professionals from top companies
              </p>
            </Card>
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Personalized Growth</h3>
              <p className="text-muted-foreground">
                Get customized guidance for your career journey
              </p>
            </Card>
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Learn at your own pace with various session formats
              </p>
            </Card>
          </div>
        </div>
      </section>

      <HomeFooter />
      <FCTAButton />
    </div>
  );
}