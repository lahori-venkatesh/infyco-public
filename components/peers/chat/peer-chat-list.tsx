"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { peersData } from "@/lib/peers-data";
import { cn } from "@/lib/utils";
import type { Peer } from "@/lib/types";

interface PeerChatListProps {
  selectedPeerId?: number;
  onPeerSelect: (peer: Peer) => void;
}

export function PeerChatList({ selectedPeerId, onPeerSelect }: PeerChatListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeers = peersData.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
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
              onClick={() => onPeerSelect(peer)}
              className={cn(
                "w-full p-4 flex items-center space-x-4 hover:bg-accent/50 transition-colors",
                selectedPeerId === peer.id && "bg-accent"
              )}
            >
              <div className="relative">
                <Avatar>
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
                <h3 className="font-medium">{peer.name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {peer.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}