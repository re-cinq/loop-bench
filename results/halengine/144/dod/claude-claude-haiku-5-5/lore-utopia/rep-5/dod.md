# Definition of Done

> The browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` over a real WebSocket (`startEngineWith` in `src/transport/wsTestSupport.ts`) and the shipped `InMemorySessionStore.listFor` (#146). Nothing in the transport answers `list_conversations` yet.

## Done when these pass

- [ ] **answers list_conversations with the connecting user's conversations, newest first, with ISO times** — with history enabled, one `conversation_list` carrying the user's three summaries newest first, ISO timestamps, no `stream_end`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **ignores a userId sent in the frame and answers with the connecting user's own list** — a frame carrying another user's `userId` is answered with the connecting user's own list
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations with an UNSUPPORTED error and no list when history is not enabled** — with `history` absent, one `error` frame with code `UNSUPPORTED` and no list
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `validateMessage` accepts `list_conversations`; `limit` (integer 1–200) and `before` (ISO-parsable cursor) validated, else `INVALID_MESSAGE`
- [ ] `src/types/messages.ts` gains `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` (additive only)
- [ ] `ErrorCodes.UNSUPPORTED` added; a store with no `listFor` answers `UNSUPPORTED`, never an empty list
- [ ] `HalEngineConfig.transport.history` and `createServer` `history` option, default off
- [ ] `limit` and `before` reach `listFor` as sent; `listFor` called with `ws.userId`
- [ ] A `list_conversations` during a streaming turn is answered before that turn's `stream_end`
- [ ] A `listFor` rejection answers `SERVER_ERROR` with no store detail; socket stays open
- [ ] Reconnect with `?sessionId=<id>` from a listed row resumes that conversation (existing #45 path)
- [ ] Spec, CHANGELOG, `example/full-config.ts` + `npm run docs:fix` as the ticket describes

## Out of scope

- A preview or title on summaries; deleting conversations from the client; server-side paging state; operator view of another user's conversations; live sync between tabs (#124).