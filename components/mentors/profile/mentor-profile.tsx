"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProfileHeader } from "./sections/profile-header";
import { ProfileTabs } from "./sections/profile-tabs";
import { BookingSection } from "./sections/booking-section";
import { BookingCalendar } from "./sections/booking-calendar";
import { PaymentSection } from "./sections/payment-section";
import type { Mentor } from "@/lib/types";

interface MentorProfileProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
}

export function MentorProfile({ mentor, isOpen, onClose }: MentorProfileProps) {
  const [step, setStep] = useState<"profile" | "calendar" | "payment">("profile");
  const [bookingDetails, setBookingDetails] = useState({
    sessions: [] as string[],
    totalAmount: 0,
    date: undefined as Date | undefined,
    time: undefined as string | undefined,
  });

  const handleSessionSelect = (sessions: string[], total: number) => {
    setBookingDetails(prev => ({ ...prev, sessions, totalAmount: total }));
    setStep("calendar");
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setBookingDetails(prev => ({ ...prev, date, time }));
    setStep("payment");
  };

  const handleBookingComplete = () => {
    // Handle successful booking
    onClose();
    setStep("profile");
    setBookingDetails({
      sessions: [],
      totalAmount: 0,
      date: undefined,
      time: undefined,
    });
  };

  const handleClose = () => {
    onClose();
    setStep("profile");
  };

  const renderStepContent = () => {
    switch (step) {
      case "calendar":
        return (
          <BookingCalendar
            mentor={mentor}
            onSelect={handleDateTimeSelect}
            onBack={() => setStep("profile")}
          />
        );
      case "payment":
        return (
          <PaymentSection
            mentor={mentor}
            bookingDetails={bookingDetails}
            onComplete={handleBookingComplete}
            onBack={() => setStep("calendar")}
          />
        );
      default:
        return (
          <div className="space-y-8">
            <ProfileHeader mentor={mentor} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProfileTabs mentor={mentor} />
              </div>
              <div>
                <BookingSection
                  mentor={mentor}
                  onProceed={handleSessionSelect}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "calendar":
        return "Schedule Your Session";
      case "payment":
        return "Complete Booking";
      default:
        return "Mentor Profile";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>{getStepTitle()}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-4rem)]">
          <div className="p-6">{renderStepContent()}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}