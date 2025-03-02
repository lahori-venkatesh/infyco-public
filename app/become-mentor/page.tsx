"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { categories } from "@/lib/categories-data";

export default function BecomeMentorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Professional Info
    profession: "",
    company: "",
    experience: "",
    linkedin: "",
    website: "",
    
    // Expertise
    category: "",
    subcategory: "",
    skills: [] as string[],
    specializations: [] as string[],
    
    // Mentorship Details
    availability: {
      days: [] as string[],
      startTime: "",
      endTime: "",
    },
    sessionRate: "",
    languages: [] as string[],
    bio: "",
    expectations: "",
  });

  const progress = (step / 4) * 100;

  const availableDays = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${period}`;
  });

  const languageOptions = [
    "English", "Hindi", "Tamil", "Telugu", "Kannada",
    "Malayalam", "Bengali", "Marathi", "Gujarati", "Punjabi"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit form and redirect
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const getSubcategories = () => {
    const category = categories.find(c => c.id === formData.category);
    return category?.subcategories || [];
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Join as a Mentor
          </h1>
          <p className="text-muted-foreground text-center">
            Share your expertise and help others grow in their careers
          </p>
        </div>

        <Progress value={progress} className="mb-8" />

        <Card className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Professional Information</h2>
              <div className="space-y-4">
                <div>
                  <Label>Current Role</Label>
                  <Input
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g., Google"
                    required
                  />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5-8 years">5-8 years</SelectItem>
                      <SelectItem value="8+ years">8+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>LinkedIn Profile</Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                    type="url"
                  />
                </div>
                <div>
                  <Label>Personal Website (Optional)</Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    type="url"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Expertise & Skills</h2>
              <div className="space-y-4">
                <div>
                  <Label>Domain</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.category && (
                  <div>
                    <Label>Specialization</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {getSubcategories().map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about your professional journey and expertise..."
                    className="h-32"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Availability & Preferences</h2>
              <div className="space-y-4">
                <div>
                  <Label>Available Days</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableDays.map((day) => (
                      <Badge
                        key={day}
                        variant={formData.availability.days.includes(day) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select
                      value={formData.availability.startTime}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        availability: { ...formData.availability, startTime: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
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
                      value={formData.availability.endTime}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        availability: { ...formData.availability, endTime: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
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
                <div>
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {languageOptions.map((language) => (
                      <Badge
                        key={language}
                        variant={formData.languages.includes(language) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleLanguage(language)}
                      >
                        {language}
                        {formData.languages.includes(language) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Session Rate (per hour)</Label>
                  <Select
                    value={formData.sessionRate}
                    onValueChange={(value) => setFormData({ ...formData, sessionRate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1499">₹1,499</SelectItem>
                      <SelectItem value="1999">₹1,999</SelectItem>
                      <SelectItem value="2499">₹2,499</SelectItem>
                      <SelectItem value="2999">₹2,999</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Mentorship Approach</h2>
              <div className="space-y-4">
                <div>
                  <Label>What mentees can expect from you</Label>
                  <Textarea
                    value={formData.expectations}
                    onChange={(e) => setFormData({ ...formData, expectations: e.target.value })}
                    placeholder="Describe your mentorship style and what mentees can expect..."
                    className="h-32"
                  />
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-medium mb-2">Our Expectations from Mentors</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Commit to regular mentoring sessions</li>
                    <li>• Provide constructive feedback</li>
                    <li>• Share industry insights and experiences</li>
                    <li>• Help mentees set and achieve career goals</li>
                    <li>• Maintain professional conduct</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
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
                (step === 1 && (!formData.profession || !formData.company || !formData.experience)) ||
                (step === 2 && (!formData.category || !formData.subcategory || !formData.bio)) ||
                (step === 3 && (!formData.availability.days.length || !formData.availability.startTime || !formData.availability.endTime || !formData.languages.length || !formData.sessionRate)) ||
                (step === 4 && !formData.expectations)
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