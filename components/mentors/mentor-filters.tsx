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
import { categories } from "@/lib/categories-data";
import { mentorsData } from "@/lib/mentors-data";

interface MentorFiltersProps {
  selectedDomain: string;
  onDomainChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  selectedExperience: string;
  onExperienceChange: (value: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export function MentorFilters({
  selectedDomain,
  onDomainChange,
  selectedRole,
  onRoleChange,
  selectedCompany,
  onCompanyChange,
  selectedExperience,
  onExperienceChange,
  selectedSkills,
  onSkillToggle,
}: MentorFiltersProps) {
  // Get unique companies
  const companies = Array.from(new Set(mentorsData.map(mentor => mentor.company))).sort();

  // Get unique skills
  const availableSkills = Array.from(
    new Set(mentorsData.flatMap(mentor => mentor.skills))
  ).sort();

  // Get roles based on selected domain
  const getRoles = () => {
    if (selectedDomain === "all") return [];
    const category = categories.find(cat => cat.id === selectedDomain);
    return category ? category.subcategories : [];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
      <Select value={selectedDomain} onValueChange={onDomainChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Domain" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Domains</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRole} onValueChange={onRoleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          {getRoles().map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCompany} onValueChange={onCompanyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Company" />
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

      <Select value={selectedExperience} onValueChange={onExperienceChange}>
        <SelectTrigger>
          <SelectValue placeholder="Experience Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Experience Levels</SelectItem>
          <SelectItem value="0-2 years">0-2 years</SelectItem>
          <SelectItem value="3-5 years">3-5 years</SelectItem>
          <SelectItem value="5-8 years">5-8 years</SelectItem>
          <SelectItem value="8+ years">8+ years</SelectItem>
        </SelectContent>
      </Select>

      {selectedSkills.length > 0 && (
        <div className="col-span-full flex flex-wrap gap-2 mt-2">
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