# Definition of Done

> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade. That is a second authorisation path to the same personal data, written once per consumer, each one able to get the ownership check wrong in its own way

**Strategy: `direct`** — `createMessageHandler` and `validateMessage` are real entry points. The acceptance tests call them directly and fail because the feature is absent: `validateMessage` returns `INVALID_MESSAGE` for `list_conversations`, and `createMessageHandler` ignores the `sessionStore` and `history` options it does not yet accept.

## Done when these pass

- [ ] **accepts list_conversations as valid and rejects it with any bad limit or non-object before, naming the field** — `validateMessage` recognises the new type and validates `limit` (1–200 integer) and `before` (composite cursor object) with field-specific errors
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **with history enabled and three conversations in the store, answers list_conversations with one conversation_list carrying three summaries with ISO string dates and no stream_end** — the handler sends the list frame, serialises `Date` fields to ISO strings, and does not send `stream_end`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **calls listFor with session.userId regardless of a userId field in the frame, forwarding limit and before** — the user id comes from the authenticated session; the cursor is forwarded unchanged
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **with history absent answers UNSUPPORTED and no conversation_list; with history on but no listFor on the store, also UNSUPPORTED** — `transport.history` is the feature gate; a store without `listFor` is a misconfiguration, not an empty list
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message is streaming, before that stream_end** — the handler runs off the per-session lock, so it is not queued behind a streaming turn
  `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationSummary`/`ConversationListMessage` to `src/types/messages.ts` (additive, no existing lines touched)
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Update `createMessageHandler` signature to accept `SessionStore` and `{history?: {enabled: boolean}}` options
- [ ] Add `list_conversations` handling to `createMessageHandler` on the non-locked path beside `ping`
- [ ] Wire `sessionStore` and `history` option through `createServer` and `HalEngineConfig`
- [ ] Add `StoreCannotList` exported error class and handle it as `UNSUPPORTED` in the handler
- [ ] Add `conversation_list` sender helper to `src/transport/ws/sender.ts`
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` with the full frame tables and security note
- [ ] Run `node scripts/repoint-spec-anchors.mjs` after any edits to the cited test file

## Out of scope

- A `conversation_list` frame sent unsolicited (the frame is answered on request only)
- Deleting a conversation from the client
- Server-side paging state
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- `ConnectedMessage` changes (must stay unchanged)
- Picking/switching a conversation in-band (client reconnects with `?sessionId=<id>` using the existing #45 path)