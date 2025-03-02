"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Lock, Globe } from "lucide-react";
import type { StudyGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GroupListProps {
  groups: StudyGroup[];
  selectedGroupId?: string;
  onGroupSelect: (groupId: string) => void;
  onJoinGroup: (groupId: string) => void;
  userId: number;
}

export function GroupList({
  groups,
  selectedGroupId,
  onGroupSelect,
  onJoinGroup,
  userId
}: GroupListProps) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <Card
          key={group.id}
          className={cn(
            "p-4 cursor-pointer hover:shadow-md transition-shadow",
            selectedGroupId === group.id && "border-primary"
          )}
          onClick={() => onGroupSelect(group.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-muted-foreground">{group.topic}</p>
            </div>
            {group.isPublic ? (
              <Globe className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{group.members.length}/{group.maxMembers}</span>
            </div>
            {!group.members.includes(userId) && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onJoinGroup(group.id);
                }}
              >
                Join Group
              </Button>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {group.isPublic ? "Public" : "Private"}
            </Badge>
            {group.members.includes(userId) && (
              <Badge variant="outline" className="text-xs">
                Member
              </Badge>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}