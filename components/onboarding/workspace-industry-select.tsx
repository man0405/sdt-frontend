"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const industries = [
  "Artificial Intelligence",
  "Software & Technology",
  "SaaS",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Real Estate",
  "Manufacturing",
  "Media & Entertainment",
  "Travel & Hospitality",
  "Retail",
  "Logistics",
  "Consulting",
  "Gaming",
  "Cybersecurity",
  "Government",
  "Non-profit",
  "Other",
] as const;

interface WorkspaceIndustrySelectProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function WorkspaceIndustrySelect({
  value,
  disabled = false,
  onChange,
}: WorkspaceIndustrySelectProps) {
  return (
    <div className="space-y-2">
      <Label>Industry</Label>

      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an industry" />
        </SelectTrigger>

        <SelectContent className="p-2">
          {industries.map((industry) => (
            <SelectItem
              key={industry}
              value={industry}
            >
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-xs text-muted-foreground">
        This helps personalize your workspace experience.
      </p>
    </div>
  );
}