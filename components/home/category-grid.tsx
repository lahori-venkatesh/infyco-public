"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Database,
  Briefcase,
  Palette,
  Rocket,
  GraduationCap,
  BookOpen,
  LineChart,
} from "lucide-react";
import { categories } from "@/lib/categories-data";
import type { Category } from "@/lib/categories-data";

const icons = {
  Code2,
  Database,
  Briefcase,
  Palette,
  Rocket,
  GraduationCap,
  BookOpen,
  LineChart,
} as const;

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category: Category) => {
        const Icon = icons[category.icon as keyof typeof icons];
        return (
          <Link key={category.id} href={`/mentors?category=${category.id}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-xs bg-secondary px-2 py-1 rounded-full"
                    >
                      {sub.title}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}