"use client";

import {
  FileCode2,
  FileSpreadsheet,
  FileText,
  FileType2,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  documents,
  Document,
} from "./mock-data";

import DocumentActions from "./document-actions";
import DocumentStatusBadge from "./document-status-badge";

function FileIcon(type: Document["type"]) {
  switch (type) {
    case "PDF":
    case "DOCX":
      return <FileText className="size-5 text-muted-foreground" />;

    case "CSV":
    case "XLSX":
      return <FileSpreadsheet className="size-5 text-muted-foreground" />;

    case "JSON":
      return <FileCode2 className="size-5 text-muted-foreground" />;

    default:
      return <FileType2 className="size-5 text-muted-foreground" />;
  }
}

export default function DocumentsTable() {
  return (
    <Card>
      <CardContent className="p-0">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Document</TableHead>

              <TableHead>Type</TableHead>

              <TableHead>Size</TableHead>

              <TableHead>Uploaded</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">
                Actions
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {documents.map((doc) => (

              <TableRow key={doc.id}>

                <TableCell>

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {FileIcon(doc.type)}
                    </div>

                    <div>

                      <p className="font-medium">
                        {doc.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {doc.uploadedBy}
                      </p>

                    </div>

                  </div>

                </TableCell>

                <TableCell>{doc.type}</TableCell>

                <TableCell>{doc.size}</TableCell>

                <TableCell>{doc.uploadedAt}</TableCell>

                <TableCell>
                  <DocumentStatusBadge
                    status={doc.status}
                  />
                </TableCell>

                <TableCell className="text-right">
                  <DocumentActions />
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </CardContent>
    </Card>
  );
}