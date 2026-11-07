# Definition of Done

> answering "which conversations do I have" over the same socket is the smaller surface

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are both callable from tests today. The new `list_conversations` frame and its handler sit beside the existing `ping` path; calling these real entry points with the new frame type exercises the absent behaviour and fails with the right error.

## Done when these pass

- [ ] **validateMessage accepts list_conversations and rejects invalid limit and before values** — `validateMessage` returns `{valid: true}` for `{type: 'list_conversations'}` and `{valid: false, error: ...}` naming the field for a bad `limit` or `before`.
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **with history enabled, answers list_conversations with a conversation_list of ISO-stamped summaries** — the handler returns exactly one `conversation_list` frame whose summaries carry ISO string timestamps, with no `stream_end`.
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **calls listFor with the session userId, ignoring any userId field in the frame** — `listFor` is called with the session's own `userId`, not with any `userId` field the frame may carry.
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **with history absent, answers list_conversations with UNSUPPORTED error and no conversation_list** — with no `transport.history` option, one `error` frame with code `UNSUPPORTED` is sent and no `conversation_list` follows.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` to `src/types/messages.ts` (additive only — no existing line touched)
- [ ] Add `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage`: `limit` integer 1–200, `before` a cursor object with `updatedAt` and `sessionId`; `INVALID_MESSAGE` on violation
- [ ] Extend `createMessageHandler` to accept `SessionStore` and `{history?: {enabled: boolean}}` alongside `orchestrator`
- [ ] Handle `list_conversations` on the non-locked path: call `store.listFor(session.userId, {limit, before})`, serialise Date fields to ISO strings, send `conversation_list`
- [ ] Return `UNSUPPORTED` when history is off or when the store exposes no `listFor`
- [ ] Wire `HalEngineConfig.transport.history?: {enabled: boolean}` through `createServer` → `createMessageHandler`

## Out of scope

- Unsolicited `conversation_list` push (the frame is answered on request, never sent unprompted)
- In-band session switching (`?sessionId=` reconnect is the existing path from #45)
- `StoreCannotList` exported error class (follow-on work)
- Spec doc-block regeneration, CHANGELOG entry, version bump (not test work)