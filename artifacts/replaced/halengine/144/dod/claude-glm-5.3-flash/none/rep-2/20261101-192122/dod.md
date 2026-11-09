# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seam already exists: `createServer` upgrades a real socket and its
message handler answers the frames, so every test opens a real client over loopback and sends the
frame exactly as a consumer's browser would. Today the frame is answered `INVALID_MESSAGE` and no
`conversation_list` ever exists, so each test fails on the absent behaviour, not on a missing seam.
No double stands in for the socket or the store; the one double in the file is the orchestrator's
stream, which the existing `wsTestSupport` idiom already holds open for the streaming test.

## Done when these pass

- [ ] **accepts the frame statically and refuses a bad limit or cursor naming its field** —
      `validateMessage` takes the frame whatever the config, and refuses `limit` 0/201/1.5/'10' and
      a `before` that is not a two-half `{updatedAt, sessionId}` cursor of ISO strings, each refusal
      naming its field
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers the connecting user with their own newest-first list, however the frame names its
      owner** — with `history: {enabled: true}` and a frame carrying another user's `userId`, the
      store's `listFor` is called with `ws.userId` (the recorded argument) and one
      `conversation_list` answers with the connecting user's own summaries, newest first, each row
      exactly the four fields with both times ISO, and no `stream_end`
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **hands limit and before to the store exactly as the frame sent them** — `limit` and the
      composite ISO-string cursor reach `listFor` verbatim, and the older page comes back
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers with an error, not an empty list, whenever the list cannot be served** — history
      absent, a store implementing no `listFor`, and a store whose `listFor` throws the new
      exported `StoreCannotList` are each answered one `error` frame code `UNSUPPORTED` with no
      `conversation_list`, and `ErrorCodes` carries the code
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a failing store with one server error carrying nothing of the store, and leaves the
      socket open** — a rejecting `listFor` is answered one `SERVER_ERROR` whose message carries no
      store detail and no conversation content, the failure is logged with the session id, and the
      socket is still open
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a list request while a turn is streaming, before that turn ends** — the answer and
      its rows arrive while the `user_message` is still streaming and before its `stream_end`, so
      the list never queues behind `PerSessionLock`
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **hands a row from the list to the resume that already exists, end to end** — an id taken
      from a `conversation_list` row, reconnected with `?sessionId=<id>`, is answered
      `resumed: true` with that conversation's replay, through the existing #45 path
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`, additive only: `ListConversationsMessage` and
      `ConversationListMessage` into the two unions, plus `ConversationCursor` and
      `ConversationSummary` (four interfaces — the amendment); a `git diff` of the file touches no
      existing line
- [ ] `src/types/session.ts`: `ErrorCodes` gains `UNSUPPORTED`, additive
- [ ] `StoreCannotList` exported from `src/types/sessionStore.ts` (beside the port, as `AIError`
      sits beside `AIProvider`) and through `src/index.ts` — the acceptance file reads it from
      there dynamically
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case (integer limit 1–200;
      `before` a two-half cursor of ISO strings; otherwise `INVALID_MESSAGE` naming the field)
- [ ] `src/transport/ws/messageHandler.ts`: takes the session store and the new options beside the
      orchestrator, answers `list_conversations` on the non-locked path beside `ping`, user id from
      `ws.userId`, passes `{limit, before}`
- [ ] `src/transport/createServer.ts`: `history?: {enabled: boolean}` on `HalServerOptions`, forwarded
      like `resume`; the acceptance file's `as HalServerOptions` assertion can come off once it is
- [ ] `src/config.ts`: `HalEngineConfig.transport.history`, threaded to `createServer`; a startup
      warning when history is on without resume (`?sessionId=` is read only when resume is)
- [ ] `ConnectedMessage` unchanged; the conversation the connection is in listed like any other
- [ ] `specs/hal-engine-websocket-protocol/spec.md`: field tables for the two frames, the
      authorisation rule, the `UNSUPPORTED` row (statements and citations are already in place from
      this round); `specs/hal-engine-conversation-list/spec.md`: the retention note of
      `SessionResumeOptions` mirrored on the new options type, pointing at #41
- [ ] GDPR prose: the spec states `conversation_list` carries one authenticated user's own
      metadata and no conversation content, and that the user id is taken from the connection
- [ ] `docs/getting-started.md` § Conversation list, made in `example/full-config.ts` and
      regenerated with `npm run docs:fix`, saying a client reconnects with a row's id — and that
      this needs resume on
- [ ] `CHANGELOG.md` entry under `## [Unreleased]` written for somebody installing the package
- [ ] MINOR version bump; PR body says so; no migration guide owed
- [ ] `npm run verify` passes and the coverage floors for the touched groups hold or rise

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own
  authorisation decision
- Paging state held server-side — the client pages with `before`
- An operator view of another user's conversations — an authorisation question of its own
- Live sync between open tabs — #124 ruled it out
- Any push of `conversation_list` without a request