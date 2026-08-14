"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HelpSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HelpSearch({ value, onChange }: HelpSearchProps) {
  return (
    <div className="relative max-w-xl mx-auto w-full">
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search for help articles, guides, and FAQs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-11 text-base rounded-xl"
      />
    </div>
  );
}