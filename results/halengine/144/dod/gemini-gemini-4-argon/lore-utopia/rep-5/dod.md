# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message loop already exist in `src/transport/createServer.ts`, so acceptance tests can connect a real WebSocket client and send `list_conversations` frames today, failing because the frame is rejected as an unknown message type (`INVALID_MESSAGE`).

## Done when these pass

- [ ] **delivering a conversation list over the websocket › lists the connecting user's conversations newest first as ISO summaries, forwards the cursor, and resumes a chosen row** — With `history: {enabled: true}` and `resume: {enabled: true}`, a `list_conversations` frame returns a `conversation_list` frame carrying the connecting user's summaries newest first with ISO-string timestamps, ignores any frame-supplied `userId` in favour of `ws.userId`, forwards `limit` and composite `before` cursor `{updatedAt, sessionId}` to `store.listFor`, and allows reconnecting with `?sessionId=<id>` from the list to resume that conversation.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a conversation list over the websocket › refuses a list with UNSUPPORTED when history is off or the store lacks listFor, INVALID_MESSAGE on bad bounds, and SERVER_ERROR when the store rejects** — Refuses `list_conversations` with `UNSUPPORTED` when `history` is not enabled or when the store lacks `listFor` (or throws `StoreCannotList`), returns `INVALID_MESSAGE` naming the offending field when `limit` or `before` is invalid, and returns `SERVER_ERROR` without leaking store error details when `listFor` rejects.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a conversation list over the websocket › answers list_conversations while a user_message is streaming, without waiting on the session lock** — Answers `list_conversations` on the non-locked path beside `ping` so a request sent during an active streaming turn arrives before that turn's `stream_end`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts` (and union members on `IncomingMessage` / `OutgoingMessage`), `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`, and `StoreCannotList` (thrown by `MongoSessionStore` when its collection lacks `find`) exported from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer 1–200 when present; `before` composite `{updatedAt, sessionId}` cursor with a valid date string and non-empty `sessionId` when present; strip extra fields such as `userId`).
- [ ] Add `ConversationHistoryOptions` (`{enabled: boolean}` with GDPR retention note pointing at #41) to `HalEngineConfig.transport.history` and `HalServerOptions.history`, warning at startup when `history.enabled` is true without `resume.enabled`, and thread `sessionStore` and `history` into `createMessageHandler` to answer `list_conversations` off the per-session lock.
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts` (regenerating `docs/getting-started.md` via `npm run docs:fix`), and `CHANGELOG.md`.

## Out of scope

- Previews or titles on summaries (#145).
- Deleting a conversation from the client over the WebSocket.
- Server-side paging state (clients page with `before`).
- Operator views of another user's conversations.
- Live sync of conversation lists across open tabs (#124).