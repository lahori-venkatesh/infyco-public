"use client";

import { Card } from "@/components/ui/card";
import { Star, Users, Clock } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface StatsSectionProps {
  mentor: Mentor;
}

export function StatsSection({ mentor }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <div>
            <h3 className="text-2xl font-bold">{mentor.rating}</h3>
            <p className="text-sm text-muted-foreground">Mentor Rating</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">{mentor.minutesMentored}</h3>
            <p className="text-sm text-muted-foreground">Minutes Mentored</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <h3 className="text-2xl font-bold">{mentor.totalMentees}</h3>
            <p className="text-sm text-muted-foreground">Total Mentees</p>
          </div>
        </div>
      </Card>
    </div>
  );
}