# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — the entry points (`validateMessage` and `createMessageHandler`) already exist and can be called in tests. The tests fail today because `list_conversations` is not in the validator and the handler has no concept of `history` options or a session store for listing.

## Done when these pass

- [ ] **validates list_conversations and rejects out-of-range fields** — `validateMessage({type:'list_conversations'})` returns valid; limit 0/201/1.5/'10' and before 'not a date' each return invalid naming the field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers conversation_list with the connecting user's conversations as ISO strings, ignoring any userId in the frame** — with `history:{enabled:true}` and three sessions for the connecting user, the handler sends exactly one `conversation_list` frame carrying those three summaries with ISO-string times and no `stream_end`; the store's `listFor` is called with `ws.userId` even when the frame carries another user's id
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is not enabled or the store has no listFor** — with no history option the frame is answered with `error UNSUPPORTED`; with `history:{enabled:true}` and a store implementing no `listFor` the same `error UNSUPPORTED` arrives and no `conversation_list` is ever sent
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations off the per-session lock** — a `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` to `IncomingMessage` and `ConversationListMessage` / `ConversationSummary` / `ConversationCursor` to `OutgoingMessage` in `src/types/messages.ts` (additive only — no existing line changes)
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts` (additive)
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: limit 1–200 integer, before a `{updatedAt, sessionId}` cursor (both halves required), bare frame valid
- [ ] Extend `createMessageHandler` signature to accept `SessionStore` and `options?: {history?: {enabled: boolean}}`; answer `list_conversations` on the non-locked path beside `ping`
- [ ] Wire new parameters through `createServer` and `createHalEngine` from `HalEngineConfig.transport.history`
- [ ] Convert `SessionSummary` Date fields to ISO strings in the `ConversationSummary` wire shape
- [ ] Export `StoreCannotList` error class; map it to `UNSUPPORTED` in the handler
- [ ] Handle `listFor` rejection with `SERVER_ERROR` and log session id without user content
- [ ] Update spec, docs and CHANGELOG as described in the ticket

## Out of scope

- Preview or title on summaries (its own issue)
- Deleting a conversation from the client
- Server-side paging state
- An operator view of another user's conversations
- Live sync between open tabs (#124)