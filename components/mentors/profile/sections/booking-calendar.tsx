"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, parse, addMinutes, isSameDay, startOfDay, setHours, setMinutes } from "date-fns";
import { ArrowLeft } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface BookingCalendarProps {
  mentor: Mentor;
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
}

export function BookingCalendar({ mentor, onSelect, onBack }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const slots: string[] = [];
    const [startTimeStr, endTimeStr] = mentor.availability[1].split(" - ");

    try {
      // Convert start time string to Date object
      const startTimeParts = startTimeStr.match(/(\d+):(\d+) ([AP]M)/i);
      if (!startTimeParts) return slots;

      let startHour = parseInt(startTimeParts[1]);
      const startMinute = parseInt(startTimeParts[2]);
      const startPeriod = startTimeParts[3].toUpperCase();

      if (startPeriod === "PM" && startHour !== 12) {
        startHour += 12;
      } else if (startPeriod === "AM" && startHour === 12) {
        startHour = 0;
      }

      // Convert end time string to Date object
      const endTimeParts = endTimeStr.match(/(\d+):(\d+) ([AP]M)/i);
      if (!endTimeParts) return slots;

      let endHour = parseInt(endTimeParts[1]);
      const endMinute = parseInt(endTimeParts[2]);
      const endPeriod = endTimeParts[3].toUpperCase();

      if (endPeriod === "PM" && endHour !== 12) {
        endHour += 12;
      } else if (endPeriod === "AM" && endHour === 12) {
        endHour = 0;
      }

      // Create time slots
      let currentDate = new Date(selectedDate);
      let currentSlot = setMinutes(setHours(currentDate, startHour), startMinute);
      const endTime = setMinutes(setHours(new Date(selectedDate), endHour), endMinute);

      while (currentSlot <= endTime) {
        slots.push(format(currentSlot, "h:mm a"));
        currentSlot = addMinutes(currentSlot, 30);
      }
    } catch (error) {
      console.error("Error generating time slots:", error);
    }

    return slots;
  }, [selectedDate, mentor.availability]);

  const isDateDisabled = (date: Date) => {
    const day = format(date, "EEEE").toLowerCase();
    const availableDays = mentor.availability[0].toLowerCase();
    const isPastDate = date < startOfDay(new Date());
    return !availableDays.includes(day) || isPastDate;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Schedule Your Session</h2>
          <p className="text-sm text-muted-foreground">
            Choose your preferred date and time
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={isDateDisabled}
            fromDate={new Date()}
          />
        </div>

        {selectedDate && (
          <div>
            <h3 className="text-sm font-medium mb-2">Select Time</h3>
            <Select value={selectedTime} onValueChange={handleTimeSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {timeSlots.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No available time slots for the selected date
              </p>
            )}
          </div>
        )}

        <Button
          className="w-full"
          size="lg"
          disabled={!selectedDate || !selectedTime}
          onClick={() => selectedDate && selectedTime && onSelect(selectedDate, selectedTime)}
        >
          <span className="text-white">Continue to Payment</span>
        </Button>
      </div>
    </Card>
  );
}