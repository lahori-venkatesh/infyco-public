"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MessageSquare, Heart, Star } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "session",
      description: "Completed session with Sarah Johnson",
      time: "2 hours ago",
      icon: Calendar
    },
    {
      id: 2,
      type: "message",
      description: "New message from David Chen",
      time: "5 hours ago",
      icon: MessageSquare
    },
    {
      id: 3,
      type: "like",
      description: "Liked Emily Brown's profile",
      time: "1 day ago",
      icon: Heart
    },
    {
      id: 4,
      type: "review",
      description: "Left a review for last session",
      time: "2 days ago",
      icon: Star
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge variant="secondary">{activity.type}</Badge>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}