"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VerificationStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function VerificationStep({ data, onUpdate }: VerificationStepProps) {
  const { toast } = useToast();
  const [verifyingWorkEmail, setVerifyingWorkEmail] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerifyWorkEmail = async () => {
    setVerifyingWorkEmail(true);
    // Simulate OTP send
    toast({
      title: "OTP Sent",
      description: "Please check your work email for the verification code.",
    });
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") { // Simulated OTP check
      onUpdate({ isWorkEmailVerified: true });
      setVerifyingWorkEmail(false);
      setOtp("");
      toast({
        title: "Verified Successfully",
        description: "Your work email has been verified.",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (field: "resume" | "govtId") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload
      toast({
        title: "File Uploaded",
        description: `Your ${field === "resume" ? "resume" : "ID"} has been uploaded successfully.`,
      });
      if (field === "govtId") {
        onUpdate({ isIdVerified: true });
      }
      onUpdate({ [field]: file.name });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workEmail">Work Email</Label>
        <div className="flex gap-2">
          <Input
            id="workEmail"
            type="email"
            value={data.workEmail}
            onChange={(e) => onUpdate({ workEmail: e.target.value })}
            placeholder="you@company.com"
          />
          {data.isWorkEmailVerified ? (
            <Badge variant="secondary" className="h-10 px-3">
              <Check className="w-4 h-4 mr-1" /> Verified
            </Badge>
          ) : (
            <Button
              variant="outline"
              onClick={handleVerifyWorkEmail}
              disabled={!data.workEmail || verifyingWorkEmail}
            >
              Verify
            </Button>
          )}
        </div>
      </div>

      {verifyingWorkEmail && (
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
            Enter code sent to your work email
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="resume">Upload Resume (Optional)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload("resume")}
          />
          {data.resume && (
            <Badge variant="secondary">
              {data.resume}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="govtId">Government ID Verification</Label>
        <div className="flex items-center gap-4">
          <Input
            id="govtId"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload("govtId")}
          />
          {data.isIdVerified && (
            <Badge variant="secondary" className="h-10 px-3">
              <Check className="w-4 h-4 mr-1" /> Verified
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Upload any government-issued ID for verification
        </p>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <h4 className="font-medium mb-2">Verification Status</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={data.isWorkEmailVerified ? "default" : "secondary"}>
              Work Email
            </Badge>
            <span className="text-sm text-muted-foreground">
              {data.isWorkEmailVerified ? "Verified" : "Pending"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={data.isIdVerified ? "default" : "secondary"}>
              ID Verification
            </Badge>
            <span className="text-sm text-muted-foreground">
              {data.isIdVerified ? "Verified" : "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}