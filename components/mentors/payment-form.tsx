"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";
import type { Mentor } from "@/lib/types";

interface PaymentFormProps {
  mentor: Mentor;
  selectedDate: Date;
  selectedTime: string;
  onComplete: () => void;
}

export function PaymentForm({
  mentor,
  selectedDate,
  selectedTime,
  onComplete,
}: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Payment Details</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Session Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Mentor: {mentor.name}</p>
            <p>Date: {selectedDate.toLocaleDateString()}</p>
            <p>Time: {selectedTime}</p>
            <p>Rate: {mentor.sessionRate}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="card-number"
                placeholder="4242 4242 4242 4242"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cvv"
                  placeholder="123"
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Pay {mentor.sessionRate}
          </Button>
        </form>
      </div>
    </Card>
  );
}