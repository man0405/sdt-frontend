"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import { invoices } from "../mock-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const config = {
    paid: { label: "Paid", className: "bg-emerald-500/10 text-emerald-600" },
    pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600" },
    failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
  }[status];

  return (
    <Badge variant="secondary" className={`gap-1 border-0 text-[10px] ${config.className}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}

export default function RecentInvoices() {
  const handleDownload = (invoiceId: string) => {
    // Replace with real PDF fetch/download once wired to backend
    console.log("downloading invoice", invoiceId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your latest billing history.</CardDescription>
        </div>

        <Link
          href="/billing/invoices"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            No invoices yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {invoices.slice(0, 5).map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-accent/50">
                  <TableCell className="font-medium">
                    {invoice.invoiceNo}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="font-medium">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => handleDownload(invoice.id)}
                    >
                      <Download className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}