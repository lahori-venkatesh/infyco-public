"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Phone, Video, Bell, BellOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { peersData } from "@/lib/peers-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function MyConnectionsTab() {
  const { toast } = useToast();
  const [mutedPeers, setMutedPeers] = useState<number[]>([]);
  
  // Filter only connected peers
  const connectedPeers = peersData.filter(peer => peer.isConnected);

  const handleToggleMute = (peerId: number) => {
    setMutedPeers(prev =>
      prev.includes(peerId)
        ? prev.filter(id => id !== peerId)
        : [...prev, peerId]
    );

    toast({
      title: mutedPeers.includes(peerId) ? "Notifications Unmuted" : "Notifications Muted",
      description: `You will ${mutedPeers.includes(peerId) ? "now" : "no longer"} receive notifications from this peer.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {connectedPeers.map((peer) => (
        <Card key={peer.id} className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
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

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{peer.name}</h3>
                  <p className="text-sm text-muted-foreground">{peer.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {peer.status === "online" ? "Online" : `Last seen ${peer.lastActive}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleMute(peer.id)}
                >
                  {mutedPeers.includes(peer.id) ? (
                    <BellOff className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {peer.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/peers/chat?peer=${peer.id}`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}