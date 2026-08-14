import { LibraryBig } from "lucide-react";

interface LibraryEmptyStateProps {
  hasFilters: boolean;
}

export function LibraryEmptyState({ hasFilters }: LibraryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <LibraryBig className="size-7 text-primary" />
      </span>

      <h3 className="text-lg font-semibold mb-1">
        {hasFilters ? "No items match your search" : "Your library is empty"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {hasFilters
          ? "Try a different search term or filter."
          : "Everything you generate — images, files, agent outputs — will show up here."}
      </p>
    </div>
  );
}