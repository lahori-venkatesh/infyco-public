"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface ReviewsTabProps {
  mentor: Mentor;
}

export function ReviewsTab({ mentor }: ReviewsTabProps) {
  return (
    <Card className="p-6">
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          {mentor.reviews?.map((review) => (
            <div key={review.id} className="p-4 rounded-lg border">
              <div className="flex items-start gap-4">
                <img
                  src={review.authorImage}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{review.author}</h3>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}