"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterValue = "all" | "ready" | "indexing" | "error";

interface KnowledgeFilterBarProps {
  filter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function KnowledgeFilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: KnowledgeFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Tabs value={filter} onValueChange={(v) => onFilterChange(v as FilterValue)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="indexing">Indexing</TabsTrigger>
          <TabsTrigger value="error">Error</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search knowledge bases..."
          className="pl-9"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}