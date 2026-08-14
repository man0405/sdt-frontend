export type SourceType = "ZALO" | "WEBSITE" | "EMAIL" | "MANUAL" | "OTHER";
export type FeedbackStatus =
  | "PENDING_ANALYSIS"
  | "ANALYZED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "ANALYSIS_FAILED";
export type SentimentType = "POSITIVE" | "NEUTRAL" | "NEGATIVE";
export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type ErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors: Record<string, string> | null;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details: ErrorResponse | null = null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type FeedbackListItem = {
  id: string;
  title: string | null;
  content: string;
  authorName: string | null;
  location: string | null;
  category: string | null;
  status: FeedbackStatus;
  source: SourceType;
  receivedAt: string;
  sentiment: SentimentType | null;
  sentimentScore: number | null;
  priority: PriorityLevel | null;
  priorityScore: number | null;
  createdAt: string;
};

export type Category = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalFeedback: number;
  status: {
    pendingAnalysis: number;
    analyzed: number;
    inProgress: number;
    resolved: number;
    rejected: number;
    analysisFailed: number;
  };
  sentiment: { positive: number; neutral: number; negative: number };
  priority: { low: number; medium: number; high: number; urgent: number };
};

export type DistributionItem = { key: string; label: string; count: number };

export type DashboardDistribution = {
  sentiment: DistributionItem[];
  priority: DistributionItem[];
  category: DistributionItem[];
  source: DistributionItem[];
};

export type DashboardTrend = {
  fromDate: string;
  toDate: string;
  interval: "DAY" | "MONTH";
  points: Array<{ period: string; count: number }>;
};

export type FeedbackFilters = {
  page?: number;
  size?: number;
  sortBy?: "createdAt" | "updatedAt" | "title" | "status" | "category";
  sortDirection?: "asc" | "desc";
  source?: SourceType;
  status?: FeedbackStatus;
  category?: string;
  sentiment?: SentimentType;
  priority?: PriorityLevel;
  keyword?: string;
  fromDate?: string;
  toDate?: string;
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

function apiUrl(path: string, query?: Record<string, string | number | undefined>) {
  const url = apiBaseUrl ? new URL(path, `${apiBaseUrl}/`) : new URL(path, window.location.origin);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

async function request<T>(path: string, init: RequestInit = {}, query?: Record<string, string | number | undefined>): Promise<T> {
  const response = await fetch(apiUrl(path, query), { ...init, headers: { Accept: "application/json", ...init.headers } });
  if (response.ok) return response.json() as Promise<T>;

  let details: ErrorResponse | null = null;
  try {
    details = (await response.json()) as ErrorResponse;
  } catch {
    // The API normally returns JSON errors; retain a usable message if a proxy does not.
  }
  throw new ApiError(details?.message ?? `Request failed (${response.status})`, response.status, details);
}

export function getFeedback(filters: FeedbackFilters, signal?: AbortSignal) {
  return request<PageResponse<FeedbackListItem>>("/api/feedback", { signal }, filters);
}

export function getActiveCategories(signal?: AbortSignal) {
  return request<Category[]>("/api/categories", { signal }, { activeOnly: "true" });
}

export function getDashboardStats(signal?: AbortSignal) {
  return request<DashboardStats>("/api/dashboard/stats", { signal });
}

export function getDashboardDistribution(signal?: AbortSignal) {
  return request<DashboardDistribution>("/api/dashboard/distribution", { signal });
}

export function getDashboardTrend(filters: Pick<DashboardTrend, "fromDate" | "toDate" | "interval">, signal?: AbortSignal) {
  return request<DashboardTrend>("/api/dashboard/trend", { signal }, filters);
}

export async function exportFeedback(filters: FeedbackFilters) {
  const { page, size, sortBy, sortDirection, ...exportFilters } = filters;
  void page;
  void size;
  void sortBy;
  void sortDirection;
  const response = await fetch(apiUrl("/api/export", exportFilters), { headers: { Accept: "text/csv" } });
  if (!response.ok) {
    let details: ErrorResponse | null = null;
    try {
      details = (await response.json()) as ErrorResponse;
    } catch {
      // See request() above.
    }
    throw new ApiError(details?.message ?? `Export failed (${response.status})`, response.status, details);
  }

  const filename = response.headers.get("Content-Disposition")?.match(/filename="?([^";]+)"?/)?.[1] ?? "feedback-export.csv";
  return { blob: await response.blob(), filename };
}

export const sourceLabels: Record<SourceType, string> = {
  ZALO: "Zalo",
  WEBSITE: "Website",
  EMAIL: "Email",
  MANUAL: "Nhập thủ công",
  OTHER: "Khác",
};

export const sentimentLabels: Record<SentimentType, string> = {
  POSITIVE: "Tích cực",
  NEUTRAL: "Trung lập",
  NEGATIVE: "Tiêu cực",
};

export const priorityLabels: Record<PriorityLevel, string> = {
  LOW: "Thấp",
  MEDIUM: "Trung bình",
  HIGH: "Cao",
  URGENT: "Khẩn cấp",
};

export const statusLabels: Record<FeedbackStatus, string> = {
  PENDING_ANALYSIS: "Chờ phân tích",
  ANALYZED: "Đã phân tích",
  IN_PROGRESS: "Đang xử lý",
  RESOLVED: "Đã giải quyết",
  REJECTED: "Từ chối",
  ANALYSIS_FAILED: "Phân tích lỗi",
};

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export function formatRelativeTime(value: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "Vừa xong";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
  return formatDateTime(value);
}

export function dateRangeBounds(days: number) {
  const toDate = new Date();
  const fromDate = new Date(toDate);
  fromDate.setHours(0, 0, 0, 0);
  fromDate.setDate(fromDate.getDate() - (days - 1));
  toDate.setHours(23, 59, 59, 999);
  return { fromDate: fromDate.toISOString(), toDate: toDate.toISOString() };
}
