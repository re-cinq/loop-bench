# Definition of Done

> A consumer may have no such route to extend: an engine deployment behind an api with a session store and no conversation endpoints of its own has nothing to add this to. The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — The WebSocket message handler already has a seam for adding new message types; validation and message handling can be added alongside `user_message` and `ping` with no refactoring required.

## Done when these pass

- [ ] **validates list_conversations messages** — acceptance test verifies that `validateMessage` accepts `list_conversations` with no options, with valid `limit` (1–200), and with valid `before` cursor, and rejects invalid `limit` (0, 201, 1.5, '10') and invalid `before` (non-date string) with errors naming the field
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **answers conversation_list with three summaries** — acceptance test verifies that with `history: {enabled: true}` and a store holding three conversations, the handler sends exactly one `conversation_list` frame carrying three `ConversationSummary` objects, each with `createdAt` and `updatedAt` as ISO strings, and no `stream_end`
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **does not read userId from frame, only from ws.userId** — acceptance test verifies that a frame carrying `userId: '<another user>'` is answered with the connecting user's own list, and the store's `listFor` is called with `ws.userId`, not the frame's field
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **passes limit and before to store** — acceptance test verifies that `limit` and `before` reach `listFor` as sent in the frame, or as `undefined` if absent
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is disabled** — acceptance test verifies that with `history` absent or `{enabled: false}`, the same frame is answered with one `error` frame whose code is `UNSUPPORTED`
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when store has no listFor** — acceptance test verifies that with `history: {enabled: true}` against a store implementing no `listFor`, the answer is the same `error` frame with code `UNSUPPORTED`, and no code path sends `conversations: []`
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **answers SERVER_ERROR on listFor rejection** — acceptance test verifies that a `listFor` promise that rejects is answered with one `error` frame whose code is `SERVER_ERROR` and whose message carries no store detail, the socket stays open, and the failure is logged with the session id
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **list_conversations does not wait on per-session lock** — acceptance test verifies that a `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end`
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **session resume works with conversation_list ids** — acceptance test verifies that a client taking a sessionId from `conversation_list` and reconnecting with `?sessionId=<id>` receives `resumed: true` and that conversation's replay, using the existing resume path
      `src/transport/ws/listConversations.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` types to `src/types/messages.ts` (additive only: no existing lines touched)
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`, validating `limit` (1–200, integer) and `before` (valid Date.parse string or cursor object)
- [ ] Add handling in `createMessageHandler` to answer `list_conversations` on the non-locked path alongside `ping`
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts`
- [ ] Thread `history` option through `createServer` to `createMessageHandler`
- [ ] Add `UNSUPPORTED` code to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `StoreCannotList` error class to `src/types/sessionStore.ts` for cases where a store cannot support listing

## Out of scope

- Preview or title on summaries (separate issue)
- Deleting a conversation from the client (separate authorization decision)
- Paging state held server-side (client pages with `before`)
- Operator view of another user's conversations (separate authorization question)
- Live sync between open tabs (ruled out in #124)
- Spec updates, docs regeneration, changelog, version bump (handled separately)