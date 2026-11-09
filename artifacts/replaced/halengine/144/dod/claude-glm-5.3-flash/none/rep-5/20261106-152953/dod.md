# Definition of Done

> "#143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. That is a second authorisation path to the same personal data, written once per consumer, each one able to get the ownership check wrong in its own way — the exact failure #45 went out of its way to avoid for resume."

**Strategy: `direct`** — the seam already exists. `createServer` upgrades a real socket and hands every frame to `createMessageHandler`; #146 shipped `SessionStore.listFor`; `src/transport/wsTestSupport.ts` starts a real engine for a real client. An acceptance test opens that socket today, sends `list_conversations`, and fails on behaviour — the engine answers `INVALID_MESSAGE` because nothing answers the frame yet. No production code was written to make room for the tests.

## Done when these pass

All in one new file, `src/transport/conversationList.acceptance.test.ts`, run with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts
```

- [ ] **answers with the conversations of the user the connection authenticated, newest first, as ISO strings** — with `history: {enabled: true}` and a store holding three conversations for the user (and one for somebody else), a `list_conversations` frame that even names the other user is answered with exactly one `conversation_list` carrying that connecting user's four rows newest first, each row exactly the four summary fields with both times as ISO strings, no `stream_end`, no `error`; the store's `listFor` was called once, with `ws.userId` — asserted on the recorded argument, not on the frames. Also pins the `connected` frame's fields unchanged by this issue
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **passes the frame paging options to listFor as the frame sent them, undefined included** — a bare frame calls `listFor` with `{limit, before}` both `undefined` (`toStrictEqual`, so the argument may not simply be omitted), and a frame with `limit: 2` and a `before` cursor taken from a row of the first answer reaches the store as `{limit: 2, before: {updatedAt, sessionId}}` — ISO strings, not `Date`s
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts a bare list_conversations and forwards no user id, whether history is on or not** — `validateMessage({type: 'list_conversations'})` is valid with no user id field forwarded; `limit` of `0`/`201`/`1.5`/`'10'` and a `before` that is a bare timestamp, a half cursor (either half alone, the amendment) or a cursor with an unusable moment are each invalid with a message naming the field; the bounds `1`/`200` and a whole cursor are valid
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED and no list when history is off or the store cannot list** — with `history` absent the same frame is answered with one `error` frame code `UNSUPPORTED` and no `conversation_list`, and with history on against a store implementing no `listFor` the answer is the same frame; the socket stays open. Also asserts the engine warns at startup when `transport.history` is on without `transport.resume` (the amendment's "now says so")
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a rejecting store with SERVER_ERROR, the socket open and no store detail anywhere, and one that cannot list with UNSUPPORTED** — a rejecting `listFor` is answered with one `error` frame `SERVER_ERROR` whose message carries no store detail, the socket still answers a `ping`, and the log carries the session id and neither the store detail nor any conversation content; a store throwing the new exported `StoreCannotList` (read lazily, so the red names the missing export itself) is answered `UNSUPPORTED` instead
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request while the turn is still streaming, before its stream_end** — a `list_conversations` sent after a `user_message` whose stream is held open arrives before that turn's `stream_end`; the list is answered off the per-session lock
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **reopens a listed conversation by reconnecting with its id, through the resume path that already ships** — the connection's own conversation is listed (the amendment), and reconnecting with `?sessionId=<a row's id>` answers `resumed: true`, `entryCount` and that conversation's replay, with no new transport code
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`, additive only: four new interfaces (`ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` — amendment 2) and their two union members; a fixture or `git diff` must show no existing line touched and `ConnectedMessage` untouched
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case the third test pins
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED` and the exported `StoreCannotList` (amendment 3); export both from `src/index.ts`
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` takes the session store and history options beside the orchestrator; answers `list_conversations` on the non-locked path beside `ping`, reading the user id from `ws.userId` and passing `{limit, before}` as the tests pin
- [ ] `src/config.ts` and `src/transport/createServer.ts`: `transport.history?: {enabled: boolean}`, default off, threaded through like `resume`; warn at startup when it is on without `transport.resume`
- [ ] Specs: extend `specs/hal-engine-websocket-protocol/spec.md` (the two frames, their field tables, the authorisation rule, the GDPR statements, `transport.history` as the deployer's decision, the retention note mirrored on the new options type pointing at #41) and the conversation-list spec, citing these acceptance tests by name in the AGENTS.md `([validated by: …](…#Lnn))` form — the statements do not exist yet, so this pod could not place the citations; `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status` must pass, and `Status` rows move per their own coverage rules (never edited by hand here)
- [ ] Docs: the `docs/getting-started.md` § Conversation list change made by editing `example/full-config.ts` and running `npm run docs:fix` — a hand-edited block fails `npm run docs:check`; say there that a listed row is opened by reconnecting with `?sessionId=`, which needs resume
- [ ] `CHANGELOG.md`: an entry under `## [Unreleased]` written for somebody installing the package; MINOR version bump (`npm run check:version`), no migration guide owed
- [ ] `npm run verify` passes and the coverage floors hold or rise

## Out of scope

- A preview or title on the summaries (its own issue); deleting a conversation from the client; paging state held server-side — the client pages with `before`; an operator view of another user's conversations; live sync between open tabs (#124)
- Any in-band switch frame or second replay path — picking a conversation is `?sessionId=`, which #45 already ships with the ownership check
- The reviewer's own checks the tests cannot carry: `git diff` of `src/types/messages.ts` touching no existing line, and no code path sending `conversations: []` when a list cannot be answered