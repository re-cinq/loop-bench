# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. ... The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `InMemorySessionStore`, `MongoSessionStore`, `validateMessage`, and WebSocket transport already exist as real entry points, so the acceptance tests exercise the real WebSocket protocol and session stores today and fail because `list_conversations`, `conversation_list`, `transport.history`, and `ErrorCodes.UNSUPPORTED` are not implemented yet.

## Done when these pass

- [ ] **delivers only the authenticated user conversations newest first, pages with before, and resumes a listed id** — With `transport.history: {enabled: true}` and `transport.resume: {enabled: true}`, `list_conversations` ignores any frame-supplied `userId`, calls `store.listFor` with `ws.userId` and `{limit, before}`, returns one `conversation_list` frame with ISO-string timestamps and no `stream_end`, leaves `connected` keys unchanged, and allows reconnecting with `?sessionId=<id>` to resume the chosen conversation.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is omitted, when the store omits listFor, or when MongoSessionStore cannot find** — Refuses `list_conversations` with an `error` frame carrying code `UNSUPPORTED` (never an empty `conversation_list`) when `transport.history` is omitted, when the store implements no `listFor`, or when `MongoSessionStore` throws `StoreCannotList` on a collection without `find`.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR with no store detail when listFor rejects, keeps the socket open, and logs the sessionId without user content** — Handles an unexpected `store.listFor` rejection by replying with `SERVER_ERROR` without internal store details, keeping the WebSocket open for subsequent frames, and logging the failure with `sessionId` and no user content.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations off the per-session lock while a user_message stream is still open** — Routes `list_conversations` beside `ping` off `PerSessionLock` so a request sent during an in-flight `user_message` turn is answered before `stream_end`.
      `src/conversationList.acceptance.test.ts`
- [ ] **validates list_conversations frames, stripping extra fields and refusing bad limit or before values by field name** — Accepts `list_conversations` with optional integer `limit` (1-200) and composite `{updatedAt, sessionId}` cursor `before`, strips extra fields like `userId`, and rejects invalid `limit` or incomplete/invalid `before` cursors with an error naming the field.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` (additive only) to `src/types/messages.ts`, add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`, and export `StoreCannotList` from `src/types/sessionStore.ts` (and `src/index.ts`), plus unit tests pinning existing message literals compile unchanged.
- [ ] Add `list_conversations` validation in `src/transport/ws/validation.ts` (`limit` integer 1-200, `before` `{updatedAt, sessionId}` cursor of ISO timestamp and non-empty session id, stripping extra fields).
- [ ] Add `sendConversationList` in `src/transport/ws/sender.ts` and handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts` (gating on `history.enabled`, checking `store.listFor`, mapping `StoreCannotList` to `UNSUPPORTED` and other rejections to `SERVER_ERROR` logged with `sessionId`).
- [ ] Thread `SessionHistoryOptions` (`transport.history?: {enabled: boolean}` with retention note pointing at #41) through `src/config.ts` and `src/transport/createServer.ts`, emit a startup warning when `history.enabled` is set without `resume.enabled`, and update `MongoSessionStore` to throw `StoreCannotList` when `collection.find` is absent.
- [ ] Update `example/full-config.ts`, regenerate `docs/getting-started.md` via `npm run docs:fix`, extend `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`, update `CHANGELOG.md` under `## [Unreleased]`, and run `npm run verify`.

## Out of scope

- A preview or title on conversation summaries
- Deleting a conversation from the WebSocket client
- Server-side paging state (the client pages with `before`)
- Operator view of another user's conversations
- Live sync between open tabs