"use client";

import { forwardRef, useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";

interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const PromptTextarea = forwardRef<
  HTMLTextAreaElement,
  PromptTextareaProps
>(
  (
    {
      value,
      onChange,
      onSubmit,
      disabled,
      placeholder = "Message Orbit AI...",
      className,
    },
    ref
  ) => {
    useEffect(() => {
      if (
        ref &&
        typeof ref !== "function" &&
        ref.current
      ) {
        ref.current.style.height = "0px";
        ref.current.style.height = `${Math.min(
          ref.current.scrollHeight,
          240
        )}px`;
      }
    }, [value, ref]);

    return (
      <Textarea
        ref={ref}
        rows={1}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={[
          "max-h-[240px] min-h-[24px] resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
    );
  }
);

PromptTextarea.displayName = "PromptTextarea";