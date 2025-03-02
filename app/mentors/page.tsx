"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MentorCard } from "@/components/mentors/mentor-card";
import { MentorFilters } from "@/components/mentors/mentor-filters";
import { MentorSort } from "@/components/mentors/mentor-sort";
import { mentorsData } from "@/lib/mentors-data";
import { categories } from "@/lib/categories-data";
import { Search } from "lucide-react";

export default function MentorsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating-desc");

  // Get the selected category and its subcategories
  const selectedCategory = categories.find(cat => cat.id === categoryParam);
  const subcategoryIds = selectedCategory?.subcategories.map(sub => sub.id) || [];

  // Filter mentors based on all criteria
  const filteredMentors = mentorsData.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.profession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === "all" || mentor.company === selectedCompany;
    const matchesExperience = selectedExperience === "all" || mentor.experience === selectedExperience;
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.every(skill => mentor.skills.includes(skill));
    const matchesCategory = !categoryParam || 
      (mentor.category === categoryParam && subcategoryIds.includes(mentor.subcategory));
    const matchesDomain = selectedDomain === "all" || mentor.category === selectedDomain;
    const matchesRole = selectedRole === "all" || mentor.subcategory === selectedRole;

    return matchesSearch && matchesCompany && matchesExperience && 
           matchesSkills && matchesCategory && matchesDomain && matchesRole;
  });

  // Sort mentors
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      case "experience-desc":
        return b.experience.localeCompare(a.experience);
      case "experience-asc":
        return a.experience.localeCompare(b.experience);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "domain":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {selectedCategory ? selectedCategory.title : "All Mentors"}
        </h1>
        <p className="text-muted-foreground">
          {selectedCategory ? selectedCategory.description : "Connect with experienced professionals"}
        </p>
      </div>

      {selectedCategory && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {selectedCategory.subcategories.map((sub) => (
            <Badge key={sub.id} variant="secondary">
              {sub.title}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentors by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <MentorFilters
            selectedDomain={selectedDomain}
            onDomainChange={setSelectedDomain}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            selectedCompany={selectedCompany}
            onCompanyChange={setSelectedCompany}
            selectedExperience={selectedExperience}
            onExperienceChange={setSelectedExperience}
            selectedSkills={selectedSkills}
            onSkillToggle={(skill) => {
              setSelectedSkills(prev =>
                prev.includes(skill)
                  ? prev.filter(s => s !== skill)
                  : [...prev, skill]
              );
            }}
          />
          <MentorSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              onConnect={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}