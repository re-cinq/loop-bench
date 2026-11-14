# Definition of Done

> #143 gives a consumer `store.listFor(userId)` in server code, and #45 lets a WebSocket client reopen any conversation whose id it already has (`?sessionId=<id>`). Between the two is a gap in the protocol itself: the client has no way to learn which ids its user has, short of the consumer standing up an HTTP endpoint alongside the engine for a UI that otherwise speaks only WebSocket.

**Strategy: `direct`** — `createHalEngine` and the WebSocket upgrade/message pipeline already exist as public entry points and accept live `WebSocket` connections against real `InMemorySessionStore` and `MongoSessionStore` instances, failing today on `list_conversations` with `INVALID_MESSAGE`.

## Done when these pass

- [ ] **lists the connected user conversations as ISO summaries, pages by cursor, and resumes one** — With `transport.history: {enabled: true}` and `transport.resume: {enabled: true}`, `list_conversations` queries `store.listFor` with the authenticated connection's `userId` (ignoring any `userId` on the frame), answers `conversation_list` newest first with `{sessionId, createdAt, updatedAt, entryCount}` ISO summaries (including the connection's current conversation and leaking no entries or `authHeaders`) and no `stream_end`, pages via `limit` and `{updatedAt, sessionId}` cursor, leaves `ConnectedMessage` unchanged, and resumes a picked `sessionId` on `?sessionId=<id>` reconnect.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations during a streaming turn and refuses malformed limit or before** — `validateMessage({type: 'list_conversations'})` succeeds statically, `list_conversations` sent while a `user_message` turn is streaming is answered off `PerSessionLock` before `stream_end`, and invalid `limit` (`0`, `201`, `1.5`, `'10'`) or `before` (bare string, half-cursor, or unparseable `updatedAt`) frames receive `INVALID_MESSAGE` naming the field with no `stream_end`.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off or the store cannot list conversations** — `list_conversations` is answered with one `error` frame (`code: 'UNSUPPORTED'`) and no `conversation_list` or `stream_end` when `transport.history` is absent or `{enabled: false}`, when the `SessionStore` omits `listFor`, or when the store throws `StoreCannotList` (including `MongoSessionStore` on a collection without `find`).
  `src/conversationList.acceptance.test.ts`

- [ ] **answers SERVER_ERROR with no store detail, keeps the socket open, and logs a failed listFor** — When `store.listFor` rejects with an error other than `StoreCannotList`, the server sends one `error` frame (`code: 'SERVER_ERROR'`) containing no store error detail, keeps the WebSocket connection open, and logs the failure at `error` with `sessionId` and no user conversation content.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Export `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor`, `ErrorCodes.UNSUPPORTED`, `StoreCannotList` (thrown by `MongoSessionStore.listFor` when `collection.find` is absent), and `ConversationHistoryOptions` / `transport.history?: {enabled: boolean}` on `HalServerOptions` and `HalEngineConfig` (re-exported from `src/index.ts`), warning at startup when `transport.history` is enabled without `transport.resume`.
- [ ] Extend `validateMessage` to accept `list_conversations` statically (`limit` optional integer `1`–`200`, `before` optional `{updatedAt: string, sessionId: string}` with both halves present and `Date.parse(updatedAt)` finite, stripping unknown fields) and add `sendConversationList` in `src/transport/ws/sender.ts`.
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts` (wired through `connectionHandler.ts` / `createServer.ts` / `config.ts`) using `ws.userId`, answering `UNSUPPORTED` when disabled, when `store.listFor` is absent, or on `StoreCannotList`, and `SERVER_ERROR` (with `sessionId` logged and no store detail or user content leaked) when `listFor` rejects.
- [ ] Update `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), `specs/hal-engine-conversation-list/spec.md` if needed, and `CHANGELOG.md` under `## [Unreleased]`.

## Out of scope

- Conversation titles, snippets, or search/filter server-side (follow-up #145; paging uses `before`).
- Operator views of another user's conversations.
- Live sync between open tabs (#124).