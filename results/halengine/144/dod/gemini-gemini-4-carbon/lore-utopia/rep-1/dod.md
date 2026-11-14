# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` already expose the exact frame-validation and live WebSocket upgrade seams, so the acceptance suite exercises `list_conversations` end to end over real sockets against real `InMemorySessionStore` and `MongoSessionStore` instances with no doubles.

## Done when these pass

- [ ] **validates list_conversations bounds and cursor, and drops extra fields** — `validateMessage` accepts `{type: 'list_conversations'}` independently of config with optional integer `limit` (`1..200`) and composite `{updatedAt, sessionId}` ISO cursor `before`, strips undeclared fields such as `userId`, keeps all pre-existing protocol message literals valid, and rejects out-of-range or non-integer limits and bare-string, half, or non-date cursors with messages naming the offending field
  `src/conversationList.acceptance.test.ts`

- [ ] **lists the connected user conversations newest first, pages, and resumes a row** — With `transport.history: {enabled: true}`, `list_conversations` answers once when asked (never pushed on connect) with `conversation_list` newest first (including the socket's own conversation) as ISO-dated summaries with no `stream_end` and `ConnectedMessage` unchanged, calls `store.listFor` with `ws.userId` (ignoring any `userId` in the frame) and `{limit, before}`, and reconnecting with `?sessionId=<id>` from a returned row resumes and replays that conversation
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations ahead of a streaming user_message** — `list_conversations` runs off `PerSessionLock` beside `ping`, so a request sent while a `user_message` turn is streaming receives `conversation_list` before that turn's `stream_end`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED or redacted SERVER_ERROR and warns without resume** — `ErrorCodes.UNSUPPORTED` and `StoreCannotList` are exported; `list_conversations` answers one `UNSUPPORTED` error frame when `history` is absent or `{enabled: false}`, when the store lacks `listFor`, or when `listFor` throws `StoreCannotList` (including `MongoSessionStore` on a `find`-less collection); enabling `transport.history` without `transport.resume` logs a startup warning; and a transient `listFor` rejection answers one redacted `SERVER_ERROR` frame while keeping the socket open and logging `sessionId` with no user content
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` (and union members) additively to `src/types/messages.ts`, add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`, and re-export the new public types from `src/index.ts`
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` with a `list_conversations` branch validating optional integer `limit` (`1..200`) and composite `{updatedAt, sessionId}` cursor `before`, stripping extra properties
- [ ] Define and export `StoreCannotList` and throw it from `MongoSessionStore.listFor` when the injected collection implements no `find`
- [ ] Add `transport.history?: {enabled: boolean}` (mirroring `SessionResumeOptions`' GDPR retention note pointing at #41) on `HalEngineConfig` and `HalServerOptions`, warn at startup when `history` is enabled without `resume`, and answer `list_conversations` off `PerSessionLock` in `messageHandler.ts` with `conversation_list`, `UNSUPPORTED`, or a redacted `SERVER_ERROR` (logging `sessionId` and no user content)
- [ ] Document `transport.history` and conversation listing via `example/full-config.ts` + `npm run docs:fix`, add the `CHANGELOG.md` entry under `## [Unreleased]`, and ensure spec citations and coverage floors pass `npm run verify`

## Out of scope

- Conversation titles or previews on summary rows
- Deleting a conversation from the client over the WebSocket
- Server-side paging state (clients page explicitly with `before`)
- Operator views of another user's conversations
- Live sync across multiple open tabs