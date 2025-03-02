"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MentorSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function MentorSort({ sortBy, onSortChange }: MentorSortProps) {
  return (
    <div className="w-[200px]">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
          <SelectItem value="rating-asc">Lowest Rated</SelectItem>
          <SelectItem value="experience-desc">Most Experienced</SelectItem>
          <SelectItem value="experience-asc">Least Experienced</SelectItem>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="domain">Domain</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}