import { Button } from "@/components/ui/button";
import { Pencil, Share2,Copy,
  Mail,
  BadgeCheck, } from "lucide-react";

interface ProfileHeaderProps {
  onEdit?: () => void;
}

import {
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileHeader({
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your personal information, profile settings, and account details.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuItem>
      <Copy className="mr-2 h-4 w-4" />
      Copy Profile Link
    </DropdownMenuItem>

    <DropdownMenuItem>
      <Mail className="mr-2 h-4 w-4" />
      Share via Email
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem>
      <FaXTwitter className="mr-2 h-4 w-4" />
      Share on X
    </DropdownMenuItem>

    <DropdownMenuItem>
      <FaLinkedin className="mr-2 h-4 w-4" />
      Share on LinkedIn
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem>
      <BadgeCheck className="mr-2 h-4 w-4" />
      Copy User ID
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        <Button onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
        </Button>
      </div>
    </div>
  );
}