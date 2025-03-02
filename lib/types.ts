export type EventType = "all" | "internship" | "course" | "guest-lecture" | "hackathon";

export interface Event {
  id: number;
  type: Exclude<EventType, "all">;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  link: string;
  participants: number | null;
  image: string;
  deadline?: string;
  stipend?: string;
  duration?: string;
  price?: string;
  speaker?: string;
  speakerRole?: string;
  prizes?: string[];
  teamSize?: string;
}

export type PeerStatus = "online" | "offline" | "busy";

export interface ChatMessage {
  id: string;
  senderId: number;
  content: string;
  timestamp: Date;
  type: "text" | "system";
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  members: number[];
  createdBy: number;
  createdAt: Date;
  messages: ChatMessage[];
  maxMembers: number;
  isPublic: boolean;
}

export interface Peer {
  id: number;
  name: string;
  avatar: string;
  title: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  company?: {
    name: string;
    role: string;
  };
  skills: string[];
  level: string;
  connections: number;
  status: "online" | "offline";
  lastActive: string;
  isConnected: boolean;
}

export interface Mentor {
  id: number;
  name: string;
  image: string;
  profession: string;
  company: string;
  rating: number;
  skills: string[];
  description: string;
  category: string;
  subcategory: string;
  availability: string[];
  sessionRate: string;
  languages: string[];
  experience: string;
  linkedin: string;
  website: string;
  email: string;
  specializations: string[];
  achievements: string[];
  location: string;
  careerHistory?: any[];
  reviews?: any[];
  resources?: any[];
  minutesMentored: number;
  totalMentees: number;
}