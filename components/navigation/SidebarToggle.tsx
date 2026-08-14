"use client";

import { PanelLeftClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-md
        hover:bg-accent
        transition-colors
      "
    >
      <PanelLeftClose className="h-5 w-5" />
    </button>
  );
}