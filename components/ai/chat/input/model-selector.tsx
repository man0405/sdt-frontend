"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const MODELS = [
  {
    value: "claude-sonnet-4",
    label: "Claude Sonnet 4",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o",
  },
  {
    value: "gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
  },
];

export function ModelSelector({
  value,
  onChange,
}: ModelSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-9 w-[180px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem
            key={model.value}
            value={model.value}
          >
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}