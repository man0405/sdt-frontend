"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DocumentPreviewSheet({
  open,
  onOpenChange,
}: Props) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="sm:max-w-2xl">

        <SheetHeader>

          <SheetTitle>
            Document Preview
          </SheetTitle>

        </SheetHeader>

        <div className="mt-6 flex h-full items-center justify-center rounded-lg border border-dashed">
          Preview Coming Soon
        </div>

      </SheetContent>
    </Sheet>
  );
}