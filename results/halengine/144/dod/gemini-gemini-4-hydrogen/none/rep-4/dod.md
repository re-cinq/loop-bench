# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — Existing entry points (`validateMessage`, `createHalEngine`, `createServer`, `InMemorySessionStore`, and `MongoSessionStore`) already accept WebSocket connections and store options, so all five acceptance tests execute directly against real sockets and stores and fail on the absent protocol behavior.

## Done when these pass

- [ ] **validates list_conversations with optional integer limit 1-200 and composite before cursor, and refuses bad values by field name** — Accepts `{type: 'list_conversations'}` with optional `limit` (1–200) and `before` (`{updatedAt, sessionId}`), drops unknown fields such as `userId`, and rejects invalid `limit` or `before` with an error naming the field.
      `src/conversationList.acceptance.test.ts`

- [ ] **delivers the connecting user own conversation list newest first with ISO timestamps, ignores frame userId, pages with limit and before, and resumes a listed id** — Returns `conversation_list` (no `stream_end`) with only the authenticated user's conversations ordered newest-first with ISO timestamps, forwards `{limit, before}` and `ws.userId` to `store.listFor`, and lets the client reconnect with `?sessionId=` to resume a listed row.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before a streaming user_message finishes on the same session** — Dispatches `list_conversations` off the per-session lock so a request sent mid-stream arrives before `stream_end`.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, when the store omits listFor, or when StoreCannotList is thrown, and SERVER_ERROR without store details when listFor rejects** — Exposes `ErrorCodes.UNSUPPORTED`, preserves `ConnectedMessage`, answers `UNSUPPORTED` when `history` is off, `listFor` is absent, or `StoreCannotList` is thrown, and answers `SERVER_ERROR` without store detail while keeping the socket open and logging `sessionId` when `listFor` rejects.
      `src/conversationList.acceptance.test.ts`

- [ ] **warns at startup when history is enabled without resume** — Logs a startup warning when `transport.history` is enabled without `transport.resume`.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary`, and `ErrorCodes.UNSUPPORTED` in `src/types/messages.ts` and `src/types/session.ts`, and re-export them from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` for `list_conversations` (`limit` 1–200 integer, composite `before` cursor `{updatedAt, sessionId}`, stripping extra fields).
- [ ] Export `StoreCannotList` from `src/infrastructure/stores/mongo/mongoSessionStore.ts` (and `src/index.ts`) and throw it when the injected collection lacks `find`.
- [ ] Add `transport.history?: {enabled: boolean}` to `HalEngineConfig` and `HalServerOptions`, warn at startup when `history.enabled` is true without `resume.enabled`, and thread `history` + `sessionStore` into the WS message handling path.
- [ ] Handle `list_conversations` off the per-session lock in `src/transport/ws/connectionHandler.ts` / `messageHandler.ts` / `sender.ts`, enforcing `ws.userId`, mapping `StoreCannotList` and absent `listFor`/disabled `history` to `UNSUPPORTED`, and mapping unexpected rejections to `SERVER_ERROR` with sanitized client errors and `sessionId`-scoped logging.
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, `specs/hal-engine-websocket-protocol/spec.md`, `docs/`, `example/full-config.ts`, and `CHANGELOG.md` as required by the ticket.

## Out of scope

- Title, snippet, or preview fields on `ConversationSummary` (#145).
- Conversation delete, rename, or search frames over WebSocket.
- Server-side query caching across pages (clients page with `before`).
- Operator views of another user's conversations or live multi-tab synchronization (#124).