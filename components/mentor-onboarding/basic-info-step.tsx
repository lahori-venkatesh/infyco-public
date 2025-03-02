"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

interface BasicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const { toast } = useToast();
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerifyEmail = async () => {
    setVerifyingEmail(true);
    // Simulate OTP send
    toast({
      title: "OTP Sent",
      description: "Please check your email for the verification code.",
    });
  };

  const handleVerifyPhone = async () => {
    setVerifyingPhone(true);
    // Simulate OTP send
    toast({
      title: "OTP Sent",
      description: "Please check your phone for the verification code.",
    });
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") { // Simulated OTP check
      if (verifyingEmail) {
        onUpdate({ isEmailVerified: true });
        setVerifyingEmail(false);
      }
      if (verifyingPhone) {
        onUpdate({ isPhoneVerified: true });
        setVerifyingPhone(false);
      }
      setOtp("");
      toast({
        title: "Verified Successfully",
        description: "Your contact information has been verified.",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="john@example.com"
            required
          />
          {data.isEmailVerified ? (
            <Badge variant="secondary" className="h-10 px-3">
              <Check className="w-4 h-4 mr-1" /> Verified
            </Badge>
          ) : (
            <Button
              variant="outline"
              onClick={handleVerifyEmail}
              disabled={!data.email || verifyingEmail}
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex gap-2">
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="+91 9876543210"
            required
          />
          {data.isPhoneVerified ? (
            <Badge variant="secondary" className="h-10 px-3">
              <Check className="w-4 h-4 mr-1" /> Verified
            </Badge>
          ) : (
            <Button
              variant="outline"
              onClick={handleVerifyPhone}
              disabled={!data.phone || verifyingPhone}
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      {(verifyingEmail || verifyingPhone) && (
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <div className="flex gap-2">
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
              maxLength={4}
            />
            <Button onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter code sent to your {verifyingEmail ? "email" : "phone"}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Image</Label>
        <div className="flex items-center gap-4">
          {data.profileImage ? (
            <Image
              src={data.profileImage}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          <Input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="max-w-[250px]"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Upload a professional headshot (recommended size: 400x400px)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Current Company</Label>
        <Input
          id="company"
          value={data.company}
          onChange={(e) => onUpdate({ company: e.target.value })}
          placeholder="Company Name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          placeholder="City, Country"
          required
        />
      </div>
    </div>
  );
}