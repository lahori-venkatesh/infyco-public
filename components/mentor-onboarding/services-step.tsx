"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Clock, IndianRupee } from "lucide-react";

interface ServicesStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ServicesStep({ data, onUpdate }: ServicesStepProps) {
  const handleServiceToggle = (serviceKey: string) => {
    onUpdate({
      services: {
        ...data.services,
        [serviceKey]: {
          ...data.services[serviceKey],
          enabled: !data.services[serviceKey].enabled,
        },
      },
    });
  };

  const handleServiceUpdate = (
    serviceKey: string,
    field: "duration" | "price",
    value: string
  ) => {
    onUpdate({
      services: {
        ...data.services,
        [serviceKey]: {
          ...data.services[serviceKey],
          [field]: value,
        },
      },
    });
  };

  const services = [
    {
      key: "oneOnOne",
      title: "1:1 Mentorship Session",
      description: "Personal guidance and career advice",
    },
    {
      key: "resumeReview",
      title: "Resume Review",
      description: "Detailed feedback on resume and portfolio",
    },
    {
      key: "projectAssistance",
      title: "Project Assistance",
      description: "Technical guidance for personal projects",
    },
    {
      key: "interviewPrep",
      title: "Interview Preparation",
      description: "Mock interviews and feedback",
    },
    {
      key: "referralAssistance",
      title: "Referral Assistance",
      description: "Help with job referrals",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Your Services</h3>
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.key} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={data.services[service.key].enabled}
                      onCheckedChange={() => handleServiceToggle(service.key)}
                    />
                    <Label className="font-medium">{service.title}</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-14">
                    {service.description}
                  </p>
                </div>
              </div>

              {data.services[service.key].enabled && (
                <div className="mt-4 ml-14 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Duration (minutes)
                    </Label>
                    <Input
                      type="number"
                      value={data.services[service.key].duration}
                      onChange={(e) =>
                        handleServiceUpdate(service.key, "duration", e.target.value)
                      }
                      min="15"
                      step="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      Price (₹)
                    </Label>
                    <Input
                      type="number"
                      value={data.services[service.key].price}
                      onChange={(e) =>
                        handleServiceUpdate(service.key, "price", e.target.value)
                      }
                      min="100"
                      step="100"
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Details</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="upi">UPI ID</Label>
            <Input
              id="upi"
              value={data.paymentDetails.upi}
              onChange={(e) =>
                onUpdate({
                  paymentDetails: {
                    ...data.paymentDetails,
                    upi: e.target.value,
                  },
                })
              }
              placeholder="username@upi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankAccount">Bank Account Number</Label>
            <Input
              id="bankAccount"
              value={data.paymentDetails.bankAccount}
              onChange={(e) =>
                onUpdate({
                  paymentDetails: {
                    ...data.paymentDetails,
                    bankAccount: e.target.value,
                  },
                })
              }
              placeholder="Enter account number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input
              id="ifsc"
              value={data.paymentDetails.ifsc}
              onChange={(e) =>
                onUpdate({
                  paymentDetails: {
                    ...data.paymentDetails,
                    ifsc: e.target.value,
                  },
                })
              }
              placeholder="Enter IFSC code"
            />
          </div>
        </div>
      </div>
    </div>
  );
}