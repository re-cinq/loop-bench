# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`**

The seam already exists and is exercised as a client would meet it: `list_conversations` goes over a real socket today and comes back `error INVALID_MESSAGE` (unknown type), so every test fails behaviourally on the wire rather than on a missing symbol. The one exception is `StoreCannotList`, looked up at run time from `src/types/sessionStore.js` because the class is not there yet; the test reads it exactly where the build is expected to define it.

## Done when these pass

- [ ] **accepts a list_conversations frame with no user id and refuses an unreadable window naming the field** — `validateMessage` takes the bare frame (and one carrying another user's id, which is dropped), keeps `limit`/`before` when well formed, and refuses `limit` 0/201/1.5/'10' and every half or unreadable `before` with a message naming the field — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers one conversation_list of the connections own conversations and passes its window through to the store** — with `history: {enabled: true}`, a bare frame is answered with one `conversation_list` whose rows are newest first (the live conversation among them, empty), ISO `createdAt`/`updatedAt`, exactly the four summary fields; a second frame's `{limit, before}` reaches `listFor` as sent and pages to the older two — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers with the connecting users own list when the frame names another user** — a frame carrying `userId: 'u2'` is answered with u1's own rows and `listFor` was called with `'u1'`, asserted on the recorded argument — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **refuses a list_conversations frame with UNSUPPORTED and no list while the feature is off** — with `history` absent the frame is still valid but answered with one `error` code `UNSUPPORTED` and the store is never asked — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when the store cannot list, rather than an empty list** — a store with no `listFor` member and one throwing the new `StoreCannotList` are both answered `UNSUPPORTED`, never `conversations: []` — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **reports a failing store as SERVER_ERROR with no store detail, keeps the socket open and logs the session id alone** — a rejecting `listFor` after a completed turn yields one `error` code `SERVER_ERROR` carrying neither the store's message nor the user's content, the socket answers the next `ping`, and an error-level log names the session id — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers a list request while a turn is streaming, before that turns stream_end** — a `list_conversations` sent mid-turn is answered off the per-session lock, before that turn's `stream_end`, exactly once — `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **rejoins a conversation the client picked from its conversation_list through the existing resume path** — reconnecting with `?sessionId=<row id>` answers `resumed: true` and replays that conversation, no new transport code — `src/transport/conversationHistory.acceptance.test.ts`

## Facets

Smallest first, each green the moment it lands:

- `src/types/messages.ts`, additive only: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` (four interfaces per the amendment) plus their two union members; a fixture pins that every pre-existing message literal still compiles; `git diff` of the file touches no existing line.
- `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`, additive.
- `src/types/sessionStore.ts`: define and export `StoreCannotList` (the acceptance test imports it by dynamic import from that module); export it from `src/index.ts` as new public surface.
- `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200 when present; `before` a `{updatedAt, sessionId}` cursor of ISO strings, both halves required; anything else `INVALID_MESSAGE` naming the field, as the existing cases do it.
- `src/transport/createServer.ts` + `src/transport/ws/messageHandler.ts`: thread a `history` option beside `resume`; `createMessageHandler` takes the store and options alongside the orchestrator; answer `list_conversations` on the non-locked path beside `ping`; user id from `ws.userId`, never the frame; a failing `listFor` maps to `SERVER_ERROR` (logged with the session id, no user content) and `StoreCannotList` to `UNSUPPORTED`.
- `src/config.ts` + `src/index.ts`: `HalEngineConfig.transport.history?: {enabled: boolean}`, default off; startup warning when `history` is on without `resume` (the amendment); retention note mirrored from `SessionResumeOptions`, pointing at #41.
- `specs/hal-engine-websocket-protocol/spec.md`: the §4.3 and §5.9 statements are already written with citations to this test file — keep them true while building, then `npm run spec:names:fix` / `check-spec-links` / `check-spec-status`; extend the conversation-list spec; leave every `Status` row alone.
- `example/full-config.ts` + `npm run docs:fix` for the getting-started section; `CHANGELOG.md` under `## [Unreleased]` written for somebody installing the package; MINOR bump.
- `npm run verify` and the coverage floors for the touched groups hold or rise. Never run a workspace build in this pod.

## Out of scope

- A preview or title on the summaries (its own issue).
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision.
- Paging state held server-side; the client pages with `before`.
- An operator view of another user's conversations.
- Live sync between open tabs, which #124 ruled out.