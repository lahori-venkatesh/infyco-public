"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { eventsData } from "@/lib/events-data";
import Image from "next/image";

export function UpcomingEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {eventsData.map((event) => (
        <Card key={event.id} className="overflow-hidden group mobile-card">
          <div className="relative h-40 md:h-48">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-xs md:text-sm">
                {event.type}
              </Badge>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <h3 className="font-semibold text-base md:text-lg mb-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                {event.date}
              </div>
              <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                {event.location}
              </div>
              {event.participants && (
                <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  {event.participants} participants
                </div>
              )}
              {event.duration && (
                <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                  {event.duration}
                </div>
              )}
            </div>

            <Button className="w-full h-12 md:h-10">Register Now</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}