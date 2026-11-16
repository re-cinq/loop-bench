# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. That is a second authorisation path to the same personal data, written once per consumer, each one able to get the ownership check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore`, and `MongoSessionStore` already expose the real WebSocket transport, validation, and session-store boundaries, so the acceptance tests call the real entry points directly and fail because `list_conversations` is not yet wired.

## Done when these pass

- [ ] **validates list_conversations frames, cursor shapes, and rejects invalid fields naming the field** — validates `list_conversations`, drops unknown fields like `userId`, and rejects invalid `limit` or `before` (including a half-cursor) naming the field
      `src/conversationList.acceptance.test.ts`

- [ ] **delivers conversation_list for the authenticated user, forwards paging options, and resumes a listed id** — enforces `ws.userId` over any spoofed frame `userId`, returns one `conversation_list` with ISO timestamps newest first (including the open session) and no `stream_end`, forwards `{limit, before}` cursor, preserves `ConnectedMessage`, and resumes a listed `sessionId` via `?sessionId=`
      `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, the store lacks listFor, or Mongo has no find, and warns without resume** — answers `error` (`UNSUPPORTED`) when `transport.history` is disabled, when the store has no `listFor`, or when `MongoSessionStore` throws `StoreCannotList`, and logs a startup warning when `history` is enabled without `resume`
      `src/conversationList.acceptance.test.ts`

- [ ] **answers SERVER_ERROR without leaking store details when listFor rejects, keeps the socket open, and logs the sessionId without user content** — isolates store errors from the client frame, keeps the WebSocket open for subsequent `ping`, and logs the failure with `sessionId` and no conversation content
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before stream_end while a user_message is streaming on the same session** — processes `list_conversations` off `PerSessionLock` beside `ping` so it does not block behind an in-flight turn
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (and export from `src/index.ts`), and add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts` without breaking existing `ConnectedMessage` or message literals
- [ ] Add `StoreCannotList` error class (exported from `src/index.ts`) and throw it from `MongoSessionStore.listFor` when `collection.find` is absent
- [ ] Add `list_conversations` validation in `src/transport/ws/validation.ts` (`limit` integer 1–200, `before` `{updatedAt, sessionId}` cursor with parseable ISO `updatedAt`, dropping unknown fields)
- [ ] Add `HistoryOptions` (`transport.history?: {enabled: boolean}`, default off) to `HalEngineConfig` and `HalServerOptions`, warn at startup when enabled without `resume`, and thread `sessionStore` + `history` into `createMessageHandler`
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts` using `session.userId`, forwarding `{limit, before}`, sending `conversation_list` with ISO timestamps, mapping disabled/missing-`listFor`/`StoreCannotList` to `UNSUPPORTED`, and mapping rejections to `SERVER_ERROR` logged with `sessionId`
- [ ] Extend `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md` with any remaining unit-test `([validated by: ...](...#Lnn))` citations (the 5 acceptance-test citations are wired in `specs/hal-engine-websocket-protocol/spec.md`), update `example/full-config.ts` and `npm run docs:fix` for `docs/getting-started.md`, update `CHANGELOG.md` under `## [Unreleased]`, and pass `npm run verify`

## Out of scope

- Conversation previews or titles on summaries
- Deleting conversations from the client over WebSocket
- Server-side paging state (client pages via `before`)
- Operator views of another user's conversations
- Live sync between open tabs