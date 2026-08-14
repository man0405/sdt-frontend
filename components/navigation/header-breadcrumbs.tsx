"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { navigation } from "@/config/navigation";

interface Crumb {
  title: string;
  href?: string;
}

function getBreadcrumbs(pathname: string): Crumb[] {
  for (const item of navigation) {
    // Exact match on a top-level item
    if (pathname === item.href) {
      return [{ title: item.title }];
    }

    // Match a child route
    if (item.children) {
      const child = item.children.find(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/")
      );
      if (child) {
        return [
          { title: item.title, href: item.href },
          { title: child.title },
        ];
      }
    }

    // Nested path under a parent without exact child match
    if (pathname.startsWith(item.href + "/")) {
      const rest = pathname.replace(item.href + "/", "");
      const segments = rest.split("/").filter(Boolean);

      if (segments.length > 0) {
        return [
          { title: item.title, href: item.href },
          {
            title: segments[segments.length - 1]
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()),
          },
        ];
      }
    }
  }

  return [];
}

export function HeaderBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav className="hidden md:flex items-center gap-1.5 text-sm min-w-0">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;

        return (
          <div key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            )}

            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="truncate text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.title}
              </Link>
            ) : (
              <span
                className={`truncate ${
                  isLast ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {crumb.title}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}