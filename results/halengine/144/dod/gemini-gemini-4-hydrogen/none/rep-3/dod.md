# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore`, and `MongoSessionStore` already expose the WebSocket and validation entry points, so the acceptance tests exercise real sockets and stores directly without stubs or parallel modules.

## Done when these pass

- [ ] **validates list_conversations with optional limit and cursor before, and rejects malformed bounds or half cursors** — `validateMessage` accepts `{type: 'list_conversations'}` with optional integer `limit` (1–200) and `{updatedAt, sessionId}` cursor `before`, strips extra fields like `userId`, and rejects out-of-range limits or single-half/unparseable `before` values naming the field.
      `src/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user conversations newest first with ISO stamps, pages by cursor, never pushes unsolicited, and resumes a listed id** — `createHalEngine` with `transport.history: {enabled: true}` calls `store.listFor` with `ws.userId` (ignoring frame `userId`) and `{limit, before}`, returns `conversation_list` newest first with ISO string timestamps (including the fresh session), emits no unsolicited list or `stream_end`, and lets `?sessionId=<id>` resume a listed conversation.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message turn is streaming on the same session without waiting for stream_end** — `list_conversations` runs off `PerSessionLock` beside `ping`, arriving before an in-flight `user_message` finishes streaming.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off, listFor is absent, or a Mongo collection lacks find, and SERVER_ERROR without leaking details when listFor rejects** — missing/disabled `history`, stores without `listFor`, and `StoreCannotList` (triggered by a Mongo collection without `find`) answer with `UNSUPPORTED` and no list, while a rejecting `listFor` answers `SERVER_ERROR` without store details, keeps the socket open, and logs `sessionId` with no user content.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationListMessage`, and `ConversationSummary` to `src/types/messages.ts` additively (touching no existing line and keeping `ConnectedMessage` unchanged), and add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Export `StoreCannotList` from `src/types/sessionStore.ts` / `src/index.ts`, throw it in `MongoSessionStore.listFor` when the collection lacks `find`, and mirror the GDPR/retention note on the new history options type.
- [ ] Add the `list_conversations` validator case to `src/transport/ws/validation.ts` (`limit` integer 1–200, `before` `{updatedAt, sessionId}` cursor).
- [ ] Wire `transport.history?: {enabled: boolean}` (default off, warning when enabled without `transport.resume`) through `HalEngineConfig` and `createServer` into `createMessageHandler`, handling `list_conversations` off-lock via `ws.userId` and logging `sessionId` on `listFor` rejection.
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, extend `example/full-config.ts` and regenerate `docs/getting-started.md` with `npm run docs:fix`, add a `CHANGELOG.md` entry under `## [Unreleased]`, and apply the MINOR version bump.

## Out of scope

- A preview or title on conversation summaries.
- Deleting a conversation from the client over WebSocket.
- Server-side paging state (the client pages with `before`).
- An operator view of another user's conversations.
- Live sync between open tabs.