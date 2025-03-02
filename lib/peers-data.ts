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

export const peersData: Peer[] = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    title: "Frontend Developer",
    education: {
      degree: "B.Tech in Computer Science",
      institution: "Stanford University",
      year: "2023"
    },
    company: {
      name: "Google",
      role: "Software Engineer"
    },
    skills: ["React", "TypeScript", "Next.js"],
    level: "intermediate",
    connections: 156,
    status: "online",
    lastActive: "Just now",
    isConnected: false
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    title: "Full Stack Developer",
    education: {
      degree: "MS in Software Engineering",
      institution: "MIT",
      year: "2024"
    },
    skills: ["Node.js", "React", "MongoDB"],
    level: "advanced",
    connections: 243,
    status: "offline",
    lastActive: "2 hours ago",
    isConnected: true
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    title: "Machine Learning Engineer",
    education: {
      degree: "PhD in Computer Science",
      institution: "Berkeley",
      year: "2024"
    },
    company: {
      name: "OpenAI",
      role: "Research Engineer"
    },
    skills: ["Python", "TensorFlow", "PyTorch"],
    level: "intermediate",
    connections: 189,
    status: "online",
    lastActive: "5 minutes ago",
    isConnected: false
  }
];