"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  code: string;
  language?: string;
}

export function CodeBlock({
  code,
  language,
}: Props) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
        <span className="text-xs uppercase">
          {language || "text"}
        </span>

        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(code)
          }
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}