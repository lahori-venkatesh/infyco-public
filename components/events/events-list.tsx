"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ExternalLink, Clock, DollarSign, Trophy, Users2 } from "lucide-react";
import { eventsData } from "@/lib/events-data";
import type { EventType } from "@/lib/types";
import Image from "next/image";

interface EventsListProps {
  selectedType: EventType;
}

export function EventsList({ selectedType }: EventsListProps) {
  const filteredEvents = eventsData.filter(
    event => selectedType === "all" || event.type === selectedType
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90">
                {event.type}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <div>
              <h3 className="font-medium text-lg">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.organizer}</p>
            </div>

            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              {event.participants && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.participants} participants</span>
                </div>
              )}
              {event.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration}</span>
                </div>
              )}
              {event.price && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{event.price}</span>
                </div>
              )}
              {event.teamSize && (
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4" />
                  <span>{event.teamSize}</span>
                </div>
              )}
              {event.prizes && (
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{event.prizes[0]}</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-sm line-clamp-2">{event.description}</p>

            <Button className="w-full mt-4" asChild>
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {event.type === "internship" ? "Apply Now" : "Register"}
              </a>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}