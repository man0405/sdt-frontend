"use client";

import { Download } from "lucide-react";

import { invoices } from "../mock-data";

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
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PaymentHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>

        <CardDescription>
          Recent successful payments.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">

        <Table>

          <TableHeader>

            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead />
            </TableRow>

          </TableHeader>

          <TableBody>

            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.invoiceNo}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>

                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                  >
                    <Download className="size-4" />
                  </Button>
                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </CardContent>
    </Card>
  );
}