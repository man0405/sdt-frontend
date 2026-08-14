"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronsUpDownIcon,
  Sparkles,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
  KeyRound,
  UserPlus,
  Keyboard,
  LifeBuoy,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted [&_svg]:!size-4">
      {children}
    </span>
  );
}

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    plan?: "Free" | "Pro" | "Team";
  };
}) {
  const { isMobile, state } = useSidebar();
  const collapsed = state === "collapsed";

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plan = user.plan ?? "Free";

  // Use resolvedTheme for the icon (handles "system" correctly),
  // but `theme` for the radio group's actual selected value.
  const currentIcon = !mounted
    ? Monitor
    : resolvedTheme === "dark"
    ? Moon
    : Sun;
  const CurrentThemeIcon = currentIcon;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {collapsed ? (
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto">
                <Avatar className="h-9 w-9 rounded-xl">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <button
                className="
                h-16 w-full rounded-0 flex items-center justify-start px-4 hover:bg-muted focus:outline-none
                data-[state=open]:bg-sidebar-accent 
                data-[state=open]:text-sidebar-accent-foreground
              "
              >
                <Avatar className="h-9 w-9 rounded-xl shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>

                <ChevronsUpDownIcon className="ml-auto size-4" />
              </button>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 p-3 rounded-xl shadow-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal border-border rounded-xl border-1 mb-3 bg-muted/50">
              <div className="flex items-center gap-2 text-left text-sm p-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {plan}
                </Badge>
              </div>
            </DropdownMenuLabel>

            {plan !== "Team" && (
              <>
                <DropdownMenuItem className="gap-2 h-auto">
                  <IconBadge>
                    <Sparkles />
                  </IconBadge>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">Upgrade to Pro</span>
                    <span className="text-xs text-muted-foreground">
                      Unlock more AI credits & tools
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
              </>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 h-9">
                <IconBadge>
                  <BadgeCheckIcon />
                </IconBadge>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 h-9">
                <IconBadge>
                  <CreditCardIcon />
                </IconBadge>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 h-9">
                <IconBadge>
                  <KeyRound />
                </IconBadge>
                API Keys
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 h-9">
                <IconBadge>
                  <BellIcon />
                </IconBadge>
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 h-9">
                <IconBadge>
                  <UserPlus />
                </IconBadge>
                Invite team members
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2 h-9">
                <IconBadge>
                  <CurrentThemeIcon />
                </IconBadge>
                Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="p-2 rounded-xl">
                <DropdownMenuRadioGroup
                  value={mounted ? theme : "system"}
                  onValueChange={setTheme}
                >
                  <DropdownMenuRadioItem value="light" className="gap-2 h-9">
                    <Sun className="!size-4" />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark" className="gap-2 h-9">
                    <Moon className="!size-4" />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system" className="gap-2 h-9">
                    <Monitor className="!size-4" />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem className="gap-2 h-9">
              <IconBadge>
                <Keyboard />
              </IconBadge>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 h-9">
              <IconBadge>
                <LifeBuoy />
              </IconBadge>
              Help & support
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem className="gap-2 h-9 text-destructive focus:text-destructive">
              <IconBadge>
                <LogOutIcon />
              </IconBadge>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}