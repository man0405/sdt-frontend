import { type LucideIcon } from "lucide-react";

export interface WorkflowStep {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface WorkflowStepsPreviewProps {
  steps: WorkflowStep[];
}

export function WorkflowStepsPreview({ steps }: WorkflowStepsPreviewProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-1 shrink-0">
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1">
            <step.icon className="size-3.5 text-muted-foreground" />
            <span className="text-[11px] font-medium whitespace-nowrap">
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="h-px w-3 bg-border shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}