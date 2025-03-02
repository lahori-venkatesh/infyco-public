"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Search, Plus } from "lucide-react";

export function EventHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("all");
  const [location, setLocation] = useState("all");

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
      
      <div className="container mx-auto px-4 py-6 md:py-12 relative">
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            Discover Amazing Tech Events
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Join hackathons, find internships, attend workshops, and more
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-lg p-4 md:p-6 shadow-lg">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-12 md:h-10"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12 md:h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hackathon">Hackathon</SelectItem>
                <SelectItem value="job">Job</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="tech-talk">Tech Talk</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="h-12 md:h-10">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-12 md:h-10">
                <MapPin className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mt-4">
            <Button variant="outline" className="h-12 md:h-10 w-full md:w-auto">
              <MapPin className="mr-2 h-4 w-4" />
              Use Current Location
            </Button>
            <Button className="h-12 md:h-10 w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}