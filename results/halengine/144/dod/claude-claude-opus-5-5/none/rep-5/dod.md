# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` over a real socket (`src/transport/wsTestSupport.ts`) is the seam: the tests send a `list_conversations` frame through the real upgrade and handler, and call `validateMessage` directly. Today the frame is an unknown type and is answered `INVALID_MESSAGE`.

## Done when these pass

- [ ] **validates list_conversations: no fields is valid, and a bad limit or before is refused naming the field** — `limit` is an integer 1-200, and `before` is a `{updatedAt, sessionId}` cursor with a parseable time
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection's own user, never the frame's, with one list newest first that a reconnect can open** — with `history: {enabled: true}`, one `conversation_list` (no `stream_end`) with three ISO-dated rows, newest first; `listFor` called with `ws.userId` and `{limit, before}` as sent; a frame `userId` of another user is ignored; reconnecting with the head row's id gives `resumed: true` and its replay
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED and no list when history is off, and when the store implements no listFor**
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a listFor that rejects with SERVER_ERROR carrying no store detail, logged by session, the socket left open**
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message is still streaming, before that turn's stream_end** — answered off the per-session lock
      `src/transport/conversationList.acceptance.test.ts`

Run: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary` and `ConversationListMessage` plus their two union members, and touch no existing line
- [ ] `ErrorCodes.UNSUPPORTED` (additive)
- [ ] `validation.ts`: add a `list_conversations` case (`limit` and the `before` cursor)
- [ ] `createMessageHandler(orchestrator, {sessionStore, history})`: answer `list_conversations` beside `ping`, off the lock, with the user taken from `ws.userId`
- [ ] Return `UNSUPPORTED` when history is off or the store has no `listFor` (or throws `StoreCannotList`), and `SERVER_ERROR` plus a log naming the session id when `listFor` rejects
- [ ] `HalServerOptions.history` / `HalEngineConfig.transport.history`, threaded like `resume`, with a startup warning when history is on without resume, and the retention note mirrored from `SessionResumeOptions` (#41)
- [ ] Spec § 5 `conversation_list` field table plus the GDPR statements, a CHANGELOG entry, and the getting-started section via `example/full-config.ts` + `npm run docs:fix`

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, an operator view of other users' lists, live sync between tabs (#124)
- Any change to `ConnectedMessage` or the #45 resume path