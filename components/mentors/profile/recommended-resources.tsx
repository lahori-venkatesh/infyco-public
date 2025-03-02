"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink, Youtube } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface Resource {
  id: string;
  title: string;
  type: "video" | "article" | "course";
  url: string;
  description: string;
}

interface RecommendedResourcesProps {
  mentor: Mentor;
}

export function RecommendedResources({ mentor }: RecommendedResourcesProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Recommended Resources</h2>
      
      <div className="space-y-4">
        {mentor.resources?.map((resource: Resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                {resource.type === "video" ? (
                  <Youtube className="w-5 h-5 text-primary" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {resource.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}