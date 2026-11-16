# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. That is a second authorisation path to the same personal data, written once per consumer, each one able to get the ownership check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `createMessageHandler`, `validateMessage`, and `SessionStore.listFor` already form the real WebSocket entry-point seam. All four acceptance tests call those entry points directly over a real WebSocket and fail today because `list_conversations` is not yet wired in the protocol types, validator, handler, or engine config.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list newest-first with paging, ignores any userId in the frame, and lets a client resume a listed id** — verifies opt-in `transport.history`, `ConnectedMessage` key stability, `ws.userId` enforcement, `listFor(ws.userId, {limit, before})` forwarding, ISO-string `ConversationSummary` wire shape, cursor paging across ties, inclusion of the active conversation, and end-to-end `?sessionId=` resume.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations ahead of an in-flight turn without waiting on the session lock** — verifies `list_conversations` is handled on the unlocked path beside `ping` so it returns `conversation_list` before a streaming `user_message` turn reaches `stream_end`.
  `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations and rejects invalid limit or before cursors naming the field** — verifies `validateMessage` accepts bare and `{limit, before}` frames while dropping extra fields like `userId`, and rejects out-of-range/non-integer `limit` and malformed or single-field `before` cursors with errors naming the offending field.
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, listFor is absent, or the store throws StoreCannotList, and SERVER_ERROR without leaking store details when listFor fails** — verifies `ErrorCodes.UNSUPPORTED` for disabled history, missing `listFor`, and `StoreCannotList` (including `MongoSessionStore` without `find`), startup warning when `history` is enabled without `resume`, and `SERVER_ERROR` without store error leaks while keeping the socket open and logging `sessionId` without user content.
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (additive only), add `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, and export `StoreCannotList` from the session store / package root.
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts` (`limit` integer 1-200; `before` cursor `{updatedAt, sessionId}` with parseable `updatedAt` and non-empty `sessionId`).
- [ ] Add `SessionHistoryOptions` (`{enabled: boolean}` with GDPR retention note pointing at #41), thread `history` through `HalEngineConfig.transport` and `createServer`, and log a startup warning when `history.enabled` is set without `resume.enabled`.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` off `PerSessionLock`, answering `conversation_list` via `store.listFor(ws.userId, {limit, before})`, `UNSUPPORTED` when disabled / missing `listFor` / `StoreCannotList`, and `SERVER_ERROR` (sanitized, logged with `sessionId`) on other store failures.
- [ ] Update `MongoSessionStore.listFor` to throw `StoreCannotList` when `collection.find` is absent.
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with trailing `([validated by: ...](...#Lnn))` links to the tests, update `example/full-config.ts` and regenerate `docs/getting-started.md` via `npm run docs:fix`, and add an `## [Unreleased]` entry in `CHANGELOG.md`.

## Out of scope

- Conversation previews or titles on `ConversationSummary`.
- Deleting or erasing conversations over WebSocket.
- Server-side paging state (clients page with the `before` cursor).
- Operator views of another user's conversations or live sync across open tabs.