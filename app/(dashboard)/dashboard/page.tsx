"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  CircleAlert,
  Globe2,
  Mail,
  MessageCircle,
  SquarePen,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ApiError,
  type DashboardDistribution,
  type DashboardStats,
  type DashboardTrend,
  type FeedbackListItem,
  type SentimentType,
  type SourceType,
  formatRelativeTime,
  getDashboardDistribution,
  getDashboardStats,
  getDashboardTrend,
  getFeedback,
  sentimentLabels,
  sourceLabels,
} from "@/lib/feedback-api";

const sourceMeta: Record<SourceType, { icon: typeof MessageCircle; soft: string }> = {
  ZALO: { icon: MessageCircle, soft: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
  WEBSITE: { icon: Globe2, soft: "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300" },
  EMAIL: { icon: Mail, soft: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  MANUAL: { icon: SquarePen, soft: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" },
  OTHER: { icon: CircleAlert, soft: "bg-slate-100 text-slate-700 dark:bg-muted dark:text-slate-300" },
};

const sentimentStyle: Record<SentimentType, { color: string; bg: string; text: string }> = {
  POSITIVE: { color: "#16a34a", bg: "bg-emerald-50", text: "text-emerald-700" },
  NEUTRAL: { color: "#f59e0b", bg: "bg-amber-50", text: "text-amber-700" },
  NEGATIVE: { color: "#ef4444", bg: "bg-red-50", text: "text-red-700" },
};

const topicColors = ["#0f766e", "#14b8a6", "#5eead4", "#99f6e4", "#ccfbf1"];

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function sevenDayRange() {
  const toDate = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 6);
  const format = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return { fromDate: format(fromDate), toDate: format(toDate) };
}

function errorMessage(error: unknown) {
  return error instanceof ApiError ? error.message : "Không thể tải dữ liệu tổng quan. Vui lòng thử lại.";
}

type DashboardData = {
  stats: DashboardStats;
  distribution: DashboardDistribution;
  trend: DashboardTrend;
  feedback: FeedbackListItem[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const range = sevenDayRange();
    Promise.all([
      getDashboardStats(controller.signal),
      getDashboardDistribution(controller.signal),
      getDashboardTrend({ ...range, interval: "DAY" }, controller.signal),
      getFeedback({ page: 0, size: 4, sortBy: "createdAt", sortDirection: "desc" }, controller.signal),
    ])
      .then(([stats, distribution, trend, feedback]) => {
        setData({ stats, distribution, trend, feedback: feedback.content });
        setError(null);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === "AbortError") return;
        setError(errorMessage(loadError));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reloadKey]);

  const view = useMemo(() => {
    if (!data) return null;
    const sentimentTotal = data.distribution.sentiment.reduce((total, item) => total + item.count, 0);
    const sentiment = data.distribution.sentiment.map((item) => {
      const key = item.key as SentimentType;
      return { ...item, key, label: sentimentLabels[key], value: sentimentTotal ? Math.round((item.count / sentimentTotal) * 100) : 0, ...sentimentStyle[key] };
    });
    const positive = data.stats.sentiment.positive;
    const analyzedTotal = data.stats.sentiment.positive + data.stats.sentiment.neutral + data.stats.sentiment.negative;
    return {
      priorityCount: data.stats.priority.high + data.stats.priority.urgent,
      satisfaction: analyzedTotal ? `${((positive / analyzedTotal) * 100).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%` : "—",
      sentimentTotal,
      sentiment,
      topics: data.distribution.category.slice(0, 5).map((item, index) => ({ topic: item.label || "Chưa phân loại", value: item.count, color: topicColors[index] })),
      trend: data.trend.points.map((item) => ({ day: new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(new Date(`${item.period}T00:00:00`)), value: item.count })),
    };
  }, [data]);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 pb-8">
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tổng quan</h1>
          <p className="mt-1 text-sm text-muted-foreground">Thống kê toàn bộ kho phản hồi; biểu đồ xu hướng hiển thị 7 ngày gần nhất.</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-emerald-500" /> Dữ liệu tải trực tiếp từ hệ thống</span>
      </section>

      {error && <section className="rounded-[24px] border border-destructive/30 bg-destructive/10 p-5"><p role="alert" className="text-sm text-destructive">{error}</p><Button variant="outline" size="sm" className="mt-3 rounded-lg" onClick={() => { setLoading(true); setError(null); setReloadKey((current) => current + 1); }}>Thử lại</Button></section>}

      {loading && !data ? <section className="rounded-[24px] border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">Đang tải dữ liệu tổng quan...</section> : view && data && <>
        <section className="grid gap-4 sm:grid-cols-1 xl:grid-cols-3">
          <MetricCard label="Tổng phản hồi" value={formatNumber(data.stats.totalFeedback)} icon={<MessageCircle className="size-5" />} detail="toàn bộ dữ liệu" />
          <MetricCard label="Cần ưu tiên xử lý" value={formatNumber(view.priorityCount)} icon={<CircleAlert className="size-5" />} detail="mức cao và khẩn cấp" warning />
          <MetricCard label="Tỷ lệ hài lòng" value={view.satisfaction} icon={<Sparkles className="size-5" />} detail="trên phản hồi đã phân tích" positive />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6"><h2 className="text-base font-semibold">Xu hướng tiếp nhận phản hồi</h2><p className="mt-1 text-sm text-muted-foreground">Số lượng phản hồi theo ngày trong 7 ngày qua</p></div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={view.trend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="feedbackTrend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0f766e" stopOpacity={0.28} /><stop offset="95%" stopColor="#0f766e" stopOpacity={0.01} /></linearGradient></defs>
                  <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                  <Tooltip cursor={{ stroke: "#5eead4", strokeWidth: 2 }} contentStyle={{ borderRadius: 14, borderColor: "var(--border)", backgroundColor: "var(--popover)", color: "var(--popover-foreground)", boxShadow: "0 8px 24px rgba(15, 23, 42, .16)" }} formatter={(value) => [formatNumber(Number(value)), "Phản hồi"]} />
                  <Area type="monotone" dataKey="value" stroke="#0f766e" strokeWidth={3} fill="url(#feedbackTrend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between"><div><h2 className="text-base font-semibold">Cảm xúc người dân</h2><p className="mt-1 text-sm text-muted-foreground">Phân tích tự động bởi AI</p></div><span className="rounded-lg bg-teal-50 p-2 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300"><Bot className="size-4" /></span></div>
            <div className="relative mx-auto h-44 max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={view.sentiment} dataKey="count" nameKey="label" innerRadius={50} outerRadius={72} paddingAngle={4} stroke="none">{view.sentiment.map((item) => <Cell key={item.key} fill={item.color} />)}</Pie><Tooltip formatter={(value, name) => [formatNumber(Number(value)), name]} contentStyle={{ borderRadius: 12, borderColor: "var(--border)", backgroundColor: "var(--popover)", color: "var(--popover-foreground)" }} /></PieChart></ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-semibold">{formatNumber(view.sentimentTotal)}</span><span className="text-xs text-muted-foreground">đã phân tích</span></div>
            </div>
            <div className="space-y-3">{view.sentiment.map((item) => <div key={item.key} className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: item.color }} />{item.label}</div><div className="flex items-center gap-3"><span className="text-muted-foreground">{formatNumber(item.count)}</span><span className="w-9 text-right font-semibold">{item.value}%</span></div></div>)}</div>
          </article>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.9fr)]">
          <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5"><h2 className="text-base font-semibold">Chủ đề được nhắc đến</h2><p className="mt-1 text-sm text-muted-foreground">Top nhóm vấn đề trong toàn bộ dữ liệu</p></div>
            {view.topics.length ? <div className="h-[220px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={view.topics} layout="vertical" margin={{ left: 0, right: 12 }} barSize={14}><XAxis type="number" hide /><YAxis type="category" dataKey="topic" width={122} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} /><Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={{ borderRadius: 12, borderColor: "var(--border)", backgroundColor: "var(--popover)", color: "var(--popover-foreground)" }} formatter={(value) => [formatNumber(Number(value)), "Phản hồi"]} /><Bar dataKey="value" radius={[0, 8, 8, 0]}>{view.topics.map((item) => <Cell key={item.topic} fill={item.color} />)}</Bar></BarChart></ResponsiveContainer></div> : <p className="py-20 text-center text-sm text-muted-foreground">Chưa có dữ liệu chủ đề.</p>}
          </article>

          <article className="rounded-[24px] border border-border/80 bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3"><div><h2 className="text-base font-semibold">Phản hồi mới nhất</h2><p className="mt-1 text-sm text-muted-foreground">Dữ liệu tiếp nhận gần đây</p></div><Link href="/feedback" className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200">Xem tất cả</Link></div>
            <div className="space-y-1">{data.feedback.length ? data.feedback.map((feedback) => <FeedbackRow key={feedback.id} feedback={feedback} />) : <p className="py-10 text-center text-sm text-muted-foreground">Chưa có phản hồi.</p>}</div>
          </article>
        </section>
      </>}
    </div>
  );
}

function MetricCard({ label, value, detail, icon, positive, warning }: { label: string; value: string; detail: string; icon: React.ReactNode; positive?: boolean; warning?: boolean }) {
  return <article className="rounded-[22px] border border-border/80 bg-card p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm font-medium text-muted-foreground">{label}</p><span className={cn("rounded-xl p-2.5", warning ? "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300" : positive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300")}>{icon}</span></div><p className="mt-5 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-2 text-xs text-muted-foreground">{detail}</p></article>;
}

function FeedbackRow({ feedback }: { feedback: FeedbackListItem }) {
  const source = sourceMeta[feedback.source];
  const Icon = source.icon;
  const sentimentClass = feedback.sentiment === "NEGATIVE" ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300" : feedback.sentiment === "POSITIVE" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  return <div className="rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-muted/60"><div className="mb-1.5 flex items-center gap-2 text-xs"><span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium", source.soft)}><Icon className="size-3" />{sourceLabels[feedback.source]}</span><span className="text-muted-foreground">{formatRelativeTime(feedback.receivedAt)}</span><span className="ml-auto max-w-32 truncate rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-muted dark:text-slate-300">{feedback.category ?? "Chưa phân loại"}</span></div><p className="line-clamp-2 text-sm leading-5 text-slate-700 dark:text-slate-200">{feedback.content}</p>{feedback.sentiment ? <span className={cn("mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium", sentimentClass)}>{sentimentLabels[feedback.sentiment]}</span> : <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-muted dark:text-slate-300">Chưa phân tích</span>}</div>;
}
