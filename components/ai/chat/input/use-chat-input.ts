"use client";

import { useCallback, useRef, useState } from "react";

export interface ChatAttachment {
  id: string;
  file: File;
  preview?: string;
}

export function useChatInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [attachments, setAttachments] = useState<
    ChatAttachment[]
  >([]);

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      240
    )}px`;
  }, []);

  const clearInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files);

      const next: ChatAttachment[] = list.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setAttachments((prev) => [...prev, ...next]);
    },
    []
  );

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((item) => item.id === id);

      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const clearAttachments = () => {
    attachments.forEach((item) => {
      if (item.preview) {
        URL.revokeObjectURL(item.preview);
      }
    });

    setAttachments([]);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    addFiles(e.target.files);

    e.target.value = "";
  };

  const openFiles = () => {
    fileInputRef.current?.click();
  };

  const openImages = () => {
    imageInputRef.current?.click();
  };

  return {
    textareaRef,

    attachments,

    fileInputRef,
    imageInputRef,

    addFiles,

    removeAttachment,

    clearAttachments,

    clearInput,

    autoResize,

    handleFileChange,

    openFiles,

    openImages,
  };
}