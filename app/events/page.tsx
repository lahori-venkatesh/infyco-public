"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventHero } from "@/components/events/event-hero";
import { UpcomingEvents } from "@/components/events/upcoming-events";
import { TrendingHackathons } from "@/components/events/trending-hackathons";
import { JobBoard } from "@/components/events/job-board";
import { MyBookings } from "@/components/events/my-bookings";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-background">
      <EventHero />
      
      <div className="container mx-auto py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="border-b">
            <ScrollArea className="w-full whitespace-nowrap pb-3">
              <TabsList className="inline-flex w-full sm:w-auto h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="upcoming"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  📅 Upcoming Events
                </TabsTrigger>
                <TabsTrigger 
                  value="hackathons"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  🔥 Trending Hackathons
                </TabsTrigger>
                <TabsTrigger 
                  value="jobs"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  💼 Job & Internship Board
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  🎯 My Bookings
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          <TabsContent value="upcoming">
            <UpcomingEvents />
          </TabsContent>

          <TabsContent value="hackathons">
            <TrendingHackathons />
          </TabsContent>

          <TabsContent value="jobs">
            <JobBoard />
          </TabsContent>

          <TabsContent value="bookings">
            <MyBookings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}