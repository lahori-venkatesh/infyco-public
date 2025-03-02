"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Mail, Linkedin, Link as LinkIcon } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface AboutTabProps {
  mentor: Mentor;
}

export function AboutTab({ mentor }: AboutTabProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">About</h3>
          <p className="text-muted-foreground">{mentor.description}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {mentor.location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Globe className="w-4 h-4 mr-2" />
            {mentor.languages.join(", ")}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.specializations.map((spec) => (
              <Badge key={spec} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Achievements</h3>
          <ul className="space-y-2 text-muted-foreground">
            {mentor.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-3">Connect</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={mentor.website} target="_blank" rel="noopener noreferrer">
                <LinkIcon className="w-4 h-4 mr-2" />
                Website
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${mentor.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}