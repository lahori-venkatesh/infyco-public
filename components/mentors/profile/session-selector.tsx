"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Gift } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface Session {
  id: string;
  name: string;
  duration: string;
  price: number;
}

const sessions: Session[] = [
  { id: "oneOnOne", name: "1:1 Mentorship Session", duration: "45 mins", price: 1999 },
  { id: "resumeReview", name: "Resume Review", duration: "30 mins", price: 1499 },
  { id: "projectAssistance", name: "Project Assistance", duration: "60 mins", price: 2499 },
  { id: "interviewPrep", name: "Interview Preparation", duration: "45 mins", price: 1999 },
  { id: "mockInterview", name: "Mock Interview", duration: "60 mins", price: 2999 }
];

interface SessionSelectorProps {
  mentor: Mentor;
  onProceed: (sessions: string[], total: number) => void;
}

export function SessionSelector({ mentor, onProceed }: SessionSelectorProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = selectedSessions.reduce((sum, sessionId) => {
      const session = sessions.find(s => s.id === sessionId);
      return sum + (session?.price || 0);
    }, 0);
    setTotal(newTotal);
  }, [selectedSessions]);

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const allSelected = selectedSessions.length === sessions.length;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select Sessions</h2>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <Checkbox
                id={session.id}
                checked={selectedSessions.includes(session.id)}
                onCheckedChange={() => handleSessionToggle(session.id)}
              />
              <div>
                <label
                  htmlFor={session.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {session.name}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {session.duration}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ₹{session.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {allSelected && (
          <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
            <Gift className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Bonus: Job Referrals Access</p>
              <p className="text-sm text-muted-foreground">
                Unlock direct job referrals from {mentor.name}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">₹{total}</p>
            </div>
            <Button
              size="lg"
              disabled={selectedSessions.length === 0}
              onClick={() => onProceed(selectedSessions, total)}
            >
              <span className="text-white">Proceed to Book</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}