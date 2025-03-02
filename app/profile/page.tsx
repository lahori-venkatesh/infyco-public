"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { SessionHistory } from "@/components/profile/session-history";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <ProfileHeader />
        <ProfileStats />
        <SessionHistory />
      </div>
    </div>
  );
}