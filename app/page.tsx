import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryGrid } from "@/components/home/category-grid";
import { TopMentors } from "@/components/home/top-mentors";
import { HomeFooter } from "@/components/home/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FCTAButton } from "@/components/chat/fcta-button";
import { Users, Target, Clock, Network } from "lucide-react";
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
                <span className="text-blue-600">See All Mentors</span>
              </Link>
            </Button>
          </div>
          <TopMentors />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose InfyCo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community of learners and mentors to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Expert Mentors</h3>
                <p className="text-muted-foreground">
                  Connect with industry professionals from top companies for real-world insights and guidance
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Personalized Growth</h3>
                <p className="text-muted-foreground">
                  Receive tailored mentorship and career advice to accelerate your professional journey
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Learning</h3>
                <p className="text-muted-foreground">
                  Learn at your own pace through various session formats, including hackathons and internships
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold">Peer Networking</h3>
                <p className="text-muted-foreground">
                  Engage with like-minded students, participate in group discussions, and build meaningful connections
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/mentors">
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeFooter />
      <FCTAButton />
    </div>
  );
}