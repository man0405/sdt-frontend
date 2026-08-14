"use client";

import { Users } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const workspaceSizes = [
  {
    value: "1",
    label: "Just me",
    description: "Single user workspace",
  },
  {
    value: "2-10",
    label: "2 - 10",
    description: "Small team",
  },
  {
    value: "11-50",
    label: "11 - 50",
    description: "Growing business",
  },
  {
    value: "51-200",
    label: "51 - 200",
    description: "Medium organization",
  },
  {
    value: "201-500",
    label: "201 - 500",
    description: "Large company",
  },
  {
    value: "500+",
    label: "500+",
    description: "Enterprise",
  },
] as const;

interface WorkspaceSizeSelectProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function WorkspaceSizeSelect({
  value,
  disabled = false,
  onChange,
}: WorkspaceSizeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="workspace-size">
        Team Size
      </Label>

      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id="workspace-size" className="w-full">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select your team size" />
          </div>
        </SelectTrigger>

        <SelectContent className="p-2">
          {workspaceSizes.map((size) => (
            <SelectItem
              key={size.value}
              value={size.value}
            >
              <div className="flex flex-col">
                <span>{size.label}</span>
                <span className="text-xs text-muted-foreground">
                  {size.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-xs text-muted-foreground">
        This helps us tailor your workspace experience.
      </p>
    </div>
  );
}