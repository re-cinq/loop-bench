# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore` and `MongoSessionStore` already expose the real WebSocket upgrade, frame validation and store seams, so the acceptance tests drive real sockets against the engine today and fail because `list_conversations`, `conversation_list` and `transport.history` are absent.

## Done when these pass

- [ ] **lists the user conversations newest first, pages with before, and resumes a chosen id** — With `transport.history: {enabled: true}` and `transport.resume: {enabled: true}`, `list_conversations` returns one `conversation_list` (and no `stream_end`) with the user's conversations (including the connection's own fresh conversation) newest first and ISO timestamps, pages via `before: {updatedAt, sessionId}`, leaves `ConnectedMessage` unchanged, and lets a reconnect with `?sessionId=<id>` resume a listed conversation.
  `src/conversationList.acceptance.test.ts`

- [ ] **reads the user id from the socket, forwards the cursor, and answers while a turn streams** — Ignores any `userId` on the incoming frame to call `store.listFor` with `ws.userId` and `{limit, before}`, and answers `list_conversations` off the per-session lock before an in-flight `user_message` finishes streaming.
  `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations statically, checking integer limits and two-part cursors** — `validateMessage` accepts bare and bounded `list_conversations` frames regardless of `history` configuration (stripping extra fields), accepts integer `limit` in `1..200` and `{updatedAt, sessionId}` cursors, and rejects invalid `limit` or malformed/partial `before` values with an error naming the field.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off or the store cannot list, and warns without resume** — Answers `list_conversations` with one `error` frame carrying `UNSUPPORTED` (and no `conversation_list`) when `transport.history` is omitted or `{enabled: false}`, when the store implements no `listFor`, or when `MongoSessionStore` built on a collection without `find` throws `StoreCannotList`, and logs a startup warning when `transport.history` is enabled without `transport.resume`.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers a rejecting listFor with SERVER_ERROR, hides store detail, and keeps the socket open** — When `store.listFor` rejects with any other error, answers with one `error` frame carrying `SERVER_ERROR` and no store detail on the wire, keeps the WebSocket connection open, and logs the failure with `sessionId` and no user conversation content.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts` and export `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor` and `ConversationSummary` from `src/types/messages.ts` and `src/index.ts`, extending the `IncomingMessage`/`OutgoingMessage` unions and their compile-time exhaustiveness fixture
- [ ] Validate `list_conversations` statically in `src/transport/ws/validation.ts` (`limit` integer `1..200`, `before` `{updatedAt, sessionId}` with parseable ISO timestamp and non-empty `sessionId`, stripping unknown fields)
- [ ] Add and export `StoreCannotList` from the package root and throw it from `MongoSessionStore.listFor` when `collection.find` is absent
- [ ] Add `ConversationHistoryOptions` (`transport.history?: {enabled: boolean}`, default disabled, mirroring `SessionResumeOptions`'s GDPR retention comment pointing at #41) across `src/config.ts` and `src/transport/createServer.ts`, logging a startup warning when `history.enabled` is true without `resume.enabled`
- [ ] Handle `list_conversations` outside `PerSessionLock` in `src/transport/ws/messageHandler.ts` (with a sender helper in `src/transport/ws/sender.ts`), answering `UNSUPPORTED` when disabled, missing `listFor`, or catching `StoreCannotList`, answering `SERVER_ERROR` with a generic message and `sessionId`-scoped error log on other rejections, and mapping `SessionSummary` dates to ISO strings in `conversation_list`
- [ ] Update `example/full-config.ts`, synced doc blocks (`npm run docs:fix`), and `CHANGELOG.md`

## Out of scope

- Conversation titles or message-derived previews (#145)
- Switching the open socket's session in place rather than reconnecting with `?sessionId=<id>`
- Client-side UI, server-side cursor state, an operator view of another user's conversations, and live sync between open tabs (#124)