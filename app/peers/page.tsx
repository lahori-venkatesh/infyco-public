"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AllStudentsTab } from "@/components/peers/tabs/all-students-tab";
import { MyConnectionsTab } from "@/components/peers/tabs/my-connections-tab";
import { ChatTab } from "@/components/peers/tabs/chat-tab";
import { GroupsTab } from "@/components/peers/tabs/groups-tab";

export default function PeersPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Connect with Peers</h1>
          <p className="text-muted-foreground mt-1">
            Find and connect with other learners in your field
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b">
            <ScrollArea className="w-full whitespace-nowrap pb-3">
              <TabsList className="inline-flex w-full sm:w-auto h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="all"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  📋 All Students
                </TabsTrigger>
                <TabsTrigger 
                  value="connections"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  👥 My Connections
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  💬 Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="groups"
                  className="px-4 py-2 data-[state=active]:bg-primary/5 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  🎙️ Groups
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          <TabsContent value="all">
            <AllStudentsTab />
          </TabsContent>

          <TabsContent value="connections">
            <MyConnectionsTab />
          </TabsContent>

          <TabsContent value="chat">
            <ChatTab />
          </TabsContent>

          <TabsContent value="groups">
            <GroupsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}