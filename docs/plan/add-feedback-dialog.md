# Add Feedback Dialog

## Goals and Requirements

Add a manual feedback entry flow to the feedback page for dashboard users.

Success criteria:

- A `Thêm phản hồi` button appears beside the existing export button.
- Clicking the button opens an accessible dialog containing a form.
- The form requires feedback content and allows optional title, sender name, contact, location, and category.
- Submitting calls the existing `POST /api/feedback/ingest` endpoint once, disables repeat submission while pending, and shows backend validation or duplicate errors without closing the dialog.
- A successful `201 Created` response closes and resets the form and confirms that the feedback was accepted for processing.
- The existing feedback list, filtering, pagination, and export behavior continue to work.

Constraints and assumptions:

- This is manual entry, so the frontend sends `source: "MANUAL"`, generates a unique `sourceRef`, and uses the current time for `receivedAt`; users do not need fields for transport metadata.
- The ingest endpoint creates a raw feedback record with processing status `NEW`. It does not create the processed feedback row displayed by `GET /api/feedback`, so the UI must not promise that the new item will appear immediately.
- No backend changes, new dependencies, or general-purpose form abstraction are needed.

## Technical Approach

### API integration

Modify `lib/feedback-api.ts`:

- Add `FeedbackIngestRequest` and `FeedbackIngestResponse` types matching the backend contract.
- Add `ingestFeedback(payload)` using the existing Axios instance pattern, `apiUrl`, and `throwRequestError` helpers.
- Send JSON to `/api/feedback/ingest` and return the typed `201` response.
- Preserve the backend `ApiError` message and `validationErrors` for display in the form.

Payload mapping:

| Form/API value | Request field |
| --- | --- |
| Fixed manual source | `source: "MANUAL"` |
| `manual-${crypto.randomUUID()}` | `sourceRef` |
| Optional title | `rawTitle` |
| Required content | `rawContent` |
| Optional sender name | `rawAuthorName` |
| Optional contact | `rawAuthorContact` |
| Optional location | `rawLocation` |
| Optional selected category name | `categoryHint` |
| Omitted | `rawMetadata` |
| Current ISO timestamp | `receivedAt` |

### Dialog and form

Modify `app/(dashboard)/feedback/page.tsx`:

- Place a `Thêm phản hồi` button with a plus icon beside `Xuất dữ liệu` in the page header.
- Add a local `AddFeedbackDialog` component in the same file to avoid creating a one-use abstraction.
- Reuse the installed `Dialog`, `Input`, `Textarea`, `Select`, `Label`, and `Button` components.
- Use controlled React state and native form validation (`required` and backend `maxLength` values); do not add a schema or form library for this small form.
- Pass the already-loaded active category names into the dialog for `categoryHint`.
- Trim text values before submission and omit empty optional values.
- While submitting, disable the submit button and label it `Đang thêm...`.
- Keep the dialog open on failure and render an accessible inline error. On success, reset and close it, then show a page-level confirmation such as `Đã tiếp nhận phản hồi để xử lý.`
- Do not poll or force-refresh the processed list; ingestion and processing are separate backend stages.

No backend file needs modification. The existing endpoint and validation live in `FeedbackController`, `FeedbackIngestRequest`, and `FeedbackIngestService`.

## Implementation Steps

- [x] Add typed ingest request/response models and `ingestFeedback` to `lib/feedback-api.ts`, reusing existing URL and error handling.
- [x] Add the header button and controlled dialog form to `app/(dashboard)/feedback/page.tsx`.
- [x] Map visible form values to the manual-ingest payload, including generated `sourceRef` and `receivedAt`.
- [x] Handle pending, success, backend validation, duplicate, and network states without duplicate submissions or lost form input.
- [x] Run `npm run build` from `front-end`.
- [ ] Run `npm run lint` from `front-end`; existing errors in unrelated files currently prevent a clean result.
- [x] Verify in Safari against a running backend: dialog open, required content, successful `201` submission, dialog close, and success message. Pending-button behavior, error display, responsive layout, keyboard focus, and unchanged feedback filtering/export remain covered by the existing implementation but were not separately automated.
- [x] Confirm the new raw record is stored as `NEW`; verify separately that appearance in the processed list depends on the existing processing pipeline.

## Risks and Tradeoffs

- **Delayed list visibility:** The write endpoint stores `raw_feedback`, while the table reads processed `feedback`. A success confirmation is accurate; immediate table insertion would fabricate a record shape the API did not return. Polling is deferred until the processing pipeline has a documented completion/status contract.
- **Duplicate protection:** A generated UUID-based manual reference avoids normal collisions. The backend remains authoritative and returns `409` if a collision occurs.
- **Validation:** Native constraints cover required and maximum-length rules, while backend errors remain visible. React Hook Form and Zod are already installed but add unnecessary code for this single form.
- **Component placement:** Keeping the dialog local minimizes files and keeps this feature next to its only caller. Extract it only if another page needs the same manual-ingest form or the page becomes difficult to maintain.
- **Category hint:** The form sends the selected category name as a hint; final classification remains part of downstream processing.
