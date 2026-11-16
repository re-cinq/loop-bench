# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The entry points (`createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore`, and `MongoSessionStore`) already exist and accept WebSocket frames and configuration options directly, so the acceptance tests exercise the real socket boundary and frame validator today and fail because `list_conversations` and `transport.history` are not implemented yet.

## Done when these pass

- [ ] **delivers the authenticated user list newest-first with ISO timestamps, pages with before and limit, includes the active session, and resumes a picked id** — Verifies `conversation_list` delivery over WebSocket with `ws.userId` ownership, `{limit, before}` forwarding, active session inclusion, ISO string dates, no `stream_end`, and `?sessionId=` resume.
  `src/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with UNSUPPORTED when history is off, when the store omits listFor, or when Mongo has no find, and warns at startup when resume is off** — Verifies `UNSUPPORTED` error responses for disabled `transport.history`, missing `listFor`, and `StoreCannotList`, unchanged `ConnectedMessage` without resume, and the startup warning when `history` is enabled without `resume`.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers a rejecting listFor with SERVER_ERROR without leaking store details, keeps the socket open, and logs the failure with sessionId** — Verifies safe `SERVER_ERROR` handling, open socket continuity via `ping`/`pong`, and structured logging with `sessionId` and no user content.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message turn is streaming without waiting for stream_end** — Verifies `list_conversations` runs off `PerSessionLock` beside `ping`.
  `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations frames with optional integer limit 1-200 and composite before cursor, rejecting malformed fields** — Verifies `validateMessage` accepts valid `list_conversations` frames, drops extra fields (`userId`), and rejects invalid `limit` or incomplete/malformed `before` cursors naming the field.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage` to `src/types/messages.ts` and `ErrorCodes.UNSUPPORTED` to `src/types/session.ts` without modifying existing union members or `ConnectedMessage`.
- [ ] Add `StoreCannotList` error class (exported from `src/index.ts` and thrown by `MongoSessionStore.listFor` when `collection.find` is absent).
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts` for optional integer `limit` (1-200) and composite `before` (`{updatedAt, sessionId}`), stripping extra fields.
- [ ] Add `transport.history?: {enabled: boolean}` (with `SessionHistoryOptions` retention JSDoc) to `HalEngineConfig` and `HalServerOptions`, warning at startup if enabled without `transport.resume`.
- [ ] Implement non-locked `list_conversations` handling in `src/transport/ws/messageHandler.ts` and `src/transport/ws/sender.ts`, wiring `sessionStore` and `history` from `src/transport/createServer.ts`.
- [ ] Add `list_conversations` / `history` config to `example/full-config.ts`, regenerate `docs/getting-started.md` with `npm run docs:fix`, update `CHANGELOG.md`, and set spec `Status` / citations as required.

## Out of scope

- Previews or titles on conversation summaries.
- Client-initiated conversation deletion over WebSocket.
- Server-side paging state or operator views of another user's conversations.
- Live cross-tab conversation list pushes or synchronization.