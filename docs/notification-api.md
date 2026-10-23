# Notification API

The frontend uses these authenticated, admin-only endpoints to populate the dashboard notification menu. Send the access token as `Authorization: Bearer <token>` and set `NEXT_PUBLIC_API_BASE_URL` to the backend origin (defaults to `http://localhost:8080`).

## Types

`type` is one of `NEW_FEEDBACK`, `FEEDBACK_STATUS_CHANGED`, `ANALYSIS_COMPLETED`, `HIGH_PRIORITY`, or `URGENT_PRIORITY`.

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0123456789ab",
  "type": "NEW_FEEDBACK",
  "title": "Phản hồi mới",
  "message": "Có một phản hồi mới được gửi vào hệ thống.",
  "relatedFeedbackId": "b1b2c3d4-e5f6-4a7b-8c9d-0123456789ab",
  "isRead": false,
  "readAt": null,
  "createdAt": "2026-08-21T10:30:00Z"
}
```

All timestamps are ISO-8601 offset datetimes. `relatedFeedbackId` and `readAt` may be `null`.

## List notifications

`GET /api/notifications?page=0&size=20`

`page` is zero-based. `size` must be from 1 through 100. Results are ordered newest first, with `id` as a tie-breaker.

```json
{
  "content": ["<notification>"],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1,
  "first": true,
  "last": true
}
```

## Get unread count

`GET /api/notifications/unread-count`

```json
{ "unreadCount": 3 }
```

The unread count covers all notifications, not only the current list page.

## Mark one notification as read

`PATCH /api/notifications/{id}/read`

Returns the updated notification object. The operation is idempotent: an already-read notification remains read. A nonexistent ID returns `404`.

## Mark all notifications as read

`PATCH /api/notifications/read-all`

```json
{ "updatedCount": 3 }
```

`updatedCount` is the number of notifications that changed from unread to read.

## Errors

These endpoints require an authenticated user with the `ADMIN` role. The API returns the standard error payload for failures, including `401` for an absent/invalid token, `403` for insufficient role, `404` for an unknown notification, and `400` for invalid paging.
