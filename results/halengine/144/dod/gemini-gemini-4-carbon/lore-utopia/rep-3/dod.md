# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `validateMessage`, `createHalEngine`, `InMemorySessionStore`, and `MongoSessionStore` already provide real entry points; the acceptance tests exercise them directly over real WebSocket connections and fail today because `list_conversations`, `conversation_list`, `StoreCannotList`, `ErrorCodes.UNSUPPORTED`, and `transport.history` are absent.

## Done when these pass

- [ ] **validates list_conversations bounds and cursor, and drops any extra field** — keeps existing protocol literals compiling, accepts `{type: 'list_conversations'}` bare or with `limit` (`1`–`200`) and a `{updatedAt, sessionId}` cursor while dropping extra fields such as `userId`, and rejects invalid `limit` or `before` values (including a cursor missing either half) with a message naming the field
  `src/conversationList.acceptance.test.ts`

- [ ] **lists the connected user conversations newest first, pages, and resumes a picked id** — with `transport.history: {enabled: true}`, answers one `conversation_list` frame (no `stream_end`) carrying only the connected user's own summaries newest first (the connection's own conversation included) with ISO timestamp strings and no entries or credentials, forwards `limit` and `before` to `store.listFor(ws.userId, ...)`, leaves `ConnectedMessage` unchanged, and lets the client rejoin a listed `sessionId` via `?sessionId=`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before stream_end while a turn is still streaming** — handles `list_conversations` outside `PerSessionLock` so a request sent during an active `user_message` stream is answered before that turn's `stream_end`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when disabled or incapable, and SERVER_ERROR when listFor rejects** — exports `ErrorCodes.UNSUPPORTED` and `StoreCannotList` (thrown by `MongoSessionStore.listFor` when `collection.find` is absent), warns at startup when `transport.history` is enabled without `transport.resume`, answers `UNSUPPORTED` when `transport.history` is off, when `listFor` is absent, or when `listFor` throws `StoreCannotList`, and answers any other `listFor` rejection with `SERVER_ERROR` carrying no store detail while keeping the socket open and logging `sessionId` without user content
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts` (into `IncomingMessage` and `OutgoingMessage`, re-exported from `src/index.ts`), `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, and `StoreCannotList` thrown by `MongoSessionStore.listFor` when `collection.find` is absent and re-exported from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer `1`–`200`, `before` object carrying both `updatedAt` accepted by `Date.parse` and `sessionId`), stripping unknown fields and naming `limit` or `before` on failure.
- [ ] Add opt-in `history?: {enabled: boolean}` (mirroring `SessionResumeOptions`' #41 retention JSDoc note and re-exported on `src/index.ts`) across `HalEngineConfig.transport` and `HalServerOptions`, warning at startup when `history.enabled` is true without `resume.enabled`.
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/` using `ws.userId` alone, serializing `createdAt`/`updatedAt` to ISO strings in `conversation_list`, answering `UNSUPPORTED` when disabled, lacking `listFor`, or catching `StoreCannotList`, and answering other `listFor` rejections with `SERVER_ERROR` (sanitized wire message, socket kept open, error logged with `sessionId` and no user content).
- [ ] Document `transport.history` in `example/full-config.ts` (regenerating `docs/getting-started.md` via `npm run docs:fix`) and `docs/session-stores.md`, and add a consumer-facing entry under `## [Unreleased]` in `CHANGELOG.md`.

## Out of scope

- Conversation titles or previews on summaries (#145).
- Deleting or renaming a conversation from the WebSocket protocol.
- Server-side search or filtering of conversations beyond cursor pagination with `before` and `limit`.
- Operator views of another user's conversations.
- Live synchronization of conversations between multiple open tabs (#124).