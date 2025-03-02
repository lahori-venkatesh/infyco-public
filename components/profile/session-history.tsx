"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

export function SessionHistory() {
  const sessions = [
    {
      id: 1,
      mentor: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        role: "Senior Frontend Engineer"
      },
      date: "2024-03-15",
      time: "10:00 AM",
      duration: "45 mins",
      topic: "Frontend Architecture",
      status: "completed"
    },
    // Add more sessions...
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Session History</h2>
      <div className="space-y-6">
        {sessions.map((session) => (
          <div key={session.id} className="flex items-start gap-4 p-4 border rounded-lg">
            <Avatar>
              <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
              <AvatarFallback>{session.mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{session.mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time} ({session.duration})
                    </span>
                  </div>
                </div>
                <Badge variant={session.status === "completed" ? "default" : "secondary"}>
                  {session.status}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/messages?mentor=${session.mentor.name}`}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button variant="outline" size="sm">View Notes</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}