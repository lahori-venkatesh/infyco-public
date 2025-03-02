"use client";

import { MentorCard } from "@/components/mentors/mentor-card";
import { mentorsData } from "@/lib/mentors-data";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function TopMentors() {
  const router = useRouter();
  const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);

  // Get top 3 mentors by rating
  const topMentors = mentorsData
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleConnect = (mentorId: number) => {
    setSelectedMentorId(mentorId);
    router.push(`/mentors/${mentorId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topMentors.map((mentor) => (
        <MentorCard
          key={mentor.id}
          mentor={mentor}
          onConnect={() => handleConnect(mentor.id)}
        />
      ))}
    </div>
  );
}