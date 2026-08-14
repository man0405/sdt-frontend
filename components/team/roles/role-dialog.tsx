"use client";

import { useEffect, useMemo, useState } from "react";
import { permissionGroups } from "./mock-data";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: {
    name?: string;
    description?: string;
    permissions?: string[];
  };
  onSubmit?: (data: {
    name: string;
    description: string;
    permissions: string[];
  }) => void;
}

const allPermissions = permissionGroups.flatMap((g) => g.permissions);

export default function RoleDialog({
  open,
  onOpenChange,
  mode = "create",
  initialData,
  onSubmit,
}: RoleDialogProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialData?.permissions ?? [])
  );

  // Reset form whenever the dialog is (re)opened
  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? "");
      setDescription(initialData?.description ?? "");
      setSelected(new Set(initialData?.permissions ?? []));
    }
  }, [open, initialData]);

  const allSelected = selected.size === allPermissions.length;
  const someSelected = selected.size > 0 && !allSelected;

  const togglePermission = (permission: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(permission);
      else next.delete(permission);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(allPermissions) : new Set());
  };

  const handleSubmit = () => {
    onSubmit?.({
      name,
      description,
      permissions: Array.from(selected),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 flex max-h-[85vh] flex-col gap-0">
        {/* Header */}
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle>
            {mode === "create" ? "Create Role" : "Edit Role"}
          </DialogTitle>
          <DialogDescription>
            Configure role information and assign permissions.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                placeholder="Developer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input
                id="role-description"
                placeholder="Can manage AI resources"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Choose which modules this role can access.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(checked) => toggleAll(checked === true)}
              />
              <Label htmlFor="select-all" className="cursor-pointer">
                Select All
              </Label>
            </div>
          </div>

          <div className="space-y-6">
            {permissionGroups.map((group) => (
              <div key={group.title} className="border-b pb-6 last:border-none">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Checkbox
                        id={permission}
                        checked={selected.has(permission)}
                        onCheckedChange={(checked) =>
                          togglePermission(permission, checked === true)
                        }
                      />
                      <Label htmlFor={permission} className="cursor-pointer font-normal">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="shrink-0 border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {mode === "create" ? "Create Role" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}