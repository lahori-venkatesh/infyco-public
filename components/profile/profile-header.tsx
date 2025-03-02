"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, MapPin, Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export function ProfileHeader() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
    location: "San Francisco, CA",
    bio: "Software Engineer passionate about building great products",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  };

  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <p className="mt-2">{user.bio}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/profile/edit">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
          
          <div className="flex gap-4 mt-4">
            <Button variant="ghost" size="sm" asChild>
              <a href={`mailto:${user.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={user.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}