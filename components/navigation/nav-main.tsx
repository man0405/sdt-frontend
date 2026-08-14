"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { navigation } from "@/config/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2 group-data-[collapsible=icon]:items-center">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            const hasChildren = !!item.children?.length;

            const isChildActive = item.children?.some(
              (child) => pathname === child.href
            );

            // No children: render a plain link item
            if (!hasChildren) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="
                      h-9
                      rounded-md
                      [&_svg]:!h-5
                      [&_svg]:!w-5
                      group-data-[collapsible=icon]:!h-9
                      group-data-[collapsible=icon]:!w-9
                      group-data-[collapsible=icon]:!p-0
                      group-data-[collapsible=icon]:justify-center
                      group-data-[collapsible=icon]:mx-auto
                    "
                  >
                    <Link href={item.href}>
                      <Icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            // Has children: render as a collapsible group
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive || isChildActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="
                        h-9
                        rounded-md
                        [&_svg]:!h-5
                        [&_svg]:!w-5
                        group-data-[collapsible=icon]:!h-9
                        group-data-[collapsible=icon]:!w-9
                        group-data-[collapsible=icon]:!p-0
                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:mx-auto
                      "
                    >
                      <Icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      <ChevronRight
                        className="
                          ml-auto
                          !h-4 !w-4
                          transition-transform duration-200
                          group-data-[state=open]/collapsible:rotate-90
                          group-data-[collapsible=icon]:hidden
                        "
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children!.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === child.href}
                            className="rounded-md"
                          >
                            <Link href={child.href}>
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}