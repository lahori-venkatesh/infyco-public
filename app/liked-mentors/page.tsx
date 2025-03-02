"use client";

import { useState } from "react";
import { MentorCard } from "@/components/mentors/mentor-card";
import { EmptyState } from "@/components/liked-mentors/empty-state";
import { mentorsData } from "@/lib/mentors-data";
import type { Mentor } from "@/lib/types";

export default function LikedMentorsPage() {
  // In a real app, this would come from an API/database
  const [likedMentors] = useState<Mentor[]>(mentorsData.slice(0, 3));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Liked Mentors</h1>
          <p className="text-muted-foreground mt-1">
            Mentors you&apos;ve shown interest in
          </p>
        </div>

        {likedMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}