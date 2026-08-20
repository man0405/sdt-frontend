"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Eye, ImagePlus, Loader2, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ApiError,
  type FeedbackDetail,
  type FeedbackAttachment,
  type FeedbackStatus,
  type FeedbackUpdateRequest,
  deleteFeedback,
  deleteFeedbackAttachment,
  downloadFeedbackAttachment,
  formatDateTime,
  getFeedbackDetail,
  getFeedbackAttachments,
  priorityLabels,
  sentimentLabels,
  sourceLabels,
  statusLabels,
  updateFeedback,
  uploadFeedbackAttachment,
} from "@/lib/feedback-api";

type EditableFeedback = {
  title: string;
  content: string;
  authorName: string;
  authorContact: string;
  location: string;
  category: string;
  status: FeedbackStatus;
};

const emptyForm: EditableFeedback = {
  title: "",
  content: "",
  authorName: "",
  authorContact: "",
  location: "",
  category: "",
  status: "PENDING_ANALYSIS",
};

function toForm(feedback: FeedbackDetail): EditableFeedback {
  return {
    title: feedback.title ?? "",
    content: feedback.content,
    authorName: feedback.authorName ?? "",
    authorContact: feedback.authorContact ?? "",
    location: feedback.location ?? "",
    category: feedback.category ?? "",
    status: feedback.status,
  };
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.message : fallback;
}

export function FeedbackDetailDialog({
  feedbackId,
  categories,
  onOpenChange,
  onChanged,
}: {
  feedbackId: string;
  categories: string[];
  onOpenChange: (open: boolean) => void;
  onChanged: (message: string) => void;
}) {
  const [feedback, setFeedback] = useState<FeedbackDetail | null>(null);
  const [form, setForm] = useState<EditableFeedback>(emptyForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [attachments, setAttachments] = useState<FeedbackAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [viewingAttachmentId, setViewingAttachmentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    if (!form.category || categories.includes(form.category)) return categories;
    return [form.category, ...categories];
  }, [categories, form.category]);

  useEffect(() => {
    const controller = new AbortController();
    getFeedbackDetail(feedbackId, controller.signal)
      .then((nextFeedback) => {
        setFeedback(nextFeedback);
        setForm(toForm(nextFeedback));
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(errorMessage(requestError, "Không thể tải chi tiết phản hồi."));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    getFeedbackAttachments(feedbackId, controller.signal)
      .then(setAttachments)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(errorMessage(requestError, "Không thể tải ảnh đính kèm."));
      });

    return () => controller.abort();
  }, [feedbackId]);

  function updateField<K extends keyof EditableFeedback>(field: K, value: EditableFeedback[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function cancelEditing() {
    if (feedback) setForm(toForm(feedback));
    setEditing(false);
    setError(null);
  }

  async function saveFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!feedback) return;

    const original = toForm(feedback);
    const payload: FeedbackUpdateRequest = {};
    const textFields = [
      "title",
      "content",
      "authorName",
      "authorContact",
      "location",
      "category",
    ] as const;

    for (const field of textFields) {
      if (form[field] === original[field]) continue;
      const value = form[field].trim();
      if (!value) {
        setError("Backend không hỗ trợ cập nhật trường văn bản thành giá trị trống.");
        return;
      }
      payload[field] = value;
    }
    if (form.status !== original.status) payload.status = form.status;

    if (Object.keys(payload).length === 0) {
      setError("Chưa có thay đổi để lưu.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const updated = await updateFeedback(feedback.id, payload);
      setFeedback(updated);
      setForm(toForm(updated));
      setEditing(false);
      onChanged("Đã cập nhật phản hồi.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Không thể cập nhật phản hồi."));
    } finally {
      setSaving(false);
    }
  }

  async function removeFeedback() {
    if (!feedback) return;
    const confirmed = window.confirm("Xóa vĩnh viễn phản hồi này? Hành động này không thể hoàn tác.");
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    try {
      await deleteFeedback(feedback.id);
      onOpenChange(false);
      onChanged("Đã xóa phản hồi.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Không thể xóa phản hồi."));
    } finally {
      setDeleting(false);
    }
  }

  async function addAttachment(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !feedback) return;

    setUploading(true);
    setError(null);
    try {
      const attachment = await uploadFeedbackAttachment(feedback.id, file);
      setAttachments((current) => [...current, attachment]);
      onChanged("Đã tải ảnh đính kèm.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Không thể tải ảnh lên."));
    } finally {
      setUploading(false);
    }
  }

  async function viewAttachment(attachment: FeedbackAttachment) {
    if (!feedback) return;
    setViewingAttachmentId(attachment.id);
    setError(null);
    try {
      const image = await downloadFeedbackAttachment(feedback.id, attachment.id);
      const url = URL.createObjectURL(image);
      const preview = window.open(url, "_blank", "noopener,noreferrer");
      if (!preview) throw new Error("Popup blocked");
      preview.addEventListener("load", () => URL.revokeObjectURL(url), { once: true });
    } catch (requestError) {
      setError(errorMessage(requestError, "Không thể mở ảnh."));
    } finally {
      setViewingAttachmentId(null);
    }
  }

  async function removeAttachment(attachment: FeedbackAttachment) {
    if (!feedback || !window.confirm(`Xóa ảnh ${attachment.originalFilename}?`)) return;
    setError(null);
    try {
      await deleteFeedbackAttachment(feedback.id, attachment.id);
      setAttachments((current) => current.filter((item) => item.id !== attachment.id));
      onChanged("Đã xóa ảnh đính kèm.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Không thể xóa ảnh."));
    }
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Chi tiết phản hồi</DialogTitle>
          <DialogDescription className="break-all">
            {feedbackId ?? "Đang tải mã phản hồi..."}
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex min-h-52 items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Đang tải chi tiết...
          </div>
        )}

        {!loading && error && !feedback && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
            {error}
          </div>
        )}

        {!loading && feedback && !editing && (
          <div className="space-y-5">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{feedback.title || "Không có tiêu đề"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Tạo lúc {formatDateTime(feedback.createdAt)}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                  {statusLabels[feedback.status]}
                </span>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6">{feedback.content}</p>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Người gửi" value={feedback.authorName} />
              <DetailItem label="Liên hệ" value={feedback.authorContact} />
              <DetailItem label="Địa điểm" value={feedback.location} />
              <DetailItem label="Chủ đề" value={feedback.category} />
              <DetailItem label="Nguồn" value={sourceLabels[feedback.rawFeedback.source]} />
              <DetailItem label="Mã nguồn" value={feedback.rawFeedback.sourceRef} />
              <DetailItem label="Cập nhật" value={formatDateTime(feedback.updatedAt)} />
              <DetailItem label="Đã giải quyết" value={feedback.resolvedAt ? formatDateTime(feedback.resolvedAt) : null} />
            </dl>

            <div className="rounded-2xl border p-4">
              <h3 className="font-semibold">Phân tích gần nhất</h3>
              {feedback.latestAnalysis ? (
                <dl className="mt-3 grid gap-4 sm:grid-cols-2">
                  <DetailItem label="Cảm xúc" value={feedback.latestAnalysis.sentiment ? sentimentLabels[feedback.latestAnalysis.sentiment] : null} />
                  <DetailItem label="Ưu tiên" value={feedback.latestAnalysis.priority ? priorityLabels[feedback.latestAnalysis.priority] : null} />
                  <DetailItem label="Chủ đề AI" value={feedback.latestAnalysis.category} />
                  <DetailItem label="Lý do ưu tiên" value={feedback.latestAnalysis.priorityReason} />
                </dl>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Phản hồi chưa có kết quả phân tích.</p>
              )}
            </div>

            <div className="rounded-2xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Ảnh đính kèm</h3>
                  <p className="text-xs text-muted-foreground">JPEG, PNG hoặc WebP; tối đa 5 ảnh, mỗi ảnh 5 MB.</p>
                </div>
                <Button type="button" variant="outline" size="sm" disabled={uploading || attachments.length >= 5} asChild>
                  <label className="cursor-pointer">
                    {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
                    {uploading ? "Đang tải..." : "Tải ảnh lên"}
                    <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={addAttachment} />
                  </label>
                </Button>
              </div>
              {attachments.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">Chưa có ảnh đính kèm.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {attachments.map((attachment) => (
                    <li key={attachment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                      <span className="min-w-0 truncate">{attachment.originalFilename} <span className="text-muted-foreground">({Math.ceil(attachment.fileSize / 1024)} KB)</span></span>
                      <span className="flex gap-2">
                        <Button type="button" size="sm" variant="outline" disabled={viewingAttachmentId === attachment.id} onClick={() => viewAttachment(attachment)}>
                          {viewingAttachmentId === attachment.id ? <Loader2 className="animate-spin" /> : <Eye />} Xem
                        </Button>
                        <Button type="button" size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeAttachment(attachment)}><Trash2 /> Xóa</Button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </div>
        )}

        {!loading && feedback && editing && (
          <form id="feedback-edit-form" className="space-y-4" onSubmit={saveFeedback}>
            <div className="space-y-2">
              <Label htmlFor="detail-title">Tiêu đề</Label>
              <Input id="detail-title" maxLength={500} value={form.title} onChange={(event) => updateField("title", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detail-content">Nội dung</Label>
              <Textarea id="detail-content" rows={5} value={form.content} onChange={(event) => updateField("content", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <EditField id="detail-author" label="Người gửi" value={form.authorName} maxLength={255} onChange={(value) => updateField("authorName", value)} />
              <EditField id="detail-contact" label="Liên hệ" value={form.authorContact} maxLength={255} onChange={(value) => updateField("authorContact", value)} />
              <EditField id="detail-location" label="Địa điểm" value={form.location} maxLength={500} onChange={(value) => updateField("location", value)} />
              <div className="space-y-2">
                <Label htmlFor="detail-category">Chủ đề</Label>
                <Select value={form.category || undefined} onValueChange={(value) => updateField("category", value)}>
                  <SelectTrigger id="detail-category" className="w-full"><SelectValue placeholder="Chọn chủ đề" /></SelectTrigger>
                  <SelectContent>{categoryOptions.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="detail-status">Trạng thái</Label>
                <Select value={form.status} onValueChange={(value) => updateField("status", value as FeedbackStatus)}>
                  <SelectTrigger id="detail-status" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>{(Object.entries(statusLabels) as [FeedbackStatus, string][]).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Các trường văn bản trống sẽ không được backend chấp nhận.</p>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </form>
        )}

        {!loading && feedback && (
          <DialogFooter className="items-center sm:justify-between">
            <Button type="button" variant="destructive" disabled={saving || deleting} onClick={removeFeedback}>
              {deleting ? <Loader2 className="animate-spin" /> : <Trash2 />} {deleting ? "Đang xóa..." : "Xóa"}
            </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              {editing ? (
                <>
                  <Button type="button" variant="outline" disabled={saving} onClick={cancelEditing}>Hủy</Button>
                  <Button type="submit" form="feedback-edit-form" disabled={saving}>
                    {saving && <Loader2 className="animate-spin" />} {saving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => { setEditing(true); setError(null); }}><Pencil /> Chỉnh sửa</Button>
              )}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm">{value || "Chưa có"}</dd>
    </div>
  );
}

function EditField({
  id,
  label,
  value,
  maxLength,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} maxLength={maxLength} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
