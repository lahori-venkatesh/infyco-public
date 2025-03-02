"use client";

import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfileEditPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
}