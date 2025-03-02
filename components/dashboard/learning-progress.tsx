"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function LearningProgress() {
  const skills = [
    {
      name: "React",
      progress: 75,
      level: "Advanced",
      hoursSpent: 45
    },
    {
      name: "TypeScript",
      progress: 60,
      level: "Intermediate",
      hoursSpent: 30
    },
    {
      name: "System Design",
      progress: 40,
      level: "Beginner",
      hoursSpent: 20
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Learning Progress</h2>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-medium">{skill.name}</h3>
                <p className="text-sm text-muted-foreground">{skill.level}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{skill.progress}%</p>
                <p className="text-sm text-muted-foreground">{skill.hoursSpent} hours</p>
              </div>
            </div>
            <Progress value={skill.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}