"use client";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { UpcomingSessions } from "@/components/dashboard/upcoming-sessions";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LearningProgress } from "@/components/dashboard/learning-progress";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <DashboardStats />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingSessions />
        <RecentActivity />
      </div>
      <div className="mt-8">
        <LearningProgress />
      </div>
    </div>
  );
}