"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface PeerFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

export function PeerFilters({
  selectedSkills,
  onSkillsChange,
  selectedLevel,
  onLevelChange,
}: PeerFiltersProps) {
  const availableSkills = [
    "React", "Node.js", "Python", "Java", "TypeScript",
    "AWS", "Docker", "Kubernetes", "Machine Learning"
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          value={selectedLevel}
          onValueChange={onLevelChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSkills[selectedSkills.length - 1] || ""}
          onValueChange={(skill) => {
            if (!selectedSkills.includes(skill)) {
              onSkillsChange([...selectedSkills, skill]);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Add Skill" />
          </SelectTrigger>
          <SelectContent>
            {availableSkills
              .filter(skill => !selectedSkills.includes(skill))
              .map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => onSkillsChange(selectedSkills.filter(s => s !== skill))}
            >
              {skill}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}