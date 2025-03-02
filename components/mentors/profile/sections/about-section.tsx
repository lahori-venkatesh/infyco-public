"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Mail, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mentor } from "@/lib/types";

interface AboutSectionProps {
  mentor: Mentor;
}

export function AboutSection({ mentor }: AboutSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <div className="space-y-6">
        <p className="text-muted-foreground">{mentor.description}</p>
        
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

        <div className="space-y-2">
          <h3 className="font-medium">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {mentor.languages.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

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
    </Card>
  );
}