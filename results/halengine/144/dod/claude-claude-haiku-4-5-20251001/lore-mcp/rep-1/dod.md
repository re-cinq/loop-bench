# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handler already has a dispatcher that routes message types. The new `list_conversations` message can be handled directly alongside the existing `ping` handler, outside the per-session lock (for low latency). The session store's `listFor` method (from issue #143) provides the data.

## Done when these pass

- [ ] **Validation accepts list_conversations frames** — `list_conversations` is recognized by the validator, and `limit` (1–200), `before` (ISO date string), and no fields are all valid; with `limit: 0`, `limit: 201`, `limit: 1.5`, `limit: '10'`, or `before: 'not a date'` it is invalid
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Returns conversation_list with enabled history** — With `transport.history.enabled: true` and a store holding conversations, a `list_conversations` frame returns exactly one `conversation_list` carrying summaries, newest first, each `createdAt` and `updatedAt` as ISO strings
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **User ID comes from connection, not frame** — A frame carrying `userId` of another user is answered with the connecting user's own list, and the store's `listFor` is called with `ws.userId`
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Query parameters reach the store** — `limit` and `before` reach `listFor` as the frame sent them, with `before` as a cursor object `{updatedAt, sessionId}` of ISO strings
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Error when history disabled** — With `transport.history` absent or `enabled: false`, the frame is answered with an `error` frame whose code is `UNSUPPORTED`
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Error when store has no listFor** — With `history: {enabled: true}` against a store implementing no `listFor`, the answer is an `error` frame with code `UNSUPPORTED`, and no `conversations: []` path exists
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Store failures return SERVER_ERROR** — A `listFor` that rejects is answered with one `error` frame whose code is `SERVER_ERROR` and whose message carries no store detail; a store throwing `StoreCannotList` is answered `UNSUPPORTED`
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Does not wait on per-session lock** — A `list_conversations` sent while a `user_message` is streaming is answered before the stream's `stream_end`
  `src/transport/ws/validation.acceptance.test.ts`

- [ ] **Reconnect with sessionId works** — A client taking an id from a `conversation_list` and reconnecting with `?sessionId=<id>` receives `resumed: true` and the conversation's replay, via existing #45 path
  `src/transport/ws/validation.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` interfaces to `src/types/messages.ts`
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts`
- [ ] Extend `messageHandler` to handle `list_conversations` off the non-locked path
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes`
- [ ] Wire in `transport.history` config option to `createServer`
- [ ] Add `StoreCannotList` error class for store misconfiguration

## Out of scope

- REST routes for conversation list (WebSocket-only)
- Previews or titles on summaries (separate issue)
- Deleting conversations from client
- Server-side paging state (client pages with `before`)
- Operator view of another user's conversations
- Live sync between tabs (#124 ruled it out)