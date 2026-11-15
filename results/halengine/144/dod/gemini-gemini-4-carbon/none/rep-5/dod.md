# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore`, and `MongoSessionStore` already expose the full WebSocket upgrade, frame validation, and session-store seams, so the acceptance suite exercises real upgraded WebSocket connections and `validateMessage` directly and fails on the absent `list_conversations` / `conversation_list` protocol behaviour.

## Done when these pass

- [ ] **lists the authenticated user conversations, pages by cursor, and resumes a chosen id** — With `transport.history: {enabled: true}` and `transport.resume: {enabled: true}`, `list_conversations` answers a single `conversation_list` (no `stream_end`, `ConnectedMessage` unchanged) carrying only the authenticated `ws.userId`'s summaries newest-first with ISO 8601 `createdAt`/`updatedAt` strings (including the current connection's session and ignoring any `userId` on the frame), forwards `limit` and `{updatedAt, sessionId}` `before` cursors to `store.listFor`, and lets the client reconnect to a listed id via `?sessionId=<id>`.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a turn streams without waiting on the session lock** — A `list_conversations` sent while a `user_message` turn is actively streaming on the same session is answered on the non-locked path before that turn's `stream_end`.
      `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations limits and composite cursors, naming the bad field** — `validateMessage` accepts `{type: 'list_conversations'}` (stripping extra fields) and valid `limit` (`1`–`200` integer) plus `{updatedAt, sessionId}` ISO cursor fields regardless of config, and rejects out-of-range/non-integer `limit` or malformed/partial `before` cursors with `INVALID_MESSAGE` naming the offending field.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, listFor is absent, or a collection lacks find** — `ErrorCodes.UNSUPPORTED` and `StoreCannotList` are exported from the package root; `list_conversations` is answered with `UNSUPPORTED` and no `conversation_list` when `transport.history` is omitted/off, when `store.listFor` is absent, or when `MongoSessionStore` lacks `collection.find` (throwing `StoreCannotList`); and enabling `transport.history` without `transport.resume` logs a startup warning while still answering `conversation_list`.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers a failing store with a generic SERVER_ERROR, stays open, and logs safely** — When `store.listFor` rejects with any other error, the server answers one `SERVER_ERROR` frame carrying no store detail, keeps the WebSocket open for subsequent frames, and logs the failure with `sessionId` and no conversation content.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts` and additive protocol types (`ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, `ConversationListMessage`) in `src/types/messages.ts` (re-exported from `src/index.ts`), plus a compile fixture pinning existing message literals.
- [ ] Add `StoreCannotList` error class, throw it from `MongoSessionStore.listFor` when `collection.find` is absent, and export it from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` for `list_conversations` (`limit` integer `1`–`200`, `before` composite `{updatedAt, sessionId}` cursor accepted by `Date.parse`, unknown fields dropped).
- [ ] Add `ConversationHistoryOptions` (`{enabled: boolean}`, with retention JSDoc mirroring `SessionResumeOptions` pointing at #41), thread `transport.history` through `HalEngineConfig` and `createServer`, and log a startup warning when `history.enabled` is true without `resume.enabled`.
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts` (and `sender.ts`), reading `ws.userId` exclusively, mapping `SessionSummary` dates to ISO strings, answering `UNSUPPORTED` when disabled / missing `listFor` / `StoreCannotList`, and answering generic `SERVER_ERROR` while logging `{sessionId}` on store rejection.
- [ ] Update `example/full-config.ts` + regenerate `docs/getting-started.md` via `npm run docs:fix`, extend `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md` (including GDPR statements and spec anchor links), and add an `## [Unreleased]` entry in `CHANGELOG.md`.

## Out of scope

- Conversation titles or message previews on `ConversationSummary`.
- Client-initiated conversation deletion or erasure frames over WebSocket.
- Server-side paging state (clients page statelessly with `before`).
- Operator views of another user's conversations.
- Live fan-out or cross-tab sync of `conversation_list` pushes.