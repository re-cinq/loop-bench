# Definition of Done

> "#143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. That is a second authorisation path to the same personal data, written once per consumer, each one able to get the ownership check wrong in its own way — the exact failure #45 went out of its way to avoid for resume."

**Strategy: `direct`** — the seam already exists: `createHalEngine` upgrades a real socket, `validateMessage` and the message handler are the real entry points, and the shipped `InMemorySessionStore` already answers `listFor`. Each test below opens a real engine on an ephemeral port, sends the frame, and reads what comes back, so every one fails today on the behaviour this ticket adds (`Unknown message type: list_conversations`) and not on a missing fixture. Run just this file, never the whole suite:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`

## Done when these pass

- [ ] **answers list_conversations with the connecting user’s own conversations, newest first, and never one a forged userId names** — with `transport.history` on, three conversations for u1 and one for u2, a frame forging `userId: 'u2'` is answered with exactly one `conversation_list` of u1's three rows newest first, each row the four summary fields only, both times ISO strings, no `stream_end`, and the recorded `listFor` argument is the socket's user, not the forged one
  `src/transport/conversationList.acceptance.test.ts#L169`
- [ ] **answers a list it cannot take with one error naming UNSUPPORTED or SERVER_ERROR, never an empty list** — history off, history on against a store without `listFor`, and history on against a rejecting store are each answered with exactly one `error` frame (`UNSUPPORTED`, `UNSUPPORTED`, `SERVER_ERROR`), no `conversation_list`, no store detail in the message, the socket still open, and the failure logged with the session id and none of the store's content
  `src/transport/conversationList.acceptance.test.ts#L230`
- [ ] **answers a list asked while a turn is streaming before that turn’s stream_end, passing limit and before to the store** — a `list_conversations` sent while a `user_message` is held inside `beforeUserInput` (so the per-session lock is held) is answered first, and `listFor` is recorded called with `u1` and `{limit: 2, before: {updatedAt, sessionId}}` exactly as the frame sent them
  `src/transport/conversationList.acceptance.test.ts#L286`
- [ ] **hands a client that reconnects with an id taken from the list the conversation it picked** — the id travels from a `conversation_list` row through `?sessionId=<id>` to `resumed: true` and the replay, through the existing resume path with no new transport code
  `src/transport/conversationList.acceptance.test.ts#L346`
- [ ] **accepts a bare frame and a limit and cursor within their bounds, and names the field it refuses** — `validateMessage` takes a bare `list_conversations` and one with `limit` and a two-half cursor; `limit` 0/201/1.5/'10' and a bad or half a `before` are refused with a message naming the field
  `src/transport/conversationList.acceptance.test.ts#L377`

## Facets

- [ ] `src/types/messages.ts`: four new interfaces (`ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary`) and their two union members, nothing else in the file touched; `ConversationSummary` is `SessionSummary` with its two times as ISO strings
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — `limit` an integer 1–200, `before` a two-half `{updatedAt, sessionId}` cursor of ISO strings, refusal naming the field
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`; `StoreCannotList` as new public surface (thrown by a store that cannot list, answered `UNSUPPORTED` rather than `SERVER_ERROR`), exported from `src/index.ts` beside the new message types
- [ ] `src/transport/ws/messageHandler.ts`: takes the session store and the `history` options beside the orchestrator; answers `list_conversations` on the non-locked path beside `ping`; the user id from `ws.userId`, never the frame; `UNSUPPORTED` when the feature is off or the store has no `listFor`; a rejecting `listFor` answered `SERVER_ERROR` with no store detail, logged with the session id and no user content; a thrown `StoreCannotList` answered `UNSUPPORTED`
- [ ] `src/transport/createServer.ts` and `src/config.ts`: `transport.history` threaded through like `resume`; the engine warns at startup when history is on without resume (a list whose rows cannot be opened)
- [ ] GDPR: `SessionResumeOptions`' retention note mirrored on the new options type, pointing at #41
- [ ] `docs/getting-started.md` § Conversation list made by editing `example/full-config.ts` and running `npm run docs:fix` (never typed into the markdown); `CHANGELOG.md` entry under `## [Unreleased]`; MINOR version bump
- [ ] `npm run verify` green with the coverage floors held or risen; `npm run check:spec-links`, `npm run check:spec-status`, `npm run spec:names` still green (they are green on this branch with the citations these tests carry)

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations; live sync between open tabs (#124)