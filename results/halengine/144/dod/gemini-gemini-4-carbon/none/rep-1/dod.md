# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` and the WebSocket frame validator already exist as real entry points; sending `list_conversations` over an authenticated WebSocket upgrade and calling `validateMessage` today fail directly on absent protocol behaviour (`Unknown message type: list_conversations`).

## Done when these pass

- [ ] **lists the user conversations newest first, pages by cursor, and resumes a listed id** — With `transport.history` and `transport.resume` enabled, `list_conversations` returns one `conversation_list` frame (no `stream_end`, `ConnectedMessage` unchanged) carrying only the authenticated user's conversations (the connection's own session included) ordered newest activity first with ISO-8601 `createdAt`/`updatedAt` strings, pages with `limit` and composite `before` (`{updatedAt, sessionId}`), and reconnecting with `?sessionId=<id>` resumes and replays the chosen conversation.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers from the connection user id while a turn is streaming, before stream_end** — A `list_conversations` frame carrying another user's `userId` ignores the frame's `userId`, calls `store.listFor` with `ws.userId` and `{limit, before}`, and answers off the per-session lock before an in-flight `user_message` turn's `stream_end`.
  `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations and refuses malformed limit or before cursors** — `validateMessage` accepts `list_conversations` regardless of whether history is enabled, strips undefined/extra fields such as `userId`, accepts `limit` (`1`–`200`) and composite `before` (`{updatedAt, sessionId}`), and rejects out-of-range/non-integer `limit` (`0`, `201`, `1.5`, `'10'`) or non-object/half/unparseable `before` cursors with an error naming the field.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when unavailable and SERVER_ERROR without store detail on failure** — Answers `error` with `UNSUPPORTED` when `transport.history` is absent (default off), when the store lacks `listFor`, or when the store throws `StoreCannotList` (such as `MongoSessionStore` built on a collection without `find`); logs a startup warning when `transport.history` is enabled without `transport.resume`; and when `listFor` rejects, answers `SERVER_ERROR` with no store detail, keeps the socket open, and logs the failure with `sessionId` and no user content.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts`, `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, `StoreCannotList` (thrown by `MongoSessionStore` when its collection lacks `find`), and export the new public types/values from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer `1`–`200`, composite `before` `{updatedAt, sessionId}` with parseable ISO timestamp and non-empty `sessionId`, stripping extra fields).
- [ ] Add `ConversationHistoryOptions` (`transport.history?: {enabled: boolean}`), thread it through `src/config.ts`, `src/transport/createServer.ts`, `src/transport/ws/connectionHandler.ts`, `src/transport/ws/messageHandler.ts`, and `src/transport/ws/sender.ts`, warn at startup when `history` is enabled without `resume`, and handle `list_conversations` off `PerSessionLock` with `ws.userId`, ISO-serialized summaries, `UNSUPPORTED`, and sanitized `SERVER_ERROR` + session-id logging.
- [ ] Update `example/full-config.ts`, `docs/getting-started.md`, `specs/hal-engine-conversation-list/spec.md`, `specs/hal-engine-websocket-protocol/spec.md`, and `CHANGELOG.md` (including `npm run docs:sync` if documented code regions change).

## Out of scope

- Conversation titles, snippets, or previews (`SessionSummary` carries timestamps and `entryCount` only).
- Switching the active conversation in place on an existing socket (reconnecting with `?sessionId=<id>` is the single mechanism).
- Server-side search/filtering beyond `limit` and `before` cursor pagination.
- Operator views of another user's conversations, or live multi-tab sync.