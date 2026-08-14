"use client";

import AppLogo from "@/components/layout/app-logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SearchTrigger } from "./search-trigger";
import { SidebarToggle } from "./SidebarToggle";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Alex Martin",
    email: "alex@example.com",
    avatar: "https://untitledui.com/images/avatars/belle-woods",
  },
};

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="h-16 p-0 bg-background dark:bg-muted/10">

        {/* Expanded */}
        <div className="flex h-full items-center justify-between px-4 group-data-[collapsible=icon]:hidden">
          <AppLogo />

          <div className="flex items-center gap-1">
             <SearchTrigger />
            <SidebarToggle />
          </div>
        </div>

        {/* Collapsed */}
        <div className="hidden h-full items-center justify-center group-data-[collapsible=icon]:flex">
          <SidebarToggle />
        </div>

      </SidebarHeader>

      <SidebarContent className="p-0 group-data-[collapsible=icon]:px-0 bg-background dark:bg-muted/10">
        <ScrollArea className="h-full [&>div>div]:!block">
          <div className="px-2">
            <NavMain />
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t p-0 bg-background dark:bg-muted">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}