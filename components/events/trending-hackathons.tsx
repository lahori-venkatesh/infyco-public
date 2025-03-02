"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users2 } from "lucide-react";
import Image from "next/image";

const hackathons = [
  {
    id: 1,
    title: "AI Innovation Challenge",
    organizer: "TechHub",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
    date: "April 15-17, 2024",
    location: "Online",
    description: "Build innovative AI solutions that solve real-world problems",
    prizes: ["₹1,00,000 First Prize", "₹50,000 Second Prize", "₹25,000 Third Prize"],
    teamSize: "2-4 members",
    participants: 500,
    themes: ["AI/ML", "Computer Vision", "NLP"],
    deadline: "April 10, 2024"
  },
  // Add more hackathons...
];

export function TrendingHackathons() {
  return (
    <div className="space-y-6">
      {hackathons.map((hackathon) => (
        <Card key={hackathon.id} className="overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-48 md:h-full">
              <Image
                src={hackathon.image}
                alt={hackathon.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 md:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{hackathon.title}</h3>
                  <p className="text-muted-foreground">by {hackathon.organizer}</p>
                </div>
                <Badge variant="secondary">Trending</Badge>
              </div>

              <p className="text-muted-foreground mb-4">
                {hackathon.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {hackathon.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {hackathon.location}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Trophy className="w-4 h-4 mr-2" />
                    {hackathon.prizes[0]}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users2 className="w-4 h-4 mr-2" />
                    {hackathon.teamSize}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.themes.map((theme) => (
                  <Badge key={theme} variant="outline">
                    {theme}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Button>Register Team</Button>
                <p className="text-sm text-muted-foreground">
                  Registration closes {hackathon.deadline}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}