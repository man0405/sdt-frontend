"use client";

import { MessageCircleCheck } from "lucide-react";
import Link from "next/link";

export default function AppLogo() {
  return (
    <Link
      href="/dashboard"
      className="
        flex
        items-center px-2
        gap-3
        group-data-[collapsible=icon]:justify-center
      "
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f766e] text-white">
        <MessageCircleCheck className="h-5 w-5" />
      </div>

      <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
        SDT
      </span>
    </Link>
  );
}
