"use client";

import { Bot, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ChatRole } from "../types";

interface MessageAvatarProps {
  role: ChatRole;
}

export function MessageAvatar({
  role,
}: MessageAvatarProps) {
  const isUser = role === "user";

  return (
    <Avatar className="h-9 w-9">
      <AvatarFallback>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </AvatarFallback>
    </Avatar>
  );
}