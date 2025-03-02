"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Peer } from "@/lib/types";

interface Message {
  id: string;
  text: string;
  senderId: number;
  timestamp: Date;
  status: "pending" | "sent" | "delivered" | "read";
}

interface ChatInterfaceProps {
  peer?: Peer | null;
  groupId?: string;
  userId: number;
}

export function ChatInterface({ peer, groupId, userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [peerStatus, setPeerStatus] = useState<{
    status: "online" | "offline";
    lastSeen?: string;
  }>({ status: "online" });

  useEffect(() => {
    if (peer) {
      setMessages([
        {
          id: "1",
          text: `Hey! Let's connect and learn together!`,
          senderId: peer.id,
          timestamp: new Date(),
          status: "read"
        }
      ]);
    }
    // Reset messages when peer changes
    return () => setMessages([]);
  }, [peer]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      senderId: userId,
      timestamp: new Date(),
      status: "pending"
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );

      // Simulate peer response
      if (peer) {
        const peerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for the message! Let's collaborate!",
          senderId: peer.id,
          timestamp: new Date(),
          status: "read"
        };
        setMessages(prev => [...prev, peerResponse]);
      }
    }, 2000);
  };

  const MessageStatus = ({ status }: { status: Message["status"] }) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 text-muted-foreground animate-pulse" />;
      case "sent":
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="w-3 h-3 text-muted-foreground" />
            <Check className="w-3 h-3 text-muted-foreground -ml-1" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check className="w-3 h-3 text-primary" />
            <Check className="w-3 h-3 text-primary -ml-1" />
          </div>
        );
    }
  };

  if (!peer && !groupId) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b">
        {peer ? (
          <div className="flex items-center space-x-4">
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
            <div>
              <h3 className="font-medium">{peer.name}</h3>
              <p className="text-sm text-muted-foreground">{peer.title}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Group Chat</h3>
              <p className="text-sm text-muted-foreground">12 members</p>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === userId
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.senderId === userId && (
                    <MessageStatus status={message.status} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}