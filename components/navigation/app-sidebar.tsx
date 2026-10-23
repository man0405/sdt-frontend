"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import AppLogo from "@/components/layout/app-logo";
import { NavMain } from "./nav-main";
import { SidebarToggle } from "./SidebarToggle";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { clearSession } from "@/lib/feedback-api";

export default function AppSidebar() {
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace("/sign-in");
  }

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="h-16 p-0 bg-background dark:bg-muted/10">

        {/* Expanded */}
        <div className="flex h-full items-center justify-between px-4 group-data-[collapsible=icon]:hidden">
          <AppLogo />

          <div className="flex items-center gap-1">
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
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Đăng xuất"
              className="h-10 text-destructive hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:justify-center"
              onClick={logout}
            >
              <LogOut />
              <span className="group-data-[collapsible=icon]:hidden">Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
