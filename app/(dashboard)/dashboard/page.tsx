"use client";

import { useEffect, useState } from "react";

import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics";
import { FeedbackTopicsChart } from "@/components/dashboard/feedback-topics-chart";
import { FeedbackTrendChart } from "@/components/dashboard/feedback-trend-chart";
import { RecentFeedback } from "@/components/dashboard/recent-feedback";
import { SentimentChart } from "@/components/dashboard/sentiment-chart";
import { Button } from "@/components/ui/button";
import {
  ApiError,
  type DashboardDistribution,
  type DashboardStats,
  type DashboardTrend,
  type FeedbackListItem,
  getDashboardDistribution,
  getDashboardStats,
  getDashboardTrend,
  getFeedback,
} from "@/lib/feedback-api";

function sevenDayRange() {
  const toDate = new Date();
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 6);

  const format = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  return { fromDate: format(fromDate), toDate: format(toDate) };
}

function errorMessage(error: unknown) {
  return error instanceof ApiError
    ? error.message
    : "Không thể tải dữ liệu tổng quan. Vui lòng thử lại.";
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
      getFeedback(
        { page: 0, size: 4, sortBy: "createdAt", sortDirection: "desc" },
        controller.signal
      ),
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

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 pb-8">
      <section className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tổng quan</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Thống kê toàn bộ kho phản hồi; biểu đồ xu hướng hiển thị 7 ngày gần nhất.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500" />
          Dữ liệu tải trực tiếp từ hệ thống
        </span>
      </section>

      {error && (
        <section className="rounded-[24px] border border-destructive/30 bg-destructive/10 p-5">
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 rounded-lg"
            onClick={() => {
              setLoading(true);
              setError(null);
              setReloadKey((current) => current + 1);
            }}
          >
            Thử lại
          </Button>
        </section>
      )}

      {loading && !data ? (
        <section className="rounded-[24px] border border-border/80 bg-card p-10 text-center text-sm text-muted-foreground">
          Đang tải dữ liệu tổng quan...
        </section>
      ) : (
        data && (
          <>
            <DashboardMetrics stats={data.stats} />

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
              <FeedbackTrendChart points={data.trend.points} />
              <SentimentChart items={data.distribution.sentiment} />
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.9fr)]">
              <FeedbackTopicsChart items={data.distribution.category} />
              <RecentFeedback feedback={data.feedback} />
            </section>
          </>
        )
      )}
    </div>
  );
}
