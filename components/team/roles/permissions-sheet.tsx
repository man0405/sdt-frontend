"use client";

import { permissionGroups } from "./mock-data";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

interface PermissionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PermissionsSheet({
  open,
  onOpenChange,
}: PermissionsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
        {/* Header */}
        <SheetHeader className="shrink-0 border-b px-6 py-5">
          <SheetTitle>Role Permissions</SheetTitle>
          <SheetDescription>
            Permissions assigned to this role.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {permissionGroups.map((group) => (
            <div key={group.title} className="rounded-lg border p-4">
              <h3 className="mb-4 font-semibold">{group.title}</h3>

              <div className="flex flex-wrap gap-2">
                {group.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}