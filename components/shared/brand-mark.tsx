import { MessageSquareText } from "lucide-react";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "compact" | "regular";
  className?: string;
}

const sizes = {
  compact: {
    container: "h-9 w-9 rounded-lg",
    icon: "h-5 w-5",
  },
  regular: {
    container: "h-12 w-12 rounded-xl",
    icon: "h-6 w-6",
  },
};

export function BrandMark({
  size = "regular",
  className,
}: BrandMarkProps) {
  const styles = sizes[size];

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-teal-700 text-white shadow-sm dark:bg-teal-600",
        styles.container,
        className,
      )}
      aria-hidden="true"
    >
      <MessageSquareText className={styles.icon} strokeWidth={2.25} />
    </div>
  );
}
