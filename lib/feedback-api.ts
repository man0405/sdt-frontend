import axios from "axios";

export type SourceType = "ZALO" | "WEBSITE" | "EMAIL" | "MANUAL" | "OTHER";
export type RawProcessingStatus = "NEW" | "PROCESSING" | "PROCESSED" | "FAILED";
export type AnalysisStatus = "PENDING" | "SUCCESS" | "FAILED";
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

export type AuthenticatedUser = {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
};

export type LoginResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: AuthenticatedUser;
};

export const AUTH_STORAGE_KEY = "sdt.auth.session";

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

export type RawFeedback = {
  id: string;
  source: SourceType;
  sourceRef: string;
  rawTitle: string | null;
  rawContent: string;
  rawAuthorName: string | null;
  rawAuthorContact: string | null;
  rawLocation: string | null;
  categoryHint: string | null;
  rawMetadata: Record<string, unknown> | null;
  receivedAt: string;
  processingStatus: RawProcessingStatus;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AnalysisResult = {
  id: string;
  sentiment: SentimentType | null;
  sentimentScore: number | null;
  category: string | null;
  categoryScore: number | null;
  matchedKeywords: string[] | null;
  priority: PriorityLevel | null;
  priorityScore: number | null;
  priorityReason: string | null;
  modelName: string | null;
  modelVersion: string | null;
  analysisStatus: AnalysisStatus;
  errorMessage: string | null;
  analyzedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FeedbackDetail = {
  id: string;
  title: string;
  content: string;
  authorName: string | null;
  authorContact: string | null;
  location: string | null;
  category: string | null;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  rawFeedback: RawFeedback;
  latestAnalysis: AnalysisResult | null;
  analysisHistory: AnalysisResult[];
};

export type FeedbackUpdateRequest = {
  title?: string;
  content?: string;
  authorName?: string;
  authorContact?: string;
  location?: string;
  category?: string;
  status?: FeedbackStatus;
};

export type FeedbackCreateRequest = {
  title?: string;
  content: string;
  authorName?: string;
  authorContact?: string;
  location?: string;
  receivedAt?: string;
};

export type FeedbackCreateResponse = {
  id: string;
  title: string | null;
  content: string;
  category: string | null;
  status: FeedbackStatus;
  source: SourceType;
  receivedAt: string;
  createdAt: string;
};

export type FeedbackIngestRequest = {
  source: SourceType;
  sourceRef: string;
  rawTitle?: string;
  rawContent: string;
  rawAuthorName?: string;
  rawAuthorContact?: string;
  rawLocation?: string;
  categoryHint?: string;
  rawMetadata?: Record<string, unknown>;
  receivedAt: string;
};

export type FeedbackIngestResponse = {
  id: string;
  source: SourceType;
  sourceRef: string;
  processingStatus: RawProcessingStatus;
  receivedAt: string;
  createdAt: string;
};

export type FeedbackAttachment = {
  id: string;
  feedbackId: string;
  originalFilename: string;
  contentType: "image/jpeg" | "image/png" | "image/webp";
  fileSize: number;
  createdAt: string;
  downloadUrl: string;
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

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getAccessToken() {
  if (!canUseStorage()) return null;

  const session = window.localStorage.getItem(AUTH_STORAGE_KEY) ?? window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!session) return null;

  try {
    const parsed = JSON.parse(session) as LoginResponse;
    return parsed.accessToken || null;
  } catch {
    clearSession();
    return null;
  }
}

export function saveSession(session: LoginResponse, remember: boolean) {
  if (!canUseStorage()) return;
  clearSession();
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

function authorizationHeader() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function apiUrl(path: string, query?: Record<string, string | number | undefined>) {
  const url = apiBaseUrl ? new URL(path, `${apiBaseUrl}/`) : new URL(path, window.location.origin);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  );
}

async function errorDetails(data: unknown): Promise<ErrorResponse | null> {
  if (data instanceof Blob) {
    try {
      return errorDetails(JSON.parse(await data.text()));
    } catch {
      return null;
    }
  }

  return isErrorResponse(data) ? data : null;
}

async function throwRequestError(error: unknown, fallback: string): Promise<never> {
  if (
    axios.isCancel(error) ||
    (axios.isAxiosError(error) && error.code === "ERR_CANCELED")
  ) {
    throw new DOMException("The operation was aborted.", "AbortError");
  }

  if (!axios.isAxiosError(error) || !error.response) {
    throw error;
  }

  const details = await errorDetails(error.response.data);
  throw new ApiError(
    details?.message ?? `${fallback} (${error.response.status})`,
    error.response.status,
    details
  );
}

async function request<T>(
  path: string,
  query?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T> {
  try {
    const response = await axios.get<T>(apiUrl(path, query), {
      signal,
      headers: { Accept: "application/json", ...authorizationHeader() },
    });

    return response.data;
  } catch (error) {
    return throwRequestError(error, "Request failed");
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await axios.post<LoginResponse>(apiUrl("/api/auth/login"), { username, password }, {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Sign in failed");
  }
}

export function getCurrentUser(signal?: AbortSignal) {
  return request<AuthenticatedUser>("/api/auth/me", undefined, signal);
}

export function getFeedback(filters: FeedbackFilters, signal?: AbortSignal) {
  return request<PageResponse<FeedbackListItem>>("/api/feedback", filters, signal);
}

export function getFeedbackDetail(id: string, signal?: AbortSignal) {
  return request<FeedbackDetail>(`/api/feedback/${encodeURIComponent(id)}`, undefined, signal);
}

export async function createFeedback(payload: FeedbackCreateRequest) {
  try {
    const response = await axios.post<FeedbackCreateResponse>(apiUrl("/api/feedback"), payload, {
      headers: { Accept: "application/json", "Content-Type": "application/json", ...authorizationHeader() },
    });
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Feedback submission failed");
  }
}

export async function updateFeedback(id: string, payload: FeedbackUpdateRequest) {
  try {
    const response = await axios.patch<FeedbackDetail>(
      apiUrl(`/api/feedback/${encodeURIComponent(id)}`),
      payload,
      { headers: { Accept: "application/json", "Content-Type": "application/json", ...authorizationHeader() } }
    );
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Feedback update failed");
  }
}

export async function deleteFeedback(id: string) {
  try {
    await axios.delete(apiUrl(`/api/feedback/${encodeURIComponent(id)}`), {
      headers: { Accept: "application/json", ...authorizationHeader() },
    });
  } catch (error) {
    return throwRequestError(error, "Feedback deletion failed");
  }
}

export async function ingestFeedback(payload: FeedbackIngestRequest) {
  try {
    const response = await axios.post<FeedbackIngestResponse>(apiUrl("/api/feedback/ingest"), payload, {
      headers: { Accept: "application/json", "Content-Type": "application/json", ...authorizationHeader() },
    });
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Feedback submission failed");
  }
}

export function getFeedbackAttachments(feedbackId: string, signal?: AbortSignal) {
  return request<FeedbackAttachment[]>(
    `/api/feedback/${encodeURIComponent(feedbackId)}/attachments`,
    undefined,
    signal
  );
}

export async function uploadFeedbackAttachment(feedbackId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<FeedbackAttachment>(
      apiUrl(`/api/feedback/${encodeURIComponent(feedbackId)}/attachments`),
      formData,
      { headers: { Accept: "application/json", ...authorizationHeader() } }
    );
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Image upload failed");
  }
}

export async function downloadFeedbackAttachment(feedbackId: string, attachmentId: string) {
  try {
    const response = await axios.get<Blob>(
      apiUrl(`/api/feedback/${encodeURIComponent(feedbackId)}/attachments/${encodeURIComponent(attachmentId)}/download`),
      { responseType: "blob", headers: { Accept: "image/*", ...authorizationHeader() } }
    );
    return response.data;
  } catch (error) {
    return throwRequestError(error, "Image download failed");
  }
}

export async function deleteFeedbackAttachment(feedbackId: string, attachmentId: string) {
  try {
    await axios.delete(
      apiUrl(`/api/feedback/${encodeURIComponent(feedbackId)}/attachments/${encodeURIComponent(attachmentId)}`),
      { headers: { Accept: "application/json", ...authorizationHeader() } }
    );
  } catch (error) {
    return throwRequestError(error, "Image deletion failed");
  }
}

export function getActiveCategories(signal?: AbortSignal) {
  return request<Category[]>("/api/categories", { activeOnly: "true" }, signal);
}

export function getDashboardStats(signal?: AbortSignal) {
  return request<DashboardStats>("/api/dashboard/stats", undefined, signal);
}

export function getDashboardDistribution(signal?: AbortSignal) {
  return request<DashboardDistribution>("/api/dashboard/distribution", undefined, signal);
}

export function getDashboardTrend(
  filters: Pick<DashboardTrend, "fromDate" | "toDate" | "interval">,
  signal?: AbortSignal
) {
  return request<DashboardTrend>("/api/dashboard/trend", filters, signal);
}

export async function exportFeedback(filters: FeedbackFilters) {
  const { page, size, sortBy, sortDirection, ...exportFilters } = filters;
  void page;
  void size;
  void sortBy;
  void sortDirection;

  try {
    const response = await axios.get<Blob>(apiUrl("/api/export", exportFilters), {
      responseType: "blob",
      headers: { Accept: "text/csv", ...authorizationHeader() },
    });
    const contentDisposition = response.headers["content-disposition"];
    const filename =
      (typeof contentDisposition === "string"
        ? contentDisposition.match(/filename="?([^";]+)"?/)?.[1]
        : undefined) ?? "feedback-export.csv";

    return { blob: response.data, filename };
  } catch (error) {
    return throwRequestError(error, "Export failed");
  }
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
