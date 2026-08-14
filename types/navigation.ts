import { LucideIcon } from "lucide-react";

export interface NavChildItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  children?: NavChildItem[];
}