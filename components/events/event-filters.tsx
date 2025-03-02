"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventType } from "@/lib/types";

interface EventFiltersProps {
  selectedType: EventType;
  onTypeChange: (type: EventType) => void;
}

export function EventFilters({ selectedType, onTypeChange }: EventFiltersProps) {
  const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "internship", label: "Internships" },
    { value: "course", label: "Courses" },
    { value: "guest-lecture", label: "Guest Lectures" },
    { value: "hackathon", label: "Hackathons" }
  ] as const;

  return (
    <div className="w-full md:w-[300px]">
      <Select
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as EventType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select event type" />
        </SelectTrigger>
        <SelectContent>
          {eventTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}