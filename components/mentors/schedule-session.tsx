"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface ScheduleSessionProps {
  mentor: any;
  onSchedule: (date: Date, time: string) => void;
}

export function ScheduleSession({ mentor, onSchedule }: ScheduleSessionProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();

  // Generate available time slots based on mentor's availability
  const getTimeSlots = () => {
    const [startTime, endTime] = mentor.availability[1].split(" - ");
    const times = [];
    let current = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${endTime}`);

    while (current < end) {
      times.push(format(current, "h:mm a"));
      current = new Date(current.getTime() + 30 * 60000); // Add 30 minutes
    }

    return times;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <h3 className="font-medium mb-2">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => {
              // Disable dates based on mentor's availability days
              const day = format(date, "E").toLowerCase();
              const availableDays = mentor.availability[0].toLowerCase();
              return !availableDays.includes(day);
            }}
          />
        </div>
        <div>
          <h3 className="font-medium mb-2">Select Time</h3>
          <Select onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {getTimeSlots().map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="w-full"
        disabled={!date || !time}
        onClick={() => date && time && onSchedule(date, time)}
      >
        Proceed to Payment
      </Button>
    </div>
  );
}