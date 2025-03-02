"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SessionType {
  id: string;
  name: string;
  price: number;
  duration: string;
}

const sessionTypes: SessionType[] = [
  { id: "oneOnOne", name: "1:1 Mentorship Session", price: 1999, duration: "45 mins" },
  { id: "resumeReview", name: "Resume Review", price: 1499, duration: "30 mins" },
  { id: "projectAssistance", name: "Project Assistance", price: 2499, duration: "60 mins" },
  { id: "interviewPrep", name: "Interview Preparation", price: 1999, duration: "45 mins" },
  { id: "mockInterview", name: "Mock Interview", price: 2999, duration: "60 mins" },
];

interface SessionTypesProps {
  onTotalChange: (total: number) => void;
}

export function SessionTypes({ onTotalChange }: SessionTypesProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  useEffect(() => {
    const total = selectedSessions.reduce((sum, sessionId) => {
      const session = sessionTypes.find(s => s.id === sessionId);
      return sum + (session?.price || 0);
    }, 0);
    onTotalChange(total);
  }, [selectedSessions, onTotalChange]);

  const handleSessionToggle = (sessionId: string) => {
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium mb-4">Select Session Types</h3>
      <div className="space-y-3">
        {sessionTypes.map((session) => (
          <div key={session.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={session.id}
                checked={selectedSessions.includes(session.id)}
                onCheckedChange={() => handleSessionToggle(session.id)}
              />
              <Label htmlFor={session.id} className="text-sm cursor-pointer">
                {session.name} ({session.duration})
              </Label>
            </div>
            <span className="text-sm font-medium">₹{session.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}