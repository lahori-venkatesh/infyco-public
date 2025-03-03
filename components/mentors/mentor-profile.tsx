"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookingCalendar } from "@/components/mentors/booking-calendar";
import { PaymentForm } from "@/components/mentors/payment-form";
import Image from "next/image";
import { Globe, Linkedin, Mail, Star } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface MentorProfileProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
}

export function MentorProfile({ mentor, isOpen, onClose }: MentorProfileProps) {
  const [bookingStep, setBookingStep] = useState<"calendar" | "payment">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const handleBookingComplete = () => {
    if (bookingStep === "calendar" && selectedDate && selectedTime) {
      setBookingStep("payment");
    } else {
      // Handle payment completion
      onClose();
      setBookingStep("calendar");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mentor Profile</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{mentor.name}</h2>
                    <p className="text-muted-foreground">{mentor.profession}</p>
                    <p className="text-muted-foreground">{mentor.company}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1">{mentor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">About</h3>
                  <p className="text-muted-foreground">{mentor.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Experience</h3>
                  <p className="text-muted-foreground">{mentor.experience}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Connect</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={mentor.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${mentor.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specializations.map((spec) => (
                        <Badge key={spec} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Achievements</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {mentor.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-medium mb-4">Session Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Rate</p>
                      <p className="font-medium">{mentor.sessionRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-medium">{mentor.availability[0]}</p>
                      <p className="text-sm text-muted-foreground">{mentor.availability[1]}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking */}
          <div>
            {bookingStep === "calendar" ? (
              <BookingCalendar
                mentor={mentor}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={(timeString) => setSelectedTime(timeString)}
                onProceed={handleBookingComplete}
              />
            ) : (
              <PaymentForm
                mentor={mentor}
                selectedDate={selectedDate!}
                selectedTime={selectedTime!}
                onComplete={handleBookingComplete}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}