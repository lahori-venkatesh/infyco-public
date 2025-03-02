"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Mentor } from "@/lib/types";

interface TechnicalSkillsProps {
  mentor: Mentor;
}

export function TechnicalSkills({ mentor }: TechnicalSkillsProps) {
  // Group skills by category
  const skillCategories = {
    languages: mentor.skills.filter(skill => 
      ["JavaScript", "Python", "Java", "TypeScript"].includes(skill)
    ),
    frameworks: mentor.skills.filter(skill =>
      ["React", "Next.js", "Node.js", "Express"].includes(skill)
    ),
    tools: mentor.skills.filter(skill =>
      ["Git", "Docker", "AWS", "Kubernetes"].includes(skill)
    ),
    other: mentor.skills.filter(skill =>
      !["JavaScript", "Python", "Java", "TypeScript", "React", "Next.js", "Node.js", "Express", "Git", "Docker", "AWS", "Kubernetes"].includes(skill)
    )
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Technical Skills</h2>
      
      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          skills.length > 0 && (
            <div key={category}>
              <h3 className="text-sm font-medium capitalize mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </Card>
  );
}