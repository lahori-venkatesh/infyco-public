"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Clock, MapPin, Briefcase } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
    mode: "Hybrid",
    experience: "5-8 years",
    salary: "₹30-45 LPA",
    skills: ["React", "TypeScript", "Next.js"],
    postedAt: "2 days ago",
    deadline: "March 31, 2024"
  },
  // Add more jobs...
];

export function JobBoard() {
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Card key={job.id} className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{job.company}</span>
                  </div>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location} • {job.mode}
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {job.experience}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Posted {job.postedAt}
                  </div>
                  <div className="text-sm font-medium">
                    {job.salary}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button>Quick Apply</Button>
              <Button variant="outline">Save Job</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}