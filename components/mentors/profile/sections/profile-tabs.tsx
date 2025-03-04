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
      <div className="overflow-x-auto pb-2">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="about" className="py-2 text-xs sm:text-sm">About</TabsTrigger>
          <TabsTrigger value="skills" className="py-2 text-xs sm:text-sm">Skills</TabsTrigger>
          <TabsTrigger value="journey" className="py-2 text-xs sm:text-sm">Journey</TabsTrigger>
          <TabsTrigger value="reviews" className="py-2 text-xs sm:text-sm">Reviews</TabsTrigger>
        </TabsList>
      </div>

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