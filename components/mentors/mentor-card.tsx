"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Building2, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { MentorProfile } from "./profile/mentor-profile";
import { MentorChat } from "./mentor-chat";
import Image from "next/image";
import type { Mentor } from "@/lib/types";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex items-start space-x-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg truncate">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{mentor.profession}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <Building2 className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{mentor.company}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{mentor.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({mentor.totalMentees} mentees)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full",
                      isLiked && "text-red-500 hover:text-red-600"
                    )}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setShowChat(true)}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {mentor.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {mentor.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {mentor.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{mentor.skills.length - 2} more
              </Badge>
            )}
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => setShowProfile(true)}
          >
            <span className="text-white">View Details & Connect</span>
          </Button>
        </div>
      </Card>

      <MentorProfile
        mentor={mentor}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />

      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-md p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Chat with {mentor.name}</DialogTitle>
          </DialogHeader>
          <MentorChat mentor={mentor} />
        </DialogContent>
      </Dialog>
    </>
  );
}