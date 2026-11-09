# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seam already exists: a real engine (`createServer`) upgrades a real socket and `validateMessage` answers today, so every test calls the real entry point and fails on behaviour. Today each one fails with `Unknown message type: list_conversations` — the frames do not exist, which is the ticket's claim, not a missing import.

## Done when these pass

- [ ] **answers list_conversations with one conversation_list of the newest-first summaries as ISO strings, handing limit and before to the store as the frame sent them** — one `conversation_list` frame, store order preserved, times as ISO strings, only the four summary fields, and `{limit, before}` reaching `listFor` recorded as the frame sent them
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers with the list of the user the connection authenticated, never one a frame names** — a frame carrying another user's `userId` is answered with the connecting user's own list; `listFor` was called with the connection's `ws.userId`, asserted on the recorded argument
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **validates the frame whether or not the feature is on, refusing a bad limit or a half cursor by name** — plain frame valid; `limit` 0/201/1.5/'10' and a string or one-half `before` invalid, message naming the field; a frame-carried `userId` is dropped
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and never an empty list, when the feature is off or the store cannot answer** — history absent, a store without `listFor`, and a store throwing `StoreCannotList` all answer one `error` code `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a failing store with SERVER_ERROR, keeps the socket open and leaks nothing of the store** — one `SERVER_ERROR` frame whose message carries no store detail, the socket still answers a ping, the log names the session id and no store detail
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a list_conversations sent while a turn streams before that turn ends, without waiting on the lock** — the answer arrives while the turn is held and before its `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **rejoins, with nothing new, the conversation a client picked from its list** — an id taken from a `conversation_list` row, reconnected with `?sessionId=<id>`, answers `resumed: true` with that conversation's replay
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` and their two union members, additive only — `git diff` touches no existing line; the proof that every previously valid literal still compiles is CI's `npm run typecheck` and `npm run typecheck:example`, not an acceptance test
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`, additive; export `StoreCannotList` (the acceptance test looks it up at runtime from `src/types/sessionStore.ts`, `session.ts` or `messages.ts` — extend that lookup if it lands elsewhere)
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` integer 1–200, `before` a cursor of ISO strings with both halves, else `INVALID_MESSAGE` naming the field
- [ ] `src/transport/ws/messageHandler.ts`: take the store and the new options beside the orchestrator; answer `list_conversations` on the non-locked path beside `ping`; user id from `ws.userId`; call `listFor(userId, {limit, before})` with both possibly `undefined`; `UNSUPPORTED` when off or `StoreCannotList`, `SERVER_ERROR` (no store detail, logged with session id) on any other rejection
- [ ] `src/transport/createServer.ts` and `src/config.ts`: thread `transport.history?: {enabled: boolean}` (default off) through `HalServerOptions` like `resume`; warn at startup when history is on without `transport.resume`
- [ ] `src/index.ts` exports for the new types and `StoreCannotList`
- [ ] `specs/hal-engine-conversation-list/spec.md`: cross-link the frames from the store's `listFor`; it reads `Shipped`, so any statement added there must cite a test or the status check fails — do not add uncited prose
- [ ] `docs/getting-started.md` § Conversation list via `example/full-config.ts` + `npm run docs:fix` (never hand-edit the `doc-block`), `CHANGELOG.md` under `## [Unreleased]`, MINOR version bump, `npm run verify` green with coverage floors held or risen

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (ruled out by #124); no in-band switch frame, no second replay path, no unsolicited `conversation_list`