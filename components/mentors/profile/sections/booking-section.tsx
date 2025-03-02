"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/lib/types";

interface Session {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
}

const sessions: Session[] = [
  {
    id: "oneOnOne",
    name: "1:1 Mentorship Session",
    duration: "45 mins",
    price: 1999,
    description: "Personal guidance and career advice"
  },
  {
    id: "resumeReview",
    name: "Resume Review",
    duration: "30 mins",
    price: 1499,
    description: "Detailed feedback on your resume"
  },
  {
    id: "projectAssistance",
    name: "Project Assistance",
    duration: "60 mins",
    price: 2499,
    description: "Technical guidance for your projects"
  },
  {
    id: "interviewPrep",
    name: "Interview Preparation",
    duration: "45 mins",
    price: 1999,
    description: "Mock interviews and feedback"
  }
];

interface BookingSectionProps {
  mentor: Mentor;
  onProceed: (sessions: string[], total: number) => void;
}

export function BookingSection({ mentor, onProceed }: BookingSectionProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const total = selectedSessions.reduce((sum, sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    return sum + (session?.price || 0);
  }, 0);

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const allSelected = selectedSessions.length === sessions.length;

  return (
    <Card className="p-6 sticky top-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Book a Session</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your preferred mentoring session
          </p>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "p-4 rounded-lg border transition-colors cursor-pointer",
                selectedSessions.includes(session.id)
                  ? "border-primary bg-primary/5"
                  : "hover:bg-accent/50"
              )}
              onClick={() => handleSessionToggle(session.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={session.id}
                  checked={selectedSessions.includes(session.id)}
                  onCheckedChange={() => handleSessionToggle(session.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor={session.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {session.name}
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {session.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {session.duration}
                    </Badge>
                    <span className="text-sm font-medium">₹{session.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allSelected && (
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Unlock Job Referrals</p>
                <p className="text-sm text-muted-foreground">
                  Get direct job referrals from {mentor.name}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">₹{total}</p>
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            disabled={selectedSessions.length === 0}
            onClick={() => onProceed(selectedSessions, total)}
          >
            <span className="text-white">Proceed to Book</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}