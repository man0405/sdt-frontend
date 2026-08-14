export interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  permissions: number;
  createdAt: string;
  system: boolean;
}

export interface PermissionGroup {
  title: string;
  permissions: string[];
}

export const roleStats = {
  totalRoles: 5,
  totalMembers: 25,
  customRoles: 2,
  totalPermissions: 48,
};

export const roles: Role[] = [
  {
    id: "1",
    name: "Owner",
    description: "Full access to the workspace",
    members: 1,
    permissions: 48,
    createdAt: "Jan 12, 2026",
    system: true,
  },
  {
    id: "2",
    name: "Admin",
    description: "Manage workspace and members",
    members: 3,
    permissions: 42,
    createdAt: "Jan 15, 2026",
    system: true,
  },
  {
    id: "3",
    name: "Developer",
    description: "Build AI apps and manage resources",
    members: 8,
    permissions: 30,
    createdAt: "Feb 02, 2026",
    system: false,
  },
  {
    id: "4",
    name: "Billing",
    description: "Manage subscription and invoices",
    members: 2,
    permissions: 10,
    createdAt: "Feb 15, 2026",
    system: false,
  },
  {
    id: "5",
    name: "Viewer",
    description: "Read-only workspace access",
    members: 11,
    permissions: 6,
    createdAt: "Mar 08, 2026",
    system: true,
  },
];

export const permissionGroups: PermissionGroup[] = [
  {
    title: "Dashboard",
    permissions: [
      "View Dashboard",
    ],
  },
  {
    title: "AI",
    permissions: [
      "Chat",
      "Agents",
      "Prompts",
      "Workflows",
      "Models",
      "Knowledge",
      "Documents",
    ],
  },
  {
    title: "Workspace",
    permissions: [
      "Projects",
      "Files",
      "Members",
    ],
  },
  {
    title: "Billing",
    permissions: [
      "Overview",
      "Plans",
      "Subscription",
      "Invoices",
      "Usage",
      "API Keys",
    ],
  },
  {
    title: "Team",
    permissions: [
      "Users",
      "Roles",
      "Invitations",
    ],
  },
  {
    title: "Settings",
    permissions: [
      "General",
      "Security",
      "Notifications",
      "Integrations",
    ],
  },
];