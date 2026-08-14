"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Building2,
  Bell,
  Shield,
  Plug,
  KeyRound,
  Palette,
} from "lucide-react";

const navItems = [
  { href: "/settings/general", label: "General", icon: User },
  { href: "/settings/workspace", label: "Workspace", icon: Building2 },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/security", label: "Security", icon: Shield },
  { href: "/settings/integrations", label: "Integrations", icon: Plug },
  { href: "/settings/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/settings/branding", label: "Branding", icon: Palette },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors shrink-0 ${
              isActive
                ? "bg-accent text-foreground font-medium"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}