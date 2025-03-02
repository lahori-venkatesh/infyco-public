"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parse, addMinutes } from "date-fns";
import type { Mentor } from "@/lib/types";

interface BookingCalendarProps {
  mentor: Mentor;
  selectedDate?: Date;
  selectedTime?: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onProceed: () => void;
}

export function BookingCalendar({
  mentor,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onProceed,
}: BookingCalendarProps) {
  // Generate available time slots based on mentor's availability
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    const [startTime, endTime] = mentor.availability[1].split(" - ");
    const times = [];
    let current = parse(startTime, "h:mm a", new Date());
    const end = parse(endTime, "h:mm a", new Date());

    while (current <= end) {
      times.push(format(current, "h:mm a"));
      current = addMinutes(current, 30);
    }

    return times;
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Book a Session</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Select Date</h4>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rounded-md border"
            disabled={(date) => {
              const day = format(date, "E").toLowerCase();
              const availableDays = mentor.availability[0].toLowerCase();
              return !availableDays.includes(day);
            }}
          />
        </div>

        {selectedDate && (
          <div>
            <h4 className="text-sm font-medium mb-2">Select Time</h4>
            <Select value={selectedTime} onValueChange={onTimeSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
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
        )}

        <Button
          className="w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={onProceed}
        >
          Proceed to Payment
        </Button>
      </div>
    </Card>
  );
}