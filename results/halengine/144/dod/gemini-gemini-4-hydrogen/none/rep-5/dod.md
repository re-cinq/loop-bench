# Definition of Done

> `#143` gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createHalEngine` (`src/config.ts`), `createServer` (`src/transport/createServer.ts`), `createMessageHandler` (`src/transport/ws/messageHandler.ts`), and `validateMessage` (`src/transport/ws/validation.ts`) already form the live WebSocket frame seam over `SessionStore.listFor`, so the acceptance tests connect real WebSocket clients through `createHalEngine` today and fail on the absent protocol behaviour.

## Done when these pass

- [ ] **lists only the authenticated user conversations newest first as ISO summaries, pages via before, omits stream_end, and resumes a listed id** — Verifies `transport.history.enabled`, `conversation_list` wire shape with ISO 8601 dates and no entries/credentials, ignoring spoofed `userId` in the frame in favour of `ws.userId`, cursor paging via `before`, no `stream_end`, unchanged `connected` fields, and resuming a listed id via `?sessionId=`.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without store detail when listFor rejects** — Verifies `UNSUPPORTED` when `transport.history` is absent, when the store omits `listFor` (`fiveMemberStore`), and when `MongoSessionStore` runs on a collection without `find` (`StoreCannotList`), plus `SERVER_ERROR` without store detail, socket remaining open, and error log carrying `sessionId` with no user content when `listFor` rejects.
  `src/conversationList.acceptance.test.ts`

- [ ] **accepts a bare list_conversations frame and rejects invalid limit or before fields with INVALID_MESSAGE naming the field** — Verifies `validateMessage` accepts `{type: 'list_conversations'}` and rejects out-of-range/non-integer `limit` and malformed or half-filled `before` cursors with `INVALID_MESSAGE` naming `limit` or `before`.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before stream_end while a user_message turn is streaming on the same session** — Verifies `list_conversations` runs off `PerSessionLock` and is answered immediately while a `user_message` turn is active on the same session.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage`, and `ErrorCodes.UNSUPPORTED` to `src/types/messages.ts` / `src/types/session.ts` and export the new types from `src/index.ts`.
- [ ] Add `StoreCannotList` in the store layer and throw it from `MongoSessionStore.listFor` when the collection implements no `find`.
- [ ] Validate `list_conversations` (optional integer `limit` 1-200, optional `{updatedAt, sessionId}` `before` cursor) in `src/transport/ws/validation.ts`.
- [ ] Add `transport.history?: {enabled: boolean}` (default off) on `HalEngineConfig` and `HalServerOptions`, warn at startup when `history.enabled` is true without `resume.enabled`, and thread `history` + `sessionStore` into `createMessageHandler`.
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts`: enforce opt-in and `listFor`/`StoreCannotList` (`UNSUPPORTED`), call `store.listFor(ws.userId, {limit, before})`, serialize ISO timestamps into `conversation_list`, and map unexpected store rejections to `SERVER_ERROR` logged with `sessionId` and no user content.
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` (including the GDPR rule), `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), and `CHANGELOG.md`.

## Out of scope

- An HTTP route for listing conversations (covered by `#145`).
- Conversation deletion from the client, search, or full-text filtering.
- Server-side total conversation count (the client pages with `before`).
- An operator view of another user's conversations.
- Live sync between open tabs.