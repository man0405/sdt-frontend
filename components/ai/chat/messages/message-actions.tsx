"use client";

import { useState } from "react";
import {
  Check,
  Copy,
 Loader2,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatMessage } from "../types";

interface Props {
  message: ChatMessage;
  onRegenerate: () => Promise<void> | void;
}

export function MessageActions({
  message,
  onRegenerate,
}: Props) {
  const [copied, setCopied] = useState(false);

  const [feedback, setFeedback] = useState<
    "up" | "down" | null
  >(null);

  const [regenerating, setRegenerating] =
    useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(
      message.content
    );

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  async function regenerate() {
    setRegenerating(true);

    await onRegenerate();

    setRegenerating(false);
  }

  return (
    <div className="mt-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">

      {/* Copy */}

      <Button
        variant="ghost"
        size="icon"
        onClick={copyMessage}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>

      {/* Like */}

      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setFeedback(
            feedback === "up"
              ? null
              : "up"
          )
        }
      >
        <ThumbsUp
          className={`h-4 w-4 ${
            feedback === "up"
              ? "fill-green-500 text-green-500"
              : ""
          }`}
        />
      </Button>

      {/* Dislike */}

      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setFeedback(
            feedback === "down"
              ? null
              : "down"
          )
        }
      >
        <ThumbsDown
          className={`h-4 w-4 ${
            feedback === "down"
              ? "fill-red-500 text-red-500"
              : ""
          }`}
        />
      </Button>

      {/* Regenerate */}

      <Button
        variant="ghost"
        size="icon"
        disabled={regenerating}
        onClick={regenerate}
      >
        {regenerating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RotateCcw className="h-4 w-4" />
        )}
      </Button>

    </div>
  );
}