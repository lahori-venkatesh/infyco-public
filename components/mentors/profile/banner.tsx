"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import type { Mentor } from "@/lib/types";

interface ProfileBannerProps {
  mentor: Mentor;
  onMessageClick: () => void;
}

export function ProfileBanner({ mentor, onMessageClick }: ProfileBannerProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="relative overflow-hidden">
      {/* Banner Background */}
      <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/30" />
      
      {/* Profile Content */}
      <div className="p-6 -mt-12">
        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-24 h-24">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="rounded-full border-4 border-background object-cover"
              />
            </div>
            <Badge className="absolute -bottom-2 right-0">
              {mentor.experience}
            </Badge>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{mentor.name}</h1>
                <p className="text-muted-foreground">{mentor.profession}</p>
                <p className="text-sm text-muted-foreground">{mentor.company}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 mr-1" />
                    {mentor.languages.join(", ")}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={onMessageClick}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div>
                <div className="text-2xl font-bold">⭐ {mentor.rating}</div>
                <div className="text-sm text-muted-foreground">Mentor Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-muted-foreground">Minutes Mentored</div>
              </div>
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Mentees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}