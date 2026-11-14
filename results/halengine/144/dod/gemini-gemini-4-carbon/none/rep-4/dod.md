# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine`, the WebSocket upgrade/message pipeline, `validateMessage`, `InMemorySessionStore`, and `MongoSessionStore` already exist and accept real frames over real sockets, so the acceptance tests exercise the public entry points directly and fail today because `list_conversations`, `conversation_list`, `transport.history`, `ErrorCodes.UNSUPPORTED`, and `StoreCannotList` are not yet implemented.

## Done when these pass

- [ ] **lists the authenticated user's conversations newest first, pages by cursor, ignores a frame userId, and resumes a listed id** — With `transport.history` and `transport.resume` enabled, answers `list_conversations` from `store.listFor(ws.userId, {limit, before})` (ignoring any `userId` on the frame), serialises four-field `ConversationSummary` rows with ISO string `createdAt` and `updatedAt` and no `stream_end`, pages via `{updatedAt, sessionId}` cursor, and rejoins a returned `sessionId` over `?sessionId=`.
      `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations limits and composite cursors, rejecting malformed fields as INVALID_MESSAGE** — Accepts bare and cursor-paged `list_conversations` frames while stripping unknown fields, rejects non-integer or out-of-bounds `limit` (`1`–`200`) and non-cursor or unparseable `before` values with field-identifying errors, and answers invalid frames on the wire with `INVALID_MESSAGE` and no `stream_end`.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without store detail when listing fails** — Exports `ErrorCodes.UNSUPPORTED` and `StoreCannotList`, keeps `ConnectedMessage` unchanged, warns at startup when `transport.history` is enabled without `transport.resume`, answers `UNSUPPORTED` (with no `conversation_list` or `stream_end`) when `history` is off, `store.listFor` is absent, or `MongoSessionStore` throws `StoreCannotList` on a collection without `find`, and answers a rejecting `listFor` with `SERVER_ERROR` carrying no store detail while logging `sessionId` without user content and keeping the socket open.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message turn is still streaming on the same session** — Handles `list_conversations` outside `PerSessionLock` so a client receives `conversation_list` mid-turn before the active turn's `stream_end`.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Export `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage`, `ErrorCodes.UNSUPPORTED`, and `StoreCannotList` from the message/store types and `src/index.ts` (additive-only in `src/types/messages.ts`), and raise `StoreCannotList` in `MongoSessionStore.listFor` when its collection implements no `find`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer `1`–`200`, composite `before: {updatedAt, sessionId}` cursor with parseable `updatedAt` and non-empty `sessionId`).
- [ ] Thread `history?: {enabled: boolean}` (carrying the retention note mirroring `SessionResumeOptions` and pointing at #41) through `HalEngineConfig['transport']`, `createHalEngine`, `HalServerOptions`, `createServer`, and `createMessageHandler`, logging a startup warning when `history.enabled` is `true` while `resume?.enabled` is not.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside `PerSessionLock`: answer `UNSUPPORTED` when history is off, `listFor` is absent, or `StoreCannotList` is thrown; otherwise call `store.listFor(ws.userId, {limit, before})`, send `conversation_list` with ISO timestamps and no `stream_end`, and map unexpected rejections to `SERVER_ERROR` logged with `sessionId`.
- [ ] Complete documentation and spec updates (`docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`, `specs/hal-engine-conversation-list/spec.md`, `CHANGELOG.md`).

## Out of scope

- Conversation titles (`title?: string`), auto-naming, and client rename frames (#145).
- Deleting a conversation from the client over WebSocket (#41 covers consumer-side erasure).
- Filtering, searching, or full-text indexing conversations server-side.
- Operator views of another user's conversations.
- Live synchronisation between multiple open tabs (#124).