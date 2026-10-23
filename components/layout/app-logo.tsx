"use client";

import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";

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
      <BrandMark size="compact" className="transition-transform group-hover:scale-105" />

      <span className="text-sm font-semibold leading-tight group-data-[collapsible=icon]:hidden">
        SDT
      </span>
    </Link>
  );
}
