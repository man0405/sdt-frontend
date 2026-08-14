"use client";

import {
    Clock,
    CreditCard,
    FileText,
    Folder,
    HelpCircle,
    Image as ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Mic,
    Moon,
    Plus,
    Settings,
    Sun,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder="Search or ask AI anything..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick actions">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/chat/new"))}
            >
              <Plus />
              <span>New chat</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/image/new"))}
            >
              <ImageIcon />
              <span>Generate image</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/workspace/new"))}
            >
              <Folder />
              <span>New workspace</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="AI tools">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/chat"))}
            >
              <MessageSquare />
              <span>AI Chat</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/image"))}
            >
              <ImageIcon />
              <span>Image Generation</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/documents"))}
            >
              <FileText />
              <span>Document Q&A</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/ai/voice"))}
            >
              <Mic />
              <span>Voice Assistant</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/workspace"))}
            >
              <Folder />
              <span>Workspace</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/billing"))}
            >
              <CreditCard />
              <span>Billing</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/team"))}
            >
              <Users />
              <span>Team</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/settings"))}
            >
              <Settings />
              <span>Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/help"))}
            >
              <HelpCircle />
              <span>Help & Support</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Recent">
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/ai/chat/collapsible-sidebar-nav")
                )
              }
            >
              <Clock />
              <span>Collapsible sidebar navigation</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/ai/chat/sdt-front-end")
                )
              }
            >
              <Clock />
              <span>AI SaaS starter kit planning</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/ai/chat/web-template-pricing")
                )
              }
            >
              <Clock />
              <span>Web template pricing structure</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Preferences">
            <CommandItem onSelect={() => runCommand(() => {})}>
              <Sun />
              <span>Light mode</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {})}>
              <Moon />
              <span>Dark mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}