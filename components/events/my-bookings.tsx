"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, QrCode, ExternalLink } from "lucide-react";

const bookings = [
  {
    id: 1,
    title: "React Advanced Workshop",
    type: "Workshop",
    date: "March 25, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Online",
    status: "upcoming",
    qrCode: true,
    calendarAdded: false
  },
  // Add more bookings...
];

export function MyBookings() {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{booking.title}</h3>
                <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>
                  {booking.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {booking.date} • {booking.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.location}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {booking.qrCode && (
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  View QR Code
                </Button>
              )}
              {!booking.calendarAdded && (
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              )}
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Join Event
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}