"use client";

import { Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvoiceStatusBadge, type InvoiceStatus } from "./invoice-status-badge";

export interface Invoice {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: InvoiceStatus;
  paymentMethod: string;
  lineItems: { label: string; amount: number }[];
}

interface InvoicesTableProps {
  invoices: Invoice[];
  onRowClick?: (invoice: Invoice) => void;
  onDownload?: (id: string) => void;
}

export function InvoicesTable({ invoices, onRowClick, onDownload }: InvoicesTableProps) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground">
        <span>Invoice</span>
        <span>Date</span>
        <span>Plan</span>
        <span>Amount</span>
        <span className="text-right">Status</span>
      </div>

      <div className="divide-y">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            onClick={() => onRowClick?.(invoice)}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-4 py-3.5 hover:bg-accent/50 transition-colors cursor-pointer group"
          >
            <span className="text-sm font-medium">{invoice.id}</span>
            <span className="text-sm text-muted-foreground">{invoice.date}</span>
            <span className="text-sm">{invoice.plan}</span>
            <span className="text-sm font-medium">${invoice.amount.toFixed(2)}</span>

            <div className="flex items-center gap-1 justify-end">
              <InvoiceStatusBadge status={invoice.status} />
              <Button
                variant="ghost"
                size="icon"
                className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload?.(invoice.id);
                }}
              >
                <Download className="size-3.5" />
              </Button>
              <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}