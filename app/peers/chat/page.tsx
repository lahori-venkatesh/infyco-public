"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PeerChatList } from "@/components/peers/chat/peer-chat-list";
import { GroupChatList } from "@/components/peers/chat/group-chat-list";
import { ChatInterface } from "@/components/peers/chat/chat-interface";
import { CreateGroupDialog } from "@/components/peers/group-chat/create-group-dialog";
import type { Peer } from "@/lib/types";

export default function PeerChatPage() {
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <CreateGroupDialog
          userId={1} // This would come from auth context in a real app
          onGroupCreate={() => {}}
        />
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        <Card className="col-span-4 flex flex-col">
          <Tabs defaultValue="connections" className="flex-1">
            <TabsList className="w-full">
              <TabsTrigger value="connections" className="flex-1">My Connections</TabsTrigger>
              <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="flex-1">
              <PeerChatList
                selectedPeerId={selectedPeer?.id}
                onPeerSelect={setSelectedPeer}
              />
            </TabsContent>

            <TabsContent value="groups" className="flex-1">
              <GroupChatList
                selectedGroupId={selectedGroupId}
                onGroupSelect={setSelectedGroupId}
              />
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="col-span-8">
          {selectedPeer || selectedGroupId ? (
            <ChatInterface
              peer={selectedPeer}
              groupId={selectedGroupId}
              userId={1} // This would come from auth context
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start chatting
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}