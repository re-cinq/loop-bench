# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `InMemorySessionStore.listFor`, and `MongoSessionStore.listFor` already form a live WebSocket-to-store seam; sending `list_conversations` over an authenticated socket executes end to end today and fails directly on protocol behaviour (`INVALID_MESSAGE` instead of `conversation_list` or `UNSUPPORTED`).

## Done when these pass

- [ ] **lists only the connecting user conversations newest first as ISO summaries, pages with limit and before, and resumes a listed id** — with `transport.history.enabled` on, answers `list_conversations` with one `conversation_list` of four-field ISO-timestamped summaries for `ws.userId` (ignoring a `userId` in the frame), forwards `limit` and composite `before`, leaves `ConnectedMessage` unchanged with no `stream_end`, and rejoins a listed `sessionId` via `?sessionId=`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message is streaming on the same session, before stream_end** — handles `list_conversations` outside `PerSessionLock` so an in-flight turn never blocks history listing
  `src/conversationList.acceptance.test.ts`

- [ ] **rejects malformed limit or before fields with INVALID_MESSAGE naming the field while accepting a bare list_conversations** — accepts `{type: 'list_conversations'}` and rejects out-of-range or non-integer `limit` (`1..200`) and non-cursor, partial-cursor, or non-ISO `before` values with `INVALID_MESSAGE` naming `limit` or `before`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without store detail when listFor rejects** — answers `UNSUPPORTED` when `transport.history` is absent/disabled, when the store has no `listFor`, or when the store throws `StoreCannotList` (such as `MongoSessionStore` on a collection without `find`), and answers `SERVER_ERROR` with no store detail while keeping the socket open and logging `sessionId` without user content when `listFor` rejects
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage`, and `ErrorCodes.UNSUPPORTED = 'UNSUPPORTED'`, and export them from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer in `1..200`, composite `{updatedAt, sessionId}` ISO cursor on `before`).
- [ ] Add and export `StoreCannotList` from the session-store types/package root and throw it from `MongoSessionStore.listFor` when the injected collection implements no `find`.
- [ ] Add `history?: {enabled: boolean}` (default off, mirroring `SessionResumeOptions`' GDPR retention note pointing at `#41`) to `HalEngineConfig.transport` and `HalServerOptions`, threading it through `createHalEngine` and `createServer` and warning at startup when `history.enabled` is on without `resume.enabled`.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside `PerSessionLock`, reading `ws.userId` only, serializing `SessionSummary` dates to ISO strings with `sendConversationList`, returning `UNSUPPORTED` or redacted `SERVER_ERROR` as specified, and logging store failures with `sessionId` and no user content.
- [ ] Update `CHANGELOG.md`, `example/full-config.ts` (regenerating `docs/getting-started.md` via `npm run docs:fix`), `docs/adding-a-message-type.md`, and specs so all repository doc, spec, and changelog gates pass.

## Out of scope

- Conversation titles (`#145` adds optional `title` on the summary later).
- Renaming or deleting conversations over the WebSocket (`#41` owns erasure).
- Server-side cursor state (the client pages statelessly with `before`).
- Operator views of another user's conversations.
- Live conversation-list sync across open tabs (`#124` ruled it out).