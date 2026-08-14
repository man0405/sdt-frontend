import Link from "next/link";
import { type LucideIcon, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HelpCategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  articleCount: number;
  href: string;
}

export function HelpCategoryCard({
  icon: Icon,
  title,
  description,
  articleCount,
  href,
}: HelpCategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="rounded-xl h-full hover:border-foreground/20 transition-colors group">
        <CardContent className="flex items-start gap-3 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="size-5 text-primary" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {articleCount} articles
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardContent>
      </Card>
    </Link>
  );
}