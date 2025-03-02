"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";
import { mentorsData } from "@/lib/mentors-data";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: number;
  receiverId: number;
}

export default function MessagesPage() {
  const [selectedMentor, setSelectedMentor] = useState(mentorsData[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! How can I help you today?",
      timestamp: new Date(),
      senderId: selectedMentor.id,
      receiverId: 0,
    },
    {
      id: "2",
      text: "I'd like to discuss the upcoming mentorship session.",
      timestamp: new Date(),
      senderId: 0,
      receiverId: selectedMentor.id,
    },
  ]);

  const filteredMentors = mentorsData.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    // Add message handling logic here
    setMessageInput("");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Mentors List */}
        <Card className="col-span-4 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredMentors.map((mentor) => (
                <button
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor)}
                  className={`w-full p-4 flex items-center space-x-4 hover:bg-accent/50 transition-colors ${
                    selectedMentor.id === mentor.id ? "bg-accent" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentor.profession}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-8 flex flex-col">
          {selectedMentor && (
            <>
              <div className="p-4 border-b flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedMentor.image} alt={selectedMentor.name} />
                  <AvatarFallback>
                    {selectedMentor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedMentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedMentor.profession} at {selectedMentor.company}
                  </p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t flex space-x-2"
              >
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}