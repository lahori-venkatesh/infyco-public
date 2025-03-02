"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  selectedExperience: string;
  onExperienceChange: (value: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  availableSkills: string[];
  companies: string[];
}

export function Filters({
  searchTerm,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  selectedExperience,
  onExperienceChange,
  selectedSkills,
  onSkillToggle,
  availableSkills,
  companies,
}: FiltersProps) {
  const experienceLevels = [
    { label: "0-2 years", value: "0-2 years" },
    { label: "3-5 years", value: "3-5 years" },
    { label: "5-8 years", value: "5-8 years" },
    { label: "8+ years", value: "8+ years" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select 
            value={selectedCompany} 
            onValueChange={onCompanyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select 
            value={selectedExperience} 
            onValueChange={onExperienceChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experience Levels</SelectItem>
              {experienceLevels.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            value={selectedSkills[selectedSkills.length - 1] || "select-skill"}
            onValueChange={(skill) => {
              if (skill !== "select-skill") {
                onSkillToggle(skill);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Add skill filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select-skill">Select a skill</SelectItem>
              {availableSkills
                .filter((skill) => !selectedSkills.includes(skill))
                .map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => onSkillToggle(skill)}
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