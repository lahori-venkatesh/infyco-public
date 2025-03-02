"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AvailabilityStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function AvailabilityStep({ data, onUpdate }: AvailabilityStepProps) {
  const { toast } = useToast();
  const [newTimeSlot, setNewTimeSlot] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${period}`;
  });

  const timezones = [
    "Asia/Kolkata (IST)",
    "America/New_York (EST)",
    "Europe/London (GMT)",
    "Asia/Singapore (SGT)",
    "Australia/Sydney (AEST)",
  ];

  const handleAddTimeSlot = () => {
    if (newTimeSlot.day && newTimeSlot.startTime && newTimeSlot.endTime) {
      onUpdate({
        availability: {
          ...data.availability,
          timeSlots: [...data.availability.timeSlots, newTimeSlot],
        },
      });
      setNewTimeSlot({ day: "", startTime: "", endTime: "" });
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    onUpdate({
      availability: {
        ...data.availability,
        timeSlots: data.availability.timeSlots.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const handleConnectCalendar = async () => {
    // Simulate Google Calendar connection
    toast({
      title: "Calendar Connected",
      description: "Your Google Calendar has been successfully connected.",
    });
    onUpdate({ calendarConnected: true });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Available Time Slots</h3>
          <Button
            variant="outline"
            onClick={handleConnectCalendar}
            disabled={data.calendarConnected}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {data.calendarConnected ? "Calendar Connected" : "Connect Calendar"}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Day</Label>
            <Select
              value={newTimeSlot.day}
              onValueChange={(value) =>
                setNewTimeSlot({ ...newTimeSlot, day: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Start Time</Label>
            <Select
              value={newTimeSlot.startTime}
              onValueChange={(value) =>
                setNewTimeSlot({ ...newTimeSlot, startTime: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Start time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>End Time</Label>
            <Select
              value={newTimeSlot.endTime}
              onValueChange={(value) =>
                setNewTimeSlot({ ...newTimeSlot, endTime: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="End time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleAddTimeSlot}
          disabled={!newTimeSlot.day || !newTimeSlot.startTime || !newTimeSlot.endTime}
        >
          <Clock className="w-4 h-4 mr-2" />
          Add Time Slot
        </Button>

        <div className="space-y-2">
          {data.availability.timeSlots.map((slot: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{slot.day}</Badge>
                <span className="text-sm">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveTimeSlot(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Timezone</h3>
        <Select
          value={data.availability.timezone}
          onValueChange={(value) =>
            onUpdate({
              availability: {
                ...data.availability,
                timezone: value,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((timezone) => (
              <SelectItem key={timezone} value={timezone}>
                {timezone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Booking Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Automatically accept booking requests
            </p>
          </div>
          <Switch
            checked={data.availability.autoAccept}
            onCheckedChange={(checked) =>
              onUpdate({
                availability: {
                  ...data.availability,
                  autoAccept: checked,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}