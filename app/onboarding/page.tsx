"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Gaming",
  "AI/ML",
  "Blockchain",
  "Cybersecurity",
];

const careerGoals = [
  "Technical Leadership",
  "System Design",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "DevOps",
  "Cloud Architecture",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
];

const experienceLevels = [
  "Beginner (0-2 years)",
  "Intermediate (3-5 years)",
  "Advanced (5-8 years)",
  "Expert (8+ years)",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: "",
    goals: [] as string[],
    experience: "",
    interests: [] as string[],
    background: "",
  });

  const progress = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save preferences and redirect to personalized mentors page
      router.push("/mentors?onboarded=true");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Let&apos;s Personalize Your Experience
          </h1>
          <p className="text-muted-foreground text-center">
            Help us understand your goals to match you with the perfect mentors
          </p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Target Industry</h2>
              <div className="space-y-4">
                <Label>Which industry are you interested in?</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData({ ...formData, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Career Goals</h2>
              <div className="space-y-4">
                <Label>What are your primary career goals? (Select up to 3)</Label>
                <div className="flex flex-wrap gap-2">
                  {careerGoals.map((goal) => (
                    <Badge
                      key={goal}
                      variant={formData.goals.includes(goal) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGoal(goal)}
                    >
                      {goal}
                      {formData.goals.includes(goal) && (
                        <X className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Experience Level</h2>
              <div className="space-y-4">
                <Label>What&apos;s your current experience level?</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Background & Interests</h2>
              <div className="space-y-4">
                <Label>Tell us about your background and what you want to achieve</Label>
                <Textarea
                  value={formData.background}
                  onChange={(e) =>
                    setFormData({ ...formData, background: e.target.value })
                  }
                  placeholder="Share your background, current role, and what you hope to achieve through mentorship..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.industry) ||
                (step === 2 && formData.goals.length === 0) ||
                (step === 3 && !formData.experience) ||
                (step === 4 && !formData.background.trim())
              }
            >
              {step === 4 ? "Complete" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}