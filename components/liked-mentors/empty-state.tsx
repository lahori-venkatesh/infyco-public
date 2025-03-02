"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Heart className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No liked mentors yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        When you find mentors you&apos;re interested in, click the heart icon to save them here for quick access.
      </p>
      <Button asChild>
        <Link href="/mentors">
          <span className="text-white">Browse Mentors</span>
        </Link>
      </Button>
    </div>
  );
}