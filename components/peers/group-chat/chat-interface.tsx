"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import type { StudyGroup, ChatMessage } from "@/lib/types";
import { peersData } from "@/lib/peers-data";
import { format } from "date-fns";

interface ChatInterfaceProps {
  group: StudyGroup;
  userId: number;
  onSendMessage: (groupId: string, message: Omit<ChatMessage, "id">) => void;
}

export function ChatInterface({ group, userId, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(group.id, {
      senderId: userId,
      content: message,
      timestamp: new Date(),
      type: "text",
    });

    setMessage("");
  };

  const getPeerInfo = (peerId: number) => {
    return peersData.find(peer => peer.id === peerId);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-medium">{group.name}</h2>
        <p className="text-sm text-muted-foreground">{group.topic}</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {group.messages.map((msg) => {
            const peer = getPeerInfo(msg.senderId);
            const isCurrentUser = msg.senderId === userId;

            if (msg.type === "system") {
              return (
                <div key={msg.id} className="flex justify-center">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={peer?.avatar} />
                  <AvatarFallback>
                    {peer?.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${isCurrentUser ? "items-end" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{peer?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(msg.timestamp, "HH:mm")}
                    </span>
                  </div>
                  <div
                    className={`mt-1 px-3 py-2 rounded-lg max-w-[80%] ${
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
}