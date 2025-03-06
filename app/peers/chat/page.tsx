"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ArrowLeft } from "lucide-react";
import { peersData } from "@/lib/peers-data";
import { ChatInterface } from "@/components/peers/chat/chat-interface";
import { cn } from "@/lib/utils";
import type { Peer } from "@/lib/types";

export default function PeerChatPage() {
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const connectedPeers = peersData.filter(peer => peer.isConnected);
  const filteredPeers = connectedPeers.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedPeer(null);
  };

  return (
    <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 h-[calc(100vh-5rem)]">
        {/* Chat List - Hidden on mobile when chat is open */}
        <Card 
          className={cn(
            "md:col-span-4 flex flex-col",
            selectedPeer ? "hidden md:flex" : "flex"
          )}
        >
          <div className="p-3 sm:p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredPeers.map((peer) => (
                <button
                  key={peer.id}
                  onClick={() => setSelectedPeer(peer)}
                  className={cn(
                    "w-full p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 hover:bg-accent/50 transition-colors",
                    selectedPeer?.id === peer.id && "bg-accent"
                  )}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage src={peer.avatar} alt={peer.name} />
                      <AvatarFallback>
                        {peer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                      peer.status === "online" ? "bg-green-500" : "bg-gray-400"
                    )} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-sm sm:text-base">{peer.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {peer.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Interface - Full screen on mobile when active */}
        <Card 
          className={cn(
            "md:col-span-8 h-full",
            selectedPeer ? "flex flex-col" : "hidden md:flex"
          )}
        >
          {selectedPeer ? (
            <div className="flex flex-col h-full">
              {/* Mobile Back Button */}
              <div className="md:hidden p-3 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToList}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Chats
                </Button>
              </div>
              <ChatInterface peer={selectedPeer} userId={1} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground p-4 text-center">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}