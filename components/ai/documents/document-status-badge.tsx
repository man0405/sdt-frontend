"use client";

import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

type Status =
  | "embedded"
  | "processing"
  | "queued"
  | "failed";

interface Props {
  status: Status;
}

export default function DocumentStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "embedded":
      return (
        <Badge
          variant="secondary"
          className="gap-1.5"
        >
          <CheckCircle2 className="size-3.5" />
          Embedded
        </Badge>
      );

    case "processing":
      return (
        <Badge
          variant="secondary"
          className="gap-1.5"
        >
          <LoaderCircle className="size-3.5 animate-spin" />
          Processing
        </Badge>
      );

    case "queued":
      return (
        <Badge
          variant="outline"
          className="gap-1.5"
        >
          <Clock3 className="size-3.5" />
          Queued
        </Badge>
      );

    case "failed":
      return (
        <Badge
          variant="destructive"
          className="gap-1.5"
        >
          <XCircle className="size-3.5" />
          Failed
        </Badge>
      );

    default:
      return null;
  }
}