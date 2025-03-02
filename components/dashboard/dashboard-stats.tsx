"use client";

import { Card } from "@/components/ui/card";
import { Clock, Users, BookOpen, Star } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      label: "Upcoming Sessions",
      value: "3",
      icon: Clock,
      trend: "+2 this week"
    },
    {
      label: "Active Mentors",
      value: "5",
      icon: Users,
      trend: "+1 new"
    },
    {
      label: "Learning Hours",
      value: "24",
      icon: BookOpen,
      trend: "+8 this month"
    },
    {
      label: "Average Rating",
      value: "4.8",
      icon: Star,
      trend: "⭐️ Excellent"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-primary mt-1">{stat.trend}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}