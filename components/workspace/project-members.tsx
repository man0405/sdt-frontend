"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface ProjectMembersProps {
  members: Member[];
  max?: number;
}

export function ProjectMembers({
  members,
  max = 4,
}: ProjectMembersProps) {
  const visibleMembers = members.slice(0, max);
  const remaining = members.length - max;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center -space-x-3">

        {visibleMembers.map((member) => (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer border-2 border-background transition-transform duration-200 hover:z-10 hover:scale-110">
                <AvatarImage
                  src={member.avatar}
                  alt={member.name}
                />

                <AvatarFallback className="text-xs font-medium">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>

            <TooltipContent side="top">
              {member.name}
            </TooltipContent>
          </Tooltip>
        ))}

        {remaining > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold transition-transform hover:scale-110">
                +{remaining}
              </div>
            </TooltipTrigger>

            <TooltipContent side="top">
              {remaining} more members
            </TooltipContent>
          </Tooltip>
        )}

      </div>
    </TooltipProvider>
  );
}