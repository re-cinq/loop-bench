# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handler already has a seam for accepting new message types. The acceptance tests exercise the new `list_conversations` message type and `conversation_list` response through the real message handler, calling into the orchestrator and session store.

## Done when these pass

- [ ] **list_conversations validation** — `validateMessage({type: 'list_conversations'})` with valid `limit` (1–200) and `before` (ISO date string or cursor) parameters accepts the message; with invalid values rejects with error naming the field
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **conversation_list response with history enabled** — With `history: {enabled: true}` and a store holding three conversations for the user, a `list_conversations` frame is answered with exactly one `conversation_list` carrying three summaries, newest first, each `createdAt` and `updatedAt` an ISO string, and no `stream_end`
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **ws.userId is used, not frame userId** — A frame carrying `{type: 'list_conversations', userId: '<another user>'}` is answered with the connecting user's own list, and the store's `listFor` is called with `ws.userId`
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **limit and before reach listFor** — The `limit` and `before` parameters sent in the frame reach `listFor` as `{limit, before}` with both possibly `undefined`
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **history disabled returns UNSUPPORTED error** — With `history` absent or `{enabled: false}`, the same frame is answered with one `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **store without listFor returns UNSUPPORTED error** — With `history: {enabled: true}` against a store implementing no `listFor`, the answer is an `error` frame with code `UNSUPPORTED`
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **listFor rejection returns SERVER_ERROR** — A `listFor` that rejects is answered with one `error` frame whose code is `SERVER_ERROR`, the socket stays open, and the failure is logged
  `src/transport/ws/list-conversations.acceptance.test.ts`

- [ ] **list_conversations does not block on lock** — A `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end`
  `src/transport/ws/list-conversations.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, and `ConversationListMessage` to message types
- [ ] Extend `validateMessage` to handle `list_conversations` with validation for `limit` and `before` parameters
- [ ] Extend `createMessageHandler` to route non-user-message frames like `list_conversations` outside the per-session lock
- [ ] Add handler for `list_conversations` that calls `listFor` on the session store
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes`
- [ ] Add `history: {enabled: boolean}` option to transport config and thread through to message handler
- [ ] Wire message handler to pass history config when answering `list_conversations`

## Out of scope

- Production code implementation (tests define what should be built)
- Documentation, changelog, or version bumps
- Spec or ADR updates
- Config defaults or deployment warnings
- GDPR compliance verification
- End-to-end resume testing beyond verifying sessionId is accepted