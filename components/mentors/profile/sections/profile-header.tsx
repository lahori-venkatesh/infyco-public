"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Heart, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import type { Mentor } from "@/lib/types";

interface ProfileHeaderProps {
  mentor: Mentor;
}

export function ProfileHeader({ mentor }: ProfileHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="relative overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/30" />
      <div className="p-6 -mt-12">
        <div className="flex items-start gap-6">
          <div className="relative">
            <Image
              src={mentor.image}
              alt={mentor.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full border-4 border-background object-cover"
            />
            <Badge className="absolute -bottom-2 right-0">
              {mentor.experience}
            </Badge>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{mentor.name}</h1>
                <p className="text-muted-foreground">{mentor.profession}</p>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{mentor.company}</span>
                  <MapPin className="w-4 h-4 ml-2" />
                  <span>{mentor.location}</span>
                </div>
              </div>

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
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-lg font-bold">{mentor.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div>
                <div className="text-lg font-bold">{mentor.minutesMentored}</div>
                <div className="text-sm text-muted-foreground">Minutes Mentored</div>
              </div>
              <div>
                <div className="text-lg font-bold">{mentor.totalMentees}</div>
                <div className="text-sm text-muted-foreground">Mentees</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}