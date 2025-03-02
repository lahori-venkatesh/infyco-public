"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BasicInfoStep } from "@/components/mentor-onboarding/basic-info-step";
import { ProfessionalDetailsStep } from "@/components/mentor-onboarding/professional-details-step";
import { ServicesStep } from "@/components/mentor-onboarding/services-step";
import { AvailabilityStep } from "@/components/mentor-onboarding/availability-step";
import { VerificationStep } from "@/components/mentor-onboarding/verification-step";
import { PreviewStep } from "@/components/mentor-onboarding/preview-step";
import { useToast } from "@/components/ui/use-toast";

export default function MentorOnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    email: "",
    phone: "",
    profileImage: "",
    company: "",
    location: "",
    isEmailVerified: false,
    isPhoneVerified: false,

    // Professional Details
    experience: "",
    currentRole: "",
    previousRoles: [] as { company: string; role: string; duration: string }[],
    skills: [] as string[],
    bio: "",
    linkedinUrl: "",
    isLinkedinVerified: false,

    // Services & Pricing
    services: {
      oneOnOne: { enabled: false, duration: "30", price: "500" },
      resumeReview: { enabled: false, duration: "45", price: "700" },
      projectAssistance: { enabled: false, duration: "60", price: "1000" },
      interviewPrep: { enabled: false, duration: "60", price: "1000" },
      referralAssistance: { enabled: false, duration: "30", price: "500" },
    },
    paymentDetails: {
      upi: "",
      bankAccount: "",
      ifsc: "",
    },

    // Availability
    availability: {
      timeSlots: [] as { day: string; startTime: string; endTime: string }[],
      timezone: "",
      autoAccept: true,
    },
    calendarConnected: false,

    // Verification
    resume: "",
    govtId: "",
    workEmail: "",
    isWorkEmailVerified: false,
    isIdVerified: false,
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const validateStep = () => {
    switch (step) {
      case 1: // Basic Info
        if (!formData.fullName || !formData.email || !formData.phone || !formData.company || !formData.location) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields before proceeding.",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.isEmailVerified) {
          toast({
            title: "Email Not Verified",
            description: "Please verify your email address before proceeding.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 2: // Professional Details
        if (!formData.experience || !formData.currentRole || formData.skills.length === 0 || !formData.bio) {
          toast({
            title: "Missing Information",
            description: "Please provide your professional details and skills.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 3: // Services
        const hasEnabledService = Object.values(formData.services).some(service => service.enabled);
        if (!hasEnabledService) {
          toast({
            title: "No Services Selected",
            description: "Please select at least one service to offer.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 4: // Availability
        if (formData.availability.timeSlots.length === 0 || !formData.availability.timezone) {
          toast({
            title: "Missing Availability",
            description: "Please set your availability and timezone.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 5: // Verification
        if (!formData.isWorkEmailVerified && !formData.isIdVerified) {
          toast({
            title: "Verification Required",
            description: "Please complete at least one form of verification.",
            variant: "destructive",
          });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <ProfessionalDetailsStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 3:
        return (
          <ServicesStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 4:
        return (
          <AvailabilityStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 5:
        return (
          <VerificationStep
            data={formData}
            onUpdate={updateFormData}
          />
        );
      case 6:
        return (
          <PreviewStep
            data={formData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Complete Your Mentor Profile
          </h1>
          <p className="text-muted-foreground text-center">
            Step {step} of {totalSteps}: {
              step === 1 ? "Basic Information" :
              step === 2 ? "Professional Details" :
              step === 3 ? "Services & Pricing" :
              step === 4 ? "Availability" :
              step === 5 ? "Verification" :
              "Preview"
            }
          </p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card className="p-6">
          {renderStep()}

          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === totalSteps ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}