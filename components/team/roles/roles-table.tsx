"use client";

import { useMemo, useState } from "react";

import {
  Download,
  MoreHorizontal,
  Pencil,
  Search,
  Shield,
  Trash2,
  Eye,
  X,
} from "lucide-react";

import { roles } from "./mock-data";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RolesTableProps {
  onViewPermissions: () => void;
  onEditRole: () => void;
}

export default function RolesTable({
  onViewPermissions,
  onEditRole,
}: RolesTableProps) {
  const [query, setQuery] = useState("");

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roles;

    return roles.filter((role) => {
      return (
        role.name.toLowerCase().includes(q) ||
        role.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <Card>
      <CardContent>
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search roles..."
              className="pl-9 pr-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <Button variant="outline">
            <Download className="size-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No roles found for &quot;{query}&quot;
                </TableCell>
              </TableRow>
            ) : (
              filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Shield className="size-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{role.name}</p>

                          {role.system && (
                            <Badge variant="secondary">System</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs text-muted-foreground">
                    {role.description}
                  </TableCell>

                  <TableCell>{role.members}</TableCell>

                  <TableCell>{role.permissions}</TableCell>

                  <TableCell>{role.createdAt}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onViewPermissions}>
                          <Eye className="size-4" />
                          View Permissions
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={onEditRole}>
                          <Pencil className="size-4" />
                          Edit Role
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="size-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}