"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Lock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupChatListProps {
  selectedGroupId?: string;
  onGroupSelect: (groupId: string) => void;
}

export function GroupChatList({ selectedGroupId, onGroupSelect }: GroupChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock groups data - in a real app this would come from your backend
  const groups = [
    {
      id: "1",
      name: "Frontend Developers",
      description: "Discussion about frontend development",
      members: 12,
      maxMembers: 20,
      isPublic: true,
      lastMessage: "Has anyone tried the new React Server Components?",
      lastMessageTime: "10:30 AM"
    },
    {
      id: "2",
      name: "System Design Study Group",
      description: "Preparing for system design interviews",
      members: 8,
      maxMembers: 15,
      isPublic: false,
      lastMessage: "Let's discuss microservices architecture today",
      lastMessageTime: "Yesterday"
    }
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => onGroupSelect(group.id)}
              className={cn(
                "w-full p-4 text-left hover:bg-accent/50 transition-colors",
                selectedGroupId === group.id && "bg-accent"
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{group.name}</h3>
                    {group.isPublic ? (
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {group.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {group.lastMessageTime}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{group.members}/{group.maxMembers}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {group.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}