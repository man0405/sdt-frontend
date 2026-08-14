"use client";

import { ArrowUp, Square } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AttachmentMenu } from "./attachment-menu";
import { AttachmentPreview } from "./attachment-preview";
import { ModelSelector } from "./model-selector";
import { PromptTextarea } from "./prompt-textarea";
import { useChatInput } from "./use-chat-input";

interface ChatInputProps {
  value: string;
  onValueChange: (value: string) => void;

  model: string;
  onModelChange: (model: string) => void;

  onSend: (
    message: string,
    attachments: File[]
  ) => void;

  isGenerating?: boolean;
  onStop?: () => void;
}

export function ChatInput({
  value,
  onValueChange,

  model,
  onModelChange,

  onSend,

  isGenerating = false,

  onStop,
}: ChatInputProps) {
  const {
    textareaRef,

    attachments,

    fileInputRef,
    imageInputRef,

    removeAttachment,

    handleFileChange,

    openFiles,
    openImages,

    clearAttachments,
    clearInput,
  } = useChatInput();

  function handleSend() {
    const text = value.trim();

    if (!text && attachments.length === 0) return;

    onSend(
      text,
      attachments.map((a) => a.file)
    );

    onValueChange("");

    clearInput();

    clearAttachments();
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <AttachmentPreview
          attachments={attachments}
          onRemove={removeAttachment}
        />

        <div className="p-3">
          <PromptTextarea
            ref={textareaRef}
            value={value}
            disabled={isGenerating}
            onChange={onValueChange}
            onSubmit={handleSend}
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AttachmentMenu
                onUploadFiles={openFiles}
                onUploadImages={openImages}
              />

              <ModelSelector
                value={model}
                onChange={onModelChange}
              />
            </div>

            {isGenerating ? (
              <Button
                size="icon"
                variant="destructive"
                className="rounded-full"
                onClick={onStop}
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </Button>
            ) : (
              <Button
                size="icon"
                className="rounded-full"
                disabled={
                  !value.trim() &&
                  attachments.length === 0
                }
                onClick={handleSend}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        AI can make mistakes. Check important information.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}