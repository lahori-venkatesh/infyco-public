"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutTab } from "./tabs/about-tab";
import { SkillsTab } from "./tabs/skills-tab";
import { JourneyTab } from "./tabs/journey-tab";
import { ReviewsTab } from "./tabs/reviews-tab";
import type { Mentor } from "@/lib/types";

interface ProfileTabsProps {
  mentor: Mentor;
}

export function ProfileTabs({ mentor }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="about" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="journey">Journey</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <AboutTab mentor={mentor} />
      </TabsContent>

      <TabsContent value="skills">
        <SkillsTab mentor={mentor} />
      </TabsContent>

      <TabsContent value="journey">
        <JourneyTab mentor={mentor} />
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewsTab mentor={mentor} />
      </TabsContent>
    </Tabs>
  );
}