"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Linkedin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfessionalDetailsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ProfessionalDetailsStep({ data, onUpdate }: ProfessionalDetailsStepProps) {
  const { toast } = useToast();
  const [newRole, setNewRole] = useState({
    company: "",
    role: "",
    duration: "",
  });
  const [newSkill, setNewSkill] = useState("");

  const experienceLevels = [
    "0-2 years",
    "3-5 years",
    "5-8 years",
    "8-10 years",
    "10+ years",
  ];

  const predefinedSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "AWS",
    "System Design",
    "Data Structures",
    "Machine Learning",
    "Product Management",
  ];

  const handleAddRole = () => {
    if (newRole.company && newRole.role && newRole.duration) {
      onUpdate({
        previousRoles: [...data.previousRoles, newRole],
      });
      setNewRole({ company: "", role: "", duration: "" });
    }
  };

  const handleRemoveRole = (index: number) => {
    onUpdate({
      previousRoles: data.previousRoles.filter((_: any, i: number) => i !== index),
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !data.skills.includes(newSkill)) {
      onUpdate({ skills: [...data.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    onUpdate({
      skills: data.skills.filter((s: string) => s !== skill),
    });
  };

  const handleLinkedinVerify = async () => {
    // Simulate LinkedIn verification
    toast({
      title: "LinkedIn Verified",
      description: "Your LinkedIn profile has been successfully verified.",
    });
    onUpdate({ isLinkedinVerified: true });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience</Label>
        <Select
          value={data.experience}
          onValueChange={(value) => onUpdate({ experience: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
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

      <div className="space-y-2">
        <Label htmlFor="currentRole">Current Role</Label>
        <Input
          id="currentRole"
          value={data.currentRole}
          onChange={(e) => onUpdate({ currentRole: e.target.value })}
          placeholder="Senior Software Engineer"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Previous Roles</Label>
        <div className="space-y-4">
          {data.previousRoles.map((role: any, index: number) => (
            <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
              <div className="flex-1">
                <p className="font-medium">{role.role}</p>
                <p className="text-sm text-muted-foreground">
                  {role.company} • {role.duration}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveRole(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Company"
              value={newRole.company}
              onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={newRole.role}
              onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
            />
            <Input
              placeholder="Duration"
              value={newRole.duration}
              onChange={(e) => setNewRole({ ...newRole, duration: e.target.value })}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleAddRole}
            disabled={!newRole.company || !newRole.role || !newRole.duration}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map((skill: string) => (
            <Badge
              key={skill}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleRemoveSkill(skill)}
            >
              {skill}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
        <Select
          value={newSkill}
          onValueChange={(value) => {
            setNewSkill(value);
            if (value && !data.skills.includes(value)) {
              onUpdate({ skills: [...data.skills, value] });
              setNewSkill("");
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select or type a skill" />
          </SelectTrigger>
          <SelectContent>
            {predefinedSkills
              .filter((skill) => !data.skills.includes(skill))
              .map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Add custom skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          className="mt-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">About You</Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => onUpdate({ bio: e.target.value })}
          placeholder="Tell us about your background and mentorship approach..."
          className="h-32"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <div className="flex gap-2">
          <Input
            id="linkedin"
            value={data.linkedinUrl}
            onChange={(e) => onUpdate({ linkedinUrl: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            type="url"
          />
          {data.isLinkedinVerified ? (
            <Badge variant="secondary" className="h-10 px-3">Verified</Badge>
          ) : (
            <Button
              variant="outline"
              onClick={handleLinkedinVerify}
              disabled={!data.linkedinUrl}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Verify
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}