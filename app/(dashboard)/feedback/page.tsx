"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Download,
  Filter,
  Globe2,
  Mail,
  MessageCircle,
  Search,
  SlidersHorizontal,
  SquarePen,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ApiError,
  type FeedbackListItem,
  type PageResponse,
  type PriorityLevel,
  type SentimentType,
  type SourceType,
  dateRangeBounds,
  exportFeedback,
  formatDateTime,
  getActiveCategories,
  getFeedback,
  priorityLabels,
  sentimentLabels,
  sourceLabels,
  statusLabels,
} from "@/lib/feedback-api";

const sourceStyles: Record<SourceType, { icon: typeof MessageCircle; className: string }> = {
  ZALO: { icon: MessageCircle, className: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
  WEBSITE: { icon: Globe2, className: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300" },
  EMAIL: { icon: Mail, className: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  MANUAL: { icon: SquarePen, className: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" },
  OTHER: { icon: Filter, className: "bg-slate-100 text-slate-700 dark:bg-muted dark:text-slate-300" },
};

function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Không thể tải dữ liệu. Vui lòng thử lại.";
}

export default function FeedbackPage() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<"all" | SourceType>("all");
  const [category, setCategory] = useState("all");
  const [sentiment, setSentiment] = useState<"all" | SentimentType>("all");
  const [priority, setPriority] = useState<"all" | PriorityLevel>("all");
  const [dateRange, setDateRange] = useState<"1" | "7" | "30">("7");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState<PageResponse<FeedbackListItem> | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [listError, setListError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const pageSize = 6;

  const filters = useMemo(() => {
    const { fromDate, toDate } = dateRangeBounds(Number(dateRange));
    return {
      page,
      size: pageSize,
      sortBy: "createdAt" as const,
      sortDirection: "desc" as const,
      source: source === "all" ? undefined : source,
      category: category === "all" ? undefined : category,
      sentiment: sentiment === "all" ? undefined : sentiment,
      priority: priority === "all" ? undefined : priority,
      keyword: query.trim() || undefined,
      fromDate,
      toDate,
    };
  }, [category, dateRange, page, priority, query, sentiment, source]);

  useEffect(() => {
    const controller = new AbortController();
    getActiveCategories(controller.signal)
      .then((items) => setCategories(items.map((item) => item.name)))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCategoryError(errorMessage(error));
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getFeedback(filters, controller.signal)
      .then((nextResult) => {
        setResult(nextResult);
        setListError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setListError(errorMessage(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [filters, reloadKey]);

  const filterCount = [source, category, sentiment, priority].filter((value) => value !== "all").length + (query.trim() ? 1 : 0);
  const totalElements = result?.totalElements ?? 0;
  const totalPages = result?.totalPages ?? 0;
  const currentPage = (result?.page ?? page) + 1;
  const firstRow = totalElements === 0 ? 0 : page * pageSize + 1;
  const lastRow = result ? Math.min((page + 1) * pageSize, totalElements) : 0;

  function resetFilters() {
    setLoading(true);
    setListError(null);
    setQuery("");
    setSource("all");
    setCategory("all");
    setSentiment("all");
    setPriority("all");
    setDateRange("7");
    setPage(0);
  }

  function updateFilter<T extends string>(setter: (value: T) => void, value: T) {
    setLoading(true);
    setListError(null);
    setter(value);
    setPage(0);
  }

  async function downloadExport() {
    setExportError(null);
    setExporting(true);
    try {
      const { blob, filename } = await exportFeedback(filters);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setExportError(errorMessage(error));
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 pb-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-teal-700 dark:text-teal-300"><span className="size-2 rounded-full bg-teal-600" /> Kho dữ liệu phản hồi</div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tất cả phản hồi</h1>
          <p className="mt-2 text-sm text-muted-foreground">Tra cứu và phân loại ý kiến người dân từ các nguồn tiếp nhận.</p>
        </div>
        <Button disabled={exporting} onClick={downloadExport} className="rounded-xl bg-[#0f766e] text-white hover:bg-[#0c5f59] dark:bg-teal-600 dark:hover:bg-teal-500"><Download /> {exporting ? "Đang xuất..." : "Xuất dữ liệu"}</Button>
      </section>

      {exportError && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{exportError}</p>}

      <section className="rounded-[24px] border border-border/80 bg-card p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2"><span className="rounded-lg bg-teal-50 p-2 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300"><Filter className="size-4" /></span><div><h2 className="font-semibold">Bộ lọc dữ liệu</h2><p className="text-xs text-muted-foreground">Tìm trong tiêu đề/nội dung và lọc theo ngày tạo phản hồi.</p></div>{filterCount > 0 && <span className="ml-auto rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">{filterCount} bộ lọc đang dùng</span>}</div>
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="relative lg:col-span-4"><Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => updateFilter(setQuery, event.target.value)} placeholder="Tìm tiêu đề hoặc nội dung..." className="rounded-xl bg-slate-50 pl-9 dark:bg-muted/60" /></div>
          <FilterSelect value={source} onValueChange={(value) => updateFilter(setSource, value as "all" | SourceType)} placeholder="Nguồn"><SelectItem value="all">Tất cả nguồn</SelectItem>{(Object.entries(sourceLabels) as [SourceType, string][]).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</FilterSelect>
          <FilterSelect value={category} onValueChange={(value) => updateFilter(setCategory, value)} placeholder="Chủ đề"><SelectItem value="all">Tất cả chủ đề</SelectItem>{categories.map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</FilterSelect>
          <FilterSelect value={sentiment} onValueChange={(value) => updateFilter(setSentiment, value as "all" | SentimentType)} placeholder="Cảm xúc"><SelectItem value="all">Mọi cảm xúc</SelectItem>{(Object.entries(sentimentLabels) as [SentimentType, string][]).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</FilterSelect>
          <FilterSelect value={priority} onValueChange={(value) => updateFilter(setPriority, value as "all" | PriorityLevel)} placeholder="Ưu tiên"><SelectItem value="all">Mọi mức ưu tiên</SelectItem>{(Object.entries(priorityLabels) as [PriorityLevel, string][]).map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</FilterSelect>
          <FilterSelect value={dateRange} onValueChange={(value) => updateFilter(setDateRange, value as "1" | "7" | "30")} placeholder="Ngày tạo"><SelectItem value="1">Hôm nay</SelectItem><SelectItem value="7">7 ngày qua</SelectItem><SelectItem value="30">30 ngày qua</SelectItem></FilterSelect>
          <Button variant="ghost" className="rounded-xl text-muted-foreground lg:col-span-1" onClick={resetFilters} title="Xóa bộ lọc"><X className="size-4" /><span className="hidden xl:inline">Xóa</span></Button>
        </div>
        {categoryError && <p role="alert" className="mt-3 text-xs text-destructive">Không thể tải danh sách chủ đề: {categoryError}</p>}
      </section>

      <section className="overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-sm">
        <div className="flex flex-col gap-2 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h2 className="font-semibold">Danh sách phản hồi</h2><p className="mt-1 text-sm text-muted-foreground">Tìm thấy <span className="font-medium text-foreground">{totalElements}</span> phản hồi phù hợp</p></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><SlidersHorizontal className="size-3.5" /> Sắp xếp: Mới nhất</div></div>
        {listError ? <div className="flex min-h-60 flex-col items-center justify-center gap-3 px-6 text-center"><p role="alert" className="text-sm text-destructive">{listError}</p><Button variant="outline" size="sm" className="rounded-lg" onClick={() => { setLoading(true); setReloadKey((current) => current + 1); }}>Thử lại</Button></div> : <Table>
          <TableHeader className="bg-slate-50/80 dark:bg-muted/50">
            <TableRow className="hover:bg-slate-50/80 dark:hover:bg-muted/50"><TableHead className="pl-6">Nguồn / Mã</TableHead><TableHead>Nội dung phản hồi</TableHead><TableHead>Phân loại AI</TableHead><TableHead>Ưu tiên</TableHead><TableHead className="pr-6">Trạng thái</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {loading && <TableRow><TableCell colSpan={5} className="h-60 text-center text-sm text-muted-foreground">Đang tải phản hồi...</TableCell></TableRow>}
            {!loading && result?.content.map((feedback) => <FeedbackTableRow key={feedback.id} feedback={feedback} />)}
            {!loading && result?.content.length === 0 && <TableRow><TableCell colSpan={5} className="h-60 text-center"><div className="flex flex-col items-center gap-3 text-muted-foreground"><span className="rounded-full bg-slate-100 p-3"><Search className="size-5" /></span><div><p className="font-medium text-foreground">Không tìm thấy phản hồi phù hợp</p><p className="mt-1 text-sm">Hãy thử điều chỉnh hoặc xóa bớt bộ lọc.</p></div><Button variant="outline" size="sm" className="rounded-lg" onClick={resetFilters}>Xóa bộ lọc</Button></div></TableCell></TableRow>}
          </TableBody>
        </Table>}
        <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><p className="text-sm text-muted-foreground">Hiển thị {firstRow}–{lastRow} trong tổng số {totalElements}</p><div className="flex items-center gap-2"><Button variant="outline" size="sm" className="rounded-lg" disabled={loading || result?.first !== false} onClick={() => setPage((current) => current - 1)}><ChevronLeft /> Trước</Button><span className="px-2 text-sm text-muted-foreground">{currentPage} / {Math.max(totalPages, 1)}</span><Button variant="outline" size="sm" className="rounded-lg" disabled={loading || result?.last !== false} onClick={() => setPage((current) => current + 1)}>Sau <ChevronRight /></Button></div></div>
      </section>
    </div>
  );
}

function FilterSelect({ value, onValueChange, placeholder, children }: { value: string; onValueChange: (value: string) => void; placeholder: string; children: React.ReactNode }) {
  return <Select value={value} onValueChange={onValueChange}><SelectTrigger className="w-full rounded-xl bg-slate-50 dark:bg-muted/60 lg:col-span-2"><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{children}</SelectContent></Select>;
}

function FeedbackTableRow({ feedback }: { feedback: FeedbackListItem }) {
  const source = sourceStyles[feedback.source];
  const SourceIcon = source.icon;
  const sentimentClass = feedback.sentiment === "POSITIVE" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : feedback.sentiment === "NEGATIVE" ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  const priorityClass = feedback.priority === "URGENT" || feedback.priority === "HIGH" ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300" : feedback.priority === "MEDIUM" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" : "bg-slate-100 text-slate-600 dark:bg-muted dark:text-slate-300";
  const statusClass = feedback.status === "PENDING_ANALYSIS" || feedback.status === "ANALYZED" ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" : feedback.status === "IN_PROGRESS" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" : feedback.status === "RESOLVED" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-slate-100 text-slate-700 dark:bg-muted dark:text-slate-300";
  return <TableRow className="group"><TableCell className="pl-6 align-top"><div className={cn("mb-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium", source.className)}><SourceIcon className="size-3" />{sourceLabels[feedback.source]}</div><p title={feedback.id} className="max-w-32 truncate text-xs font-medium text-slate-700 dark:text-slate-200">{feedback.id}</p><p className="mt-1 text-xs text-muted-foreground">{formatDateTime(feedback.receivedAt)}</p></TableCell><TableCell className="min-w-80 max-w-lg align-top whitespace-normal"><p className="font-medium text-slate-800 dark:text-slate-100">{feedback.authorName ?? "Không rõ người gửi"}</p><p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">{feedback.content}</p></TableCell><TableCell className="min-w-40 align-top"><p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">{feedback.category ?? "Chưa phân loại"}</p>{feedback.sentiment ? <span className={cn("inline-flex rounded-full px-2 py-1 text-xs font-medium", sentimentClass)}>{sentimentLabels[feedback.sentiment]}</span> : <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-muted dark:text-slate-300">Chưa phân tích</span>}</TableCell><TableCell className="align-top">{feedback.priority ? <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", priorityClass)}>{(feedback.priority === "URGENT" || feedback.priority === "HIGH") && <CircleAlert className="size-3" />}{priorityLabels[feedback.priority]}</span> : <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-muted dark:text-slate-300">Chưa phân tích</span>}</TableCell><TableCell className="pr-6 align-top"><span className={cn("inline-flex rounded-full px-2 py-1 text-xs font-medium", statusClass)}>{statusLabels[feedback.status]}</span></TableCell></TableRow>;
}
