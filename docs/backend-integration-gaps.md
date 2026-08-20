# Frontend–Backend Integration Gaps

Status: confirmed against the implemented backend API contract and the dashboard/feedback screens.

## Deployment blocker: browser access to the API

The frontend is a Next static export (`output: "export"`) served under `/orbit-ai`. It has no runtime server that can proxy API calls.

The backend has no CORS configuration. Direct browser calls to another origin, including local frontend development, will fail until one of these is configured:

- Backend CORS for the development and production frontend origins; or
- A reverse proxy that serves the static site and forwards `/api` on the same origin.

The frontend reads `NEXT_PUBLIC_API_BASE_URL`; static deployments must set it during the frontend build. The local fallback is `http://localhost:8080`.

## Dashboard filters and comparisons are unavailable

The original dashboard mock had source controls, comparison percentages, and period-wide claims. Current backend support is narrower:

- `GET /api/dashboard/stats` and `GET /api/dashboard/distribution` have no source or date filters.
- `GET /api/dashboard/trend` supports only `fromDate`, `toDate`, and `interval`.
- No endpoint returns prior-period values or percentage changes.

Frontend decision: dashboard cards and distributions now represent all stored data; only the trend chart is scoped to the recent seven-day range. Source controls and invented comparison values were removed.

Backend additions needed for the full filtered dashboard:

- Optional source and date filters on stats/distribution/trend.
- Prior-period or calculated comparison fields in the dashboard response.

## Keyword cloud is unsupported

No endpoint provides aggregated keywords, frequencies, or keyword trends. `matchedKeywords` exists only inside an individual feedback analysis result.

Frontend decision: removed the mock keyword cloud and its action.

Backend addition needed: a keyword aggregation endpoint with documented filters and counts.

## Feedback search is narrower than the old UI copy

`GET /api/feedback?keyword=` searches title and content only. It does not search feedback UUID, author name, category substring, contact, or source reference.

Frontend decision: the list search now says it searches title/content.

Backend addition needed for the old behavior: explicitly defined search across UUID, title, content, author name, and any other approved fields.

## Date semantics differ from the visible intake timestamp

Feedback list/export filters use `Feedback.createdAt`. The table displays `receivedAt`, which is when the source feedback was received. Dashboard trend also counts by `createdAt`.

Frontend decision: date controls are labeled as creation-date filters; received time remains visible in each row.

Backend addition needed for intake-date reporting: received-at filters, or a documented `dateField=createdAt|receivedAt` option applied consistently to list, export, and dashboard trend.

## Feedback IDs are UUIDs

The old mock used human-readable IDs such as `FB-2026-08194`. The API returns a UUID only. Creating a friendly ID from a UUID in the frontend would be misleading and non-stable.

Frontend decision: display the UUID with a title containing its full value.

Backend addition needed: a persisted, unique public feedback reference field if staff need case numbers.

## Status vocabulary is six-state, not three-state

Backend statuses are rendered directly:

| Backend value | Frontend label |
| --- | --- |
| `PENDING_ANALYSIS` | Chờ phân tích |
| `ANALYZED` | Đã phân tích |
| `IN_PROGRESS` | Đang xử lý |
| `RESOLVED` | Đã giải quyết |
| `REJECTED` | Từ chối |
| `ANALYSIS_FAILED` | Phân tích lỗi |

`RESOLVED` is not rendered as “Đã phản hồi” because the API does not establish that a citizen response was sent.

## Feedback operations now wired

The feedback screen now integrates list/filter/pagination, detail, update, delete, manual ingestion, category lookup, and CSV export. Detail opens from the table action. Updates send only changed fields, and deletion requires browser confirmation.

## Still not wired

Auth, profile, workspace, settings, notification, security, integration, branding, billing, and onboarding screens are template-only or simulated UI. The documented backend has no APIs for them, so they remain outside this integration scope. In particular, the frontend must not invent authentication endpoints or attach bearer tokens until the backend exposes an authentication contract.
