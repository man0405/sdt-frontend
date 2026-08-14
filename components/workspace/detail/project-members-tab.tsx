"use client";

import { UserPlus, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "Owner" | "Editor" | "Viewer";
}

const members: ProjectMember[] = [
  { id: "1", name: "Alex Martin", email: "alex@example.com", role: "Owner" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "Editor" },
];

export function ProjectMembersTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5">
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </div>

      <div className="flex flex-col divide-y rounded-xl border">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">{member.email}</p>
            </div>
            <Badge variant="secondary" className="text-[10px] shrink-0">
              {member.role}
            </Badge>

            {member.role !== "Owner" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8 shrink-0">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 rounded-xl p-1.5">
                  <DropdownMenuItem className="rounded-lg h-9">
                    Change role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg h-9 text-destructive focus:text-destructive">
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}