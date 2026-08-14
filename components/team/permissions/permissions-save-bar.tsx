import { Button } from "@/components/ui/button";

interface PermissionsSaveBarProps {
  visible: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export function PermissionsSaveBar({ visible, onSave, onDiscard }: PermissionsSaveBarProps) {
  if (!visible) return null;

  return (
    <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-xl border bg-background shadow-lg p-4">
      <p className="text-sm font-medium">You have unsaved permission changes.</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onDiscard}>
          Discard
        </Button>
        <Button size="sm" onClick={onSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}