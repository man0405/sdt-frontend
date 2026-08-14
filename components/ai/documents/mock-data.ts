export type DocumentStatus =
  | "embedded"
  | "processing"
  | "queued"
  | "failed";

export type DocumentType =
  | "PDF"
  | "DOCX"
  | "TXT"
  | "MD"
  | "CSV"
  | "XLSX"
  | "JSON";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  status: DocumentStatus;
  chunks: number;
}

export const documents: Document[] = [
  {
    id: "1",
    name: "Product Requirements.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2 hours ago",
    uploadedBy: "Alex Martin",
    status: "embedded",
    chunks: 184,
  },
  {
    id: "2",
    name: "Company Handbook.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "5 hours ago",
    uploadedBy: "Virendra Kumar",
    status: "embedded",
    chunks: 126,
  },
  {
    id: "3",
    name: "API Documentation.md",
    type: "MD",
    size: "458 KB",
    uploadedAt: "Yesterday",
    uploadedBy: "John Carter",
    status: "processing",
    chunks: 0,
  },
  {
    id: "4",
    name: "Knowledge Base.csv",
    type: "CSV",
    size: "3.2 MB",
    uploadedAt: "Yesterday",
    uploadedBy: "Alex Martin",
    status: "embedded",
    chunks: 265,
  },
  {
    id: "5",
    name: "Customer FAQ.pdf",
    type: "PDF",
    size: "920 KB",
    uploadedAt: "2 days ago",
    uploadedBy: "Emma Wilson",
    status: "queued",
    chunks: 0,
  },
  {
    id: "6",
    name: "Website Content.txt",
    type: "TXT",
    size: "340 KB",
    uploadedAt: "2 days ago",
    uploadedBy: "Virendra Kumar",
    status: "embedded",
    chunks: 38,
  },
  {
    id: "7",
    name: "Sales Dataset.xlsx",
    type: "XLSX",
    size: "5.8 MB",
    uploadedAt: "3 days ago",
    uploadedBy: "Sophia Brown",
    status: "failed",
    chunks: 0,
  },
  {
    id: "8",
    name: "Training Prompts.json",
    type: "JSON",
    size: "1.2 MB",
    uploadedAt: "4 days ago",
    uploadedBy: "Alex Martin",
    status: "embedded",
    chunks: 94,
  },
  {
    id: "9",
    name: "Pricing Guide.pdf",
    type: "PDF",
    size: "1.5 MB",
    uploadedAt: "Last week",
    uploadedBy: "Virendra Kumar",
    status: "embedded",
    chunks: 73,
  },
  {
    id: "10",
    name: "Support Articles.docx",
    type: "DOCX",
    size: "2.1 MB",
    uploadedAt: "Last week",
    uploadedBy: "Emma Wilson",
    status: "processing",
    chunks: 0,
  },
];

export const documentStats = {
  totalDocuments: documents.length,
  storageUsed: "19.7 GB",
  embedded: documents.filter((d) => d.status === "embedded").length,
  processing: documents.filter((d) => d.status === "processing").length,
  queued: documents.filter((d) => d.status === "queued").length,
  failed: documents.filter((d) => d.status === "failed").length,
};