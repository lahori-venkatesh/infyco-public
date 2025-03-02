"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Building2, GraduationCap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { peersData } from "@/lib/peers-data";
import { cn } from "@/lib/utils";

interface PeersListProps {
  selectedSkills: string[];
  selectedLevel: string;
}

export function PeersList({ selectedSkills, selectedLevel }: PeersListProps) {
  const { toast } = useToast();
  const [peers, setPeers] = useState(peersData);

  const filteredPeers = peers.filter(peer => {
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => peer.skills.includes(skill));
    const matchesLevel = selectedLevel === "all" || peer.level === selectedLevel;
    return matchesSkills && matchesLevel;
  });

  const handleConnect = (peerId: number) => {
    setPeers(currentPeers =>
      currentPeers.map(peer =>
        peer.id === peerId
          ? { ...peer, isConnected: !peer.isConnected }
          : peer
      )
    );

    const peer = peers.find(p => p.id === peerId);
    toast({
      title: peer?.isConnected ? "Connection removed" : "Connection request sent",
      description: peer?.isConnected
        ? `You are no longer connected with ${peer.name}`
        : `A connection request has been sent to ${peer?.name}`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPeers.map((peer) => (
        <Card key={peer.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={peer.avatar} alt={peer.name} />
                <AvatarFallback>{peer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                peer.status === "online" ? "bg-green-500" : "bg-gray-400"
              )} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{peer.name}</h3>
                  <p className="text-sm text-muted-foreground">{peer.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {peer.connections} connections
                    </span>
                    {peer.status === "online" ? (
                      <Badge variant="secondary" className="text-xs">Online</Badge>
                    ) : (
                      <span>Last active {peer.lastActive}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{peer.education.degree}</p>
                <p className="text-xs">{peer.education.institution} • {peer.education.year}</p>
              </div>
            </div>
            {peer.company && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{peer.company.role}</p>
                  <p className="text-xs">{peer.company.name}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {peer.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                variant={peer.isConnected ? "outline" : "default"}
                onClick={() => handleConnect(peer.id)}
              >
                {peer.isConnected ? "Connected" : "Connect"}
              </Button>
              {peer.isConnected && (
                <Button variant="outline" asChild>
                  <Link href={`/messages?peer=${peer.id}`}>
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}