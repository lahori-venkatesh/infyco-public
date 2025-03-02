import type { Event } from "./types";

export const eventsData: Event[] = [
  {
    id: 1,
    type: "internship",
    title: "Software Engineering Internship",
    organizer: "Google",
    date: "Summer 2024",
    location: "Mountain View, CA",
    description: "3-month internship working on cutting-edge projects with Google's engineering team.",
    link: "https://careers.google.com",
    participants: null,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    deadline: "April 30, 2024",
    stipend: "$8000/month"
  },
  {
    id: 2,
    type: "course",
    title: "Advanced React Patterns",
    organizer: "Frontend Masters",
    date: "Self-paced",
    location: "Online",
    description: "Learn advanced React patterns and best practices from industry experts.",
    link: "https://frontendmasters.com",
    participants: 1500,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    duration: "20 hours",
    price: "$39.99"
  },
  {
    id: 3,
    type: "guest-lecture",
    title: "System Design at Scale",
    organizer: "Tech Talks",
    date: "March 25, 2024",
    location: "Virtual",
    description: "Learn system design principles from senior engineers at top tech companies.",
    link: "https://example.com/register",
    participants: 500,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
    speaker: "Alex Thompson",
    speakerRole: "Principal Architect at Amazon"
  },
  {
    id: 4,
    type: "hackathon",
    title: "AI Innovation Challenge",
    organizer: "TechHub",
    date: "April 15-17, 2024",
    location: "San Francisco, CA",
    description: "48-hour hackathon focused on building AI-powered solutions.",
    link: "https://example.com/hackathon",
    participants: 200,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
    prizes: ["$10,000 First Prize", "$5,000 Second Prize"],
    teamSize: "2-4 members"
  }
];