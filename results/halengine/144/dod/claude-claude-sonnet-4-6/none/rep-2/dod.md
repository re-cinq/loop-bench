# Definition of Done

> A consumer may have no such route to extend: an engine deployment behind an api with a session store and no conversation endpoints of its own has nothing to add this to. The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — The seam already exists: `validateMessage` and `createMessageHandler` are both callable directly from their modules, and neither currently handles `list_conversations`, so tests calling the expected behavior fail on the absent behavior.

## Done when these pass

- [ ] **accepts list_conversations as valid, and rejects invalid limit or before with the field name** — `validateMessage` accepts `{type: 'list_conversations'}` and rejects invalid `limit` (0, 201, 1.5, `'10'`) or unparseable `before`, each error naming the field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers conversation_list with ISO-string dates when history is enabled** — with `history: {enabled: true}` and a store holding three conversations, one `list_conversations` frame is answered with exactly one `conversation_list` carrying three summaries whose `createdAt` and `updatedAt` are ISO strings, and no `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is not configured** — without the `history` option, `list_conversations` is answered with an `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before the streaming turn's stream_end, without queueing on the lock** — a `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` interfaces; extend `IncomingMessage` and `OutgoingMessage` unions — additive only, no existing line touched
- [ ] `src/types/session.ts`: add `UNSUPPORTED` to `ErrorCodes`
- [ ] `src/transport/ws/validation.ts`: add `list_conversations` case — `limit` integer 1–200, `before` a valid cursor object; `INVALID_MESSAGE` naming the field on violation
- [ ] `src/config.ts` / `HalEngineConfig`: add `transport.history?: {enabled: boolean}`; warn at startup when `history` is on but `resume` is off
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` gains `store` and `options` params; handles `list_conversations` off the per-session lock — calls `store.listFor(ws.userId, {limit, before})` and sends `conversation_list`; with `history` absent or `listFor` missing sends `UNSUPPORTED`; store rejection sends `SERVER_ERROR`; `StoreCannotList` sends `UNSUPPORTED`
- [ ] `src/transport/ws/sender.ts`: add `sendConversationList` helper
- [ ] Validation tests stay green: run `src/transport/ws/validation.test.ts`
- [ ] Handler tests stay green: run `src/transport/ws/messageHandler.test.ts`
- [ ] `specs/hal-engine-websocket-protocol/spec.md`: add § list_conversations (§ 4.3) and § conversation_list (§ 5.9) with field tables, the authorisation rule, and the GDPR note; add `([validated by ...])` citations
- [ ] `docs/getting-started.md`: regenerated via `example/full-config.ts` + `npm run docs:fix`
- [ ] `CHANGELOG.md`: entry under `## [Unreleased]`
- [ ] MINOR version bump (new optional config, two additive frames, one new error code)

## Out of scope

- Picking/switching a conversation in-band (the client reconnects with `?sessionId=<id>` via the existing #45 path; no new transport code)
- Conversation titles or previews (own issue)
- Deleting a conversation from the client
- Server-side paging state
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled this out)