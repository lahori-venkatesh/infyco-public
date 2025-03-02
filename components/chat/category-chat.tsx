"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Upload } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Get help with React, Angular, Vue.js, and other frontend technologies"
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Assistance with Node.js, Python, Java, and database design"
  },
  {
    id: "design",
    name: "UI/UX Design",
    description: "Help with user interface design, wireframes, and prototypes"
  },
  {
    id: "graphics",
    name: "Graphic Design",
    description: "Support for visual design, branding, and illustrations"
  }
];

export function CategoryChat() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [question, setQuestion] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !question.trim()) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success message or next steps
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Select Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategory && (
              <p className="text-sm text-muted-foreground">
                {categories.find(c => c.id === selectedCategory)?.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Describe Your Question</Label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Explain what you need help with..."
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Attach Files (Optional)</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
              >
                <Upload className="h-4 w-4" />
                Choose Files
              </Label>
              {files && (
                <span className="text-sm text-muted-foreground">
                  {files.length} file(s) selected
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: .pdf, .doc, .docx, .png, .jpg (max 5MB each)
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedCategory || !question.trim() || isSubmitting}
          >
            {isSubmitting ? "Connecting..." : "Connect with Expert"}
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
}