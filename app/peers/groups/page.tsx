"use client";

import { useState } from "react";
import { CreateGroupDialog } from "@/components/peers/group-chat/create-group-dialog";
import { GroupList } from "@/components/peers/group-chat/group-list";
import { ChatInterface } from "@/components/peers/group-chat/chat-interface";
import type { StudyGroup, ChatMessage } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

// Simulated current user ID
const CURRENT_USER_ID = 1;

export default function GroupsPage() {
  const { toast } = useToast();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const handleCreateGroup = (groupData: Omit<StudyGroup, "id" | "messages">) => {
    const newGroup: StudyGroup = {
      ...groupData,
      id: `group-${Date.now()}`,
      messages: [{
        id: `msg-${Date.now()}`,
        senderId: CURRENT_USER_ID,
        content: "Group created",
        timestamp: new Date(),
        type: "system"
      }],
    };

    setGroups(prev => [...prev, newGroup]);
    setSelectedGroupId(newGroup.id);
    
    toast({
      title: "Group created",
      description: `${newGroup.name} has been created successfully.`,
    });
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId && !group.members.includes(CURRENT_USER_ID)) {
        return {
          ...group,
          members: [...group.members, CURRENT_USER_ID],
          messages: [
            ...group.messages,
            {
              id: `msg-${Date.now()}`,
              senderId: CURRENT_USER_ID,
              content: "Joined the group",
              timestamp: new Date(),
              type: "system"
            }
          ]
        };
      }
      return group;
    }));

    setSelectedGroupId(groupId);
    
    toast({
      title: "Joined group",
      description: "You have successfully joined the group.",
    });
  };

  const handleSendMessage = (groupId: string, messageData: Omit<ChatMessage, "id">) => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          messages: [
            ...group.messages,
            { ...messageData, id: `msg-${Date.now()}` }
          ]
        };
      }
      return group;
    }));
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Study Groups</h1>
          <p className="text-muted-foreground mt-1">
            Join or create study groups to learn together
          </p>
        </div>
        <CreateGroupDialog
          userId={CURRENT_USER_ID}
          onGroupCreate={handleCreateGroup}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <GroupList
            groups={groups}
            selectedGroupId={selectedGroupId}
            onGroupSelect={setSelectedGroupId}
            onJoinGroup={handleJoinGroup}
            userId={CURRENT_USER_ID}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedGroup ? (
            <ChatInterface
              group={selectedGroup}
              userId={CURRENT_USER_ID}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-[600px] border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">
                Select a group to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}