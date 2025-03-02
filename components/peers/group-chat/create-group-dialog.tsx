"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import type { StudyGroup } from "@/lib/types";

interface CreateGroupDialogProps {
  userId: number;
  onGroupCreate: (group: Omit<StudyGroup, "id" | "messages">) => void;
}

export function CreateGroupDialog({ userId, onGroupCreate }: CreateGroupDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    topic: "",
    maxMembers: 4,
    isPublic: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGroup = {
      ...formData,
      members: [userId],
      createdBy: userId,
      createdAt: new Date(),
    };

    onGroupCreate(newGroup);
    setIsOpen(false);
    setFormData({
      name: "",
      description: "",
      topic: "",
      maxMembers: 4,
      isPublic: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Create Study Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Study Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., React Study Group"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g., Frontend Development"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What will your group discuss?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Input
              id="maxMembers"
              type="number"
              min={2}
              max={4}
              value={formData.maxMembers}
              onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isPublic">Make group public</Label>
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Group
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}