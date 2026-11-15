# Definition of Done

> #143 gives a consumer `store.listFor(userId)` inside the server process. The client on the other end of the WebSocket has no way to ask for it, and the consumer who wants a conversation picker without standing up their own REST endpoint has to write one anyway.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message pipeline already exist and accept frames over a real WebSocket connection, so acceptance tests can connect today, send `list_sessions` frames, and fail directly on the missing `session_list` and `list_sessions` validation/dispatch behaviour.

## Done when these pass

- [ ] **listing conversations over the WebSocket protocol › answers list_sessions for the authenticated user with ISO dates, forwarding limit and before while ignoring any client userId** — Sends `{type: 'list_sessions', limit, before, userId}` over a connected WebSocket and verifies `store.listFor` is called with the socket's authenticated `userId` (`session.userId`) and `{limit, before}`, answering `{type: 'session_list', sessions}` with `createdAt` and `updatedAt` serialised as ISO-8601 strings.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws** — Verifies that a store without `listFor` answers `{type: 'session_list', sessions: []}` and a store whose `listFor` throws/rejects logs an error under category `'ws'` with the userId and error message and answers `{type: 'error', code: 'SERVER_ERROR'}`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › accepts a bare list_sessions frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor** — Verifies that `{type: 'list_sessions'}` is accepted while non-integer or negative `limit` values and malformed `before` cursors (`sessionId` outside 1–128 chars or unparseable `updatedAt`) are rejected with `INVALID_MESSAGE` without invoking `store.listFor`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [x] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate bare `list_sessions` frames in `src/transport/ws/validation.ts`, dropping unknown fields such as `userId` (round 1). The `limit`/`before` validation is the facet below.
- [x] Validate `limit` (optional non-negative integer) on `list_sessions` in `src/transport/ws/validation.ts`, rejecting malformed values with `INVALID_MESSAGE` (round 2).
- [x] Validate `before` (object with 1–128 char `sessionId` and finite-date `updatedAt`) on `list_sessions` in `src/transport/ws/validation.ts`, rejecting malformed values with `INVALID_MESSAGE`. Split out of the limit facet in round 2. (round 3)
- [x] Forward validated `limit` and `before` from `validateMessage` into `listFor` (validation currently returns a bare `{type:'list_sessions'}`; the data it returns must carry them). Round 4: validation now returns `limit` and `before` on the data; the `listFor` call itself is the handler facet below.
- [ ] Round 2 CI findings: spec anchors repointed (`spec:names`), `CHANGELOG.md` entry added. Still open and not fixed here: eslint `no-duplicate-code` and `prefer-early-return` findings inside `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts`, which live in acceptance/existing test files this round must not edit. Round 3 fixed the `validation.ts` `prefer-polymorphism` finding (lookup table) and the `validation.test.ts` `require-spec-link` findings (spec §4.3 citations); the acceptance and `sessionResume.test.ts` findings remain open.
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`. (round 5)
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`. Round 5 closed the happy path (`answerListSessions`, off the lock, `session_list` with ISO dates, `[]` when no `listFor`); the error log with `userId` is the facet below.
- [x] Log a failing `list_sessions` via `log.error('ws', ...)` with `userId` and the error message in `src/transport/ws/messageHandler.ts`, still answering `SERVER_ERROR` (the acceptance test's failing-store case). (round 6, unit test in `messageHandler.test.ts`)
- [ ] Round 7 CI findings: spec anchors repointed again (`npm run spec:names -- --fix`, 77 citations; `spec:names`, `check:spec-links`, `check:spec-status` clean locally). The eslint `require-spec-link` findings were the same drift; the brief's eslint list was truncated, so any remaining eslint finding is unverified here.
- [x] Round 6 CI findings: the six `require-spec-link` eslint findings and the `spec:names` findings were drift from the repointed citations; `npm run spec:names --fix` repointed 77 citations and `check:spec-links`/`check:spec-status` pass locally. Still unverified here: the CI `test` step's failure (no detail in the brief) and any eslint findings the brief truncated.
- [x] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` (done round 7: §4.3 and §5.9) and `specs/hal-engine-conversation-list/spec.md` (round 8: §74-77 cite the tests).

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.