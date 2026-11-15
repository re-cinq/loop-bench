# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `InMemorySessionStore`, and `MongoSessionStore` already provide real WebSocket upgrade, authentication, session storage, and message dispatch seams. All five acceptance tests connect real WebSocket clients against real servers and stores and fail today because `list_conversations` is rejected as `Unknown message type: list_conversations`.

## Done when these pass

- [ ] **returns the authenticated user's conversations newest first as ISO summaries without stream_end, ignoring any userId on the frame** — verifies `history: {enabled: true}` lists only `ws.userId`'s conversations newest first with ISO string timestamps, calls `listFor` with `ws.userId`, ignores any frame `userId`, and emits no `stream_end`
      `src/conversationList.acceptance.test.ts`
- [ ] **pages with limit and a composite before cursor, and lets a client resume any listed sessionId** — verifies `limit` and `{updatedAt, sessionId}` cursor paging reach `listFor`, tie-break correctly, and listed ids reconnect and replay under `resume: {enabled: true}`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations without waiting on a streaming turn, and rejects malformed limit or before with INVALID_MESSAGE** — verifies `list_conversations` runs off `PerSessionLock` while a `user_message` streams, and invalid `limit` or `before` values return `INVALID_MESSAGE` naming the field
      `src/conversationList.acceptance.test.ts`
- [ ] **refuses list_conversations with UNSUPPORTED when history is off, listFor is absent, or the store cannot list** — verifies default-off `transport.history`, a 5-member `SessionStore` without `listFor`, and `MongoSessionStore` on a collection lacking `find` (`StoreCannotList`) all return `error` with code `UNSUPPORTED`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers a rejecting listFor with SERVER_ERROR hiding store details, keeps the socket open, and logs the sessionId** — verifies store failures return `SERVER_ERROR` without leaking store internals, leave the socket open for subsequent frames, and log with `sessionId` and no user content
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `StoreCannotList` error class exported from `src/types/sessionStore.ts` and `src/index.ts`, and throw it from `MongoSessionStore.listFor` when the collection lacks `find`
- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` to `src/types/messages.ts` and `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, keeping `ConnectedMessage` unchanged
- [ ] Add `list_conversations` validation (`limit` integer 1-200, `before` `{updatedAt, sessionId}` cursor with both fields) in `src/transport/ws/validation.ts`
- [ ] Add `ConversationHistoryOptions` (`transport.history?: {enabled: boolean}`), thread it through `src/config.ts`, `src/transport/createServer.ts`, `src/transport/ws/connectionHandler.ts`, and `src/transport/ws/messageHandler.ts`, mirror `SessionResumeOptions`'s GDPR retention note pointing at `#41`, and log a startup warning when `history.enabled` is set without `resume.enabled`
- [ ] Document the GDPR metadata-only and deployer opt-in semantics in `specs/hal-engine-websocket-protocol/spec.md`, export new public types from `src/index.ts`, update `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), `CHANGELOG.md`, and bump the minor package version

## Out of scope

- A preview or title on conversation summaries
- Deleting a conversation from the client over WebSocket
- Server-side paging state (clients page via `before`)
- An operator view of another user's conversations
- Live synchronization between open tabs