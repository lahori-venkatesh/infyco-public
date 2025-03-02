"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Building2, GraduationCap, UserPlus2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { peersData } from "@/lib/peers-data";
import { cn } from "@/lib/utils";

export function AllStudentsTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [sentRequests, setSentRequests] = useState<number[]>([]);

  const handleSendRequest = (peerId: number) => {
    setSentRequests(prev => [...prev, peerId]);
    toast({
      title: "Connection Request Sent",
      description: "The student will be notified of your request.",
    });
  };

  const filteredPeers = peersData.filter(peer => {
    const matchesSearch = peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.every(skill => peer.skills.includes(skill));
    const matchesLevel = selectedLevel === "all" || peer.level === selectedLevel;
    return matchesSearch && matchesSkills && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        {/* Add more filters here */}
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeers.map((peer) => (
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
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{peer.name}</h3>
                    <p className="text-sm text-muted-foreground">{peer.title}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={sentRequests.includes(peer.id) ? "secondary" : "default"}
                    onClick={() => handleSendRequest(peer.id)}
                    disabled={sentRequests.includes(peer.id)}
                  >
                    {sentRequests.includes(peer.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Sent
                      </>
                    ) : (
                      <>
                        <UserPlus2 className="w-4 h-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{peer.education.degree}</span>
                  </div>
                  {peer.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{peer.company.name}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {peer.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {peer.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{peer.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}