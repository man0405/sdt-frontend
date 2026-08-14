"use client";

import { MoreHorizontal, Pencil, Trash2, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CardBrandIcon } from "./card-brand-icon";

export interface PaymentMethod {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "discover";
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  holderName: string;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PaymentMethodCard({
  method,
  onSetDefault,
  onEdit,
  onDelete,
}: PaymentMethodCardProps) {
  return (
    <Card className="rounded-xl">
      <CardContent className="flex items-center gap-4 pt-5">
        <CardBrandIcon brand={method.brand} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              •••• •••• •••• {method.last4}
            </p>
            {method.isDefault && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
                <Star className="size-3 fill-current" />
                Default
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {method.holderName} · Expires {method.expiryMonth}/{method.expiryYear}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 shrink-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
            {!method.isDefault && (
              <DropdownMenuItem
                className="gap-2 rounded-lg h-9"
                onClick={() => onSetDefault?.(method.id)}
              >
                <Star className="size-4" />
                Set as default
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9"
              onClick={() => onEdit?.(method.id)}
            >
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="gap-2 rounded-lg h-9 text-destructive focus:text-destructive"
              onClick={() => onDelete?.(method.id)}
            >
              <Trash2 className="size-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}