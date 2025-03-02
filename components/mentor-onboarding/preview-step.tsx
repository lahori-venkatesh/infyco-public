"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  MapPin,
  Building2,
  Mail,
  Phone,
  Calendar,
  IndianRupee,
  Check,
} from "lucide-react";

interface PreviewStepProps {
  data: any;
}

export function PreviewStep({ data }: PreviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Preview Your Profile</h2>
        <p className="text-muted-foreground">
          Review your mentor profile before completing the setup
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.profileImage} alt={data.fullName} />
            <AvatarFallback>
              {data.fullName.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{data.fullName}</h3>
                <p className="text-lg text-muted-foreground">{data.currentRole}</p>
                
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    {data.company}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {data.location}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {data.experience}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Mail className="w-3 h-3 mr-1" />
                    Email Verified
                  </Badge>
                  <Badge variant="secondary">
                    <Phone className="w-3 h-3 mr-1" />
                    Phone Verified
                  </Badge>
                </div>
                {data.isWorkEmailVerified && (
                  <Badge variant="default">
                    <Check className="w-3 h-3 mr-1" />
                    Work Email Verified
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">About</h4>
              <p className="text-muted-foreground">{data.bio}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6">
          <div>
            <h4 className="font-medium mb-2">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Services Offered</h4>
            <div className="grid gap-4">
              {Object.entries(data.services)
                .filter(([_, service]: [string, any]) => service.enabled)
                .map(([key, service]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">
                        {key === "oneOnOne" ? "1:1 Mentorship Session" :
                         key === "resumeReview" ? "Resume Review" :
                         key === "projectAssistance" ? "Project Assistance" :
                         key === "interviewPrep" ? "Interview Preparation" :
                         "Referral Assistance"}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Availability</h4>
            <div className="space-y-2">
              {data.availability.timeSlots.map((slot: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    {slot.day}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-2">
                Timezone: {data.availability.timezone}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}