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
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  title: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "engineering",
    title: "Engineering",
    description: "Software Development & Architecture",
    icon: "Code2",
    subcategories: [
      { id: "frontend", title: "Frontend Development", description: "Web and mobile UI development" },
      { id: "backend", title: "Backend Development", description: "Server-side and API development" },
      { id: "fullstack", title: "Full Stack Development", description: "End-to-end application development" },
      { id: "devops", title: "DevOps / SRE", description: "Infrastructure and deployment" },
      { id: "cybersecurity", title: "Cybersecurity", description: "Security and protection" },
      { id: "testing", title: "Testing", description: "Quality assurance and testing" }
    ]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Analytics & Machine Learning",
    icon: "Database",
    subcategories: [
      { id: "data-engineer", title: "Data Engineer", description: "Data pipeline and infrastructure" },
      { id: "data-scientist", title: "Data Scientist", description: "Statistical analysis and modeling" },
      { id: "data-analyst", title: "Data Analyst", description: "Data analysis and visualization" },
      { id: "big-data", title: "Big Data Engineer", description: "Large-scale data processing" },
      { id: "ai-ml", title: "AI/ML Engineer", description: "Artificial intelligence and machine learning" }
    ]
  },
  {
    id: "business",
    title: "Business",
    description: "Strategy & Management",
    icon: "Briefcase",
    subcategories: [
      { id: "marketing", title: "Marketing", description: "Brand and marketing strategy" },
      { id: "sales", title: "Sales", description: "Sales and business development" },
      { id: "business-analyst", title: "Business Analyst", description: "Business process and analysis" },
      { id: "finance", title: "Finance", description: "Financial planning and analysis" },
      { id: "digital-marketing", title: "Digital Marketing", description: "Online marketing and growth" }
    ]
  },
  {
    id: "design",
    title: "Design",
    description: "UX/UI & Product Design",
    icon: "Palette",
    subcategories: [
      { id: "product-manager", title: "Product Manager", description: "Product strategy and execution" },
      { id: "ui-ux", title: "UI/UX Designer", description: "User interface and experience design" },
      { id: "project-manager", title: "Project Manager", description: "Project planning and execution" },
      { id: "program-manager", title: "Program Manager", description: "Program strategy and oversight" },
      { id: "ux-researcher", title: "UX Researcher", description: "User research and insights" },
      { id: "product-designer", title: "Product Designer", description: "End-to-end product design" }
    ]
  },
  {
    id: "startup",
    title: "Startup",
    description: "Entrepreneurship & Innovation",
    icon: "Rocket",
    subcategories: [
      { id: "ceo", title: "CEO", description: "Chief Executive Officer" },
      { id: "cto", title: "CTO", description: "Chief Technology Officer" },
      { id: "cpo", title: "CPO", description: "Chief Product Officer" },
      { id: "cfo", title: "CFO", description: "Chief Financial Officer" },
      { id: "coo", title: "COO", description: "Chief Operations Officer" },
      { id: "cmo", title: "CMO", description: "Chief Marketing Officer" },
      { id: "product-manager", title: "Product Manager", description: "Product strategy and execution" },
      { id: "qa", title: "QA Engineer", description: "Quality assurance and testing" },
      { id: "sales-manager", title: "Sales Manager", description: "Sales team leadership" },
      { id: "customer-service", title: "Customer Service", description: "Customer support and success" }
    ]
  },
  {
    id: "career-coach",
    title: "Career Coach",
    description: "Professional Development",
    icon: "GraduationCap",
    subcategories: [
      { id: "leadership", title: "Leadership Coach", description: "Leadership development" },
      { id: "career-growth", title: "Career Growth", description: "Career progression and planning" },
      { id: "interview", title: "Interview Coach", description: "Interview preparation" },
      { id: "management", title: "Management Coach", description: "Management skills" }
    ]
  },
  {
    id: "upsc",
    title: "UPSC",
    description: "Civil Services Preparation",
    icon: "BookOpen",
    subcategories: [
      { id: "aspirants", title: "UPSC Aspirants", description: "Exam preparation" },
      { id: "coaches", title: "UPSC Coaches", description: "Expert guidance" }
    ]
  },
  {
    id: "finance",
    title: "Finance",
    description: "Investment & Trading",
    icon: "LineChart",
    subcategories: [
      { id: "mutual-funds", title: "Mutual Funds Expert", description: "Fund investment strategy" },
      { id: "investment", title: "Investment Expert", description: "Investment planning" },
      { id: "intraday", title: "Intraday Trading", description: "Day trading strategy" },
      { id: "swing", title: "Swing Trading", description: "Short-term trading" }
    ]
  }
];