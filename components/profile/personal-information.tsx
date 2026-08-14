import { Pencil } from "lucide-react";

import { personalInformation, profile } from "./mock-data";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface PersonalInformationProps {
  onEdit?: () => void;
}

export function PersonalInformation({
  onEdit,
}: PersonalInformationProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Personal Information</CardTitle>

          <CardDescription>
            Your personal details and contact information.
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
        <div className="grid gap-6 sm:grid-cols-2">
          {personalInformation.map((item) => (
            <div key={item.id} className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {item.label}
              </p>

              <p className="font-medium">
                {profile[item.field as keyof typeof profile]}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}