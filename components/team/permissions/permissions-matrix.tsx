"use client";

import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { TeamRole } from "@/components/team/members/role-badge";

export interface Permission {
  id: string;
  label: string;
  description: string;
}

export interface PermissionCategory {
  id: string;
  label: string;
  permissions: Permission[];
}

export type EditableRole = Exclude<TeamRole, "owner">;
export type PermissionsMap = Record<string, Record<EditableRole, boolean>>;

interface PermissionsMatrixProps {
  categories: PermissionCategory[];
  permissions: PermissionsMap;
  onToggle: (permissionId: string, role: EditableRole) => void;
}

const roles: EditableRole[] = ["admin", "member", "viewer"];
const roleLabels: Record<EditableRole, string> = {
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

export function PermissionsMatrix({
  categories,
  permissions,
  onToggle,
}: PermissionsMatrixProps) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-[1fr_80px_80px_80px_90px] gap-2 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground">
        <span>Permission</span>
        {roles.map((role) => (
          <span key={role} className="text-center">
            {roleLabels[role]}
          </span>
        ))}
        <span className="text-center">Owner</span>
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <div className="px-4 py-2 bg-muted/20 border-t">
            <p className="text-xs font-semibold text-muted-foreground">
              {category.label}
            </p>
          </div>

          <div className="divide-y">
            {category.permissions.map((perm) => (
              <div
                key={perm.id}
                className="grid grid-cols-[1fr_80px_80px_80px_90px] gap-2 items-center px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{perm.label}</p>
                  <p className="text-xs text-muted-foreground">{perm.description}</p>
                </div>

                {roles.map((role) => (
                  <div key={role} className="flex justify-center">
                    <Switch
                      checked={permissions[perm.id]?.[role] ?? false}
                      onCheckedChange={() => onToggle(perm.id, role)}
                    />
                  </div>
                ))}

                <div className="flex justify-center">
                  <Check className="size-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}