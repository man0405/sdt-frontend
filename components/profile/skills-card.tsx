import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Sparkles } from "lucide-react";

import { skills } from "./mock-data";

interface SkillsCardProps {
  onEdit?: () => void;
}

export function SkillsCard({
onEdit, 
    }:SkillsCardProps) 
{
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Skills & Expertise
          </CardTitle>

          <CardDescription>
            Technologies and tools you frequently work with.
          </CardDescription>
        </div>

        <Button variant="outline" size="sm"onClick={onEdit}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 text-sm"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}