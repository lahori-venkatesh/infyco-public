"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Video, Phone, Lock, Globe } from "lucide-react";
import { CreateGroupDialog } from "@/components/peers/group-chat/create-group-dialog";

export function GroupsTab() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock groups data
  const groups = [
    {
      id: "1",
      name: "Frontend Development",
      description: "Discuss React, Vue, and modern web development",
      members: 12,
      maxMembers: 20,
      isPublic: true,
      activeCall: true,
      participants: 3
    },
    {
      id: "2",
      name: "System Design",
      description: "Prepare for system design interviews together",
      members: 8,
      maxMembers: 15,
      isPublic: false,
      activeCall: false,
      participants: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <CreateGroupDialog userId={1} onGroupCreate={() => {}} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {group.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{group.name}</h3>
                    {group.isPublic ? (
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {group.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {group.members}/{group.maxMembers} members
                </span>
              </div>
              <Badge variant={group.isPublic ? "secondary" : "outline"}>
                {group.isPublic ? "Public" : "Private"}
              </Badge>
            </div>

            {group.activeCall && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">
                      Active Call ({group.participants} participants)
                    </span>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <Button className="flex-1" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Audio Call
              </Button>
              <Button className="flex-1" variant="outline">
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}