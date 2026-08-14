import { FileText, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BioCardProps {
  onEdit?: () => void;
}

export function BioCard({
    onEdit,
}:BioCardProps) {    
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            About Me
          </CardTitle>

          <CardDescription>
            A short introduction that appears on your profile.
          </CardDescription>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>

      <CardContent>
        <p className="leading-7 text-muted-foreground">
          Passionate Frontend AI Engineer with experience building
          modern SaaS applications using React, Next.js, Tailwind CSS,
          Shadcn UI, and AI technologies. I enjoy creating scalable
          dashboards, AI products, and developer tools that provide
          excellent user experiences.
        </p>
      </CardContent>
    </Card>
  );
}