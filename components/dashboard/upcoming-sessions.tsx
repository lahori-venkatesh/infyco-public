"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";

export function UpcomingSessions() {
  const sessions = [
    {
      id: 1,
      mentor: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        role: "Senior Frontend Engineer"
      },
      date: "2024-03-20",
      time: "2:00 PM",
      topic: "React Performance Optimization"
    },
    // Add more sessions...
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="p-4 border rounded-lg">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                <AvatarFallback>{session.mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{session.topic}</h3>
                <p className="text-sm text-muted-foreground">with {session.mentor.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Button variant="default" size="sm">
                <Video className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/messages?mentor=${session.mentor.name}`}>
                  Reschedule
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}