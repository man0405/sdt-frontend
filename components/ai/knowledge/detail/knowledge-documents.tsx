"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  MoreHorizontal,
  Search,
  Trash2,
  Download,
  RefreshCw,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface KnowledgeDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "ready" | "indexing" | "error";
  updatedAt: string;
}

interface KnowledgeDocumentsProps {
  documents: KnowledgeDocument[];
  onUpload?: () => void;
}

export function KnowledgeDocuments({
  documents,
  onUpload,
}: KnowledgeDocumentsProps) {
  const [search, setSearch] = useState("");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>Documents</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage files used by this knowledge base.
          </p>
        </div>

        <Button onClick={onUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-14">
            <FileText className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-medium">No documents found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Upload your first document to start building this knowledge base.
            </p>

            <Button className="mt-6" onClick={onUpload}>
              Upload Document
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">
                    Document
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Type
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Size
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left font-medium">
                    Updated
                  </th>

                  <th className="w-12"></th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-t hover:bg-muted/40 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />

                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4 uppercase text-muted-foreground">
                      {doc.type}
                    </td>

                    <td className="px-4 py-4">
                      {doc.size}
                    </td>

                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          doc.status === "ready"
                            ? "default"
                            : doc.status === "indexing"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </td>

                    <td className="px-4 py-4 text-muted-foreground">
                      {doc.updatedAt}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Re-index
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}