"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface CareerJourneyProps {
  mentor: Mentor;
}

export function CareerJourney({ mentor }: CareerJourneyProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Career Journey</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {mentor.careerHistory?.map((position, index) => (
            <div key={index} className="relative pl-12">
              {/* Timeline dot */}
              <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>

              <div>
                <h3 className="font-medium">{position.role}</h3>
                <p className="text-sm text-muted-foreground">{position.company}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{position.duration}</Badge>
                  {position.current && (
                    <Badge variant="default">Current</Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {position.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}