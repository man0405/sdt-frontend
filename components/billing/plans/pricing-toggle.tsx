"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  billing: "monthly" | "yearly";
  setBilling: (value: "monthly" | "yearly") => void;
}

export default function PricingToggle({
  billing,
  setBilling,
}: Props) {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        value={billing}
        onValueChange={(value) => {
          if (value) setBilling(value as "monthly" | "yearly");
        }}
      >
        <ToggleGroupItem value="monthly">
          Monthly
        </ToggleGroupItem>

        <ToggleGroupItem value="yearly">
          Yearly
          <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Save 20%
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}