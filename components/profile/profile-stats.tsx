"use client";

import { Card } from "@/components/ui/card";
import { Clock, Users, BookOpen, Star } from "lucide-react";

export function ProfileStats() {
  const stats = [
    { label: "Sessions Completed", value: "24", icon: Clock },
    { label: "Mentors Connected", value: "8", icon: Users },
    { label: "Learning Hours", value: "56", icon: BookOpen },
    { label: "Average Rating", value: "4.8", icon: Star },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
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
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}