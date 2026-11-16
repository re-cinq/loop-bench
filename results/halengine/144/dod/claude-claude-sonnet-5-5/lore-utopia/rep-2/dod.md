# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The real entry point exists: `createServer` with a real socket and an `InMemorySessionStore` (which already implements `listFor`, #143). Today a `list_conversations` frame is answered `INVALID_MESSAGE`, so each test fails on the absent behaviour.

## Done when these pass

- [ ] **answers list_conversations with the connecting user’s own list, newest first, as ISO strings, whatever userId the frame carries** — one `conversation_list`, no `stream_end`, `listFor` called with `ws.userId` and the frame's `limit`, a foreign `userId` in the frame ignored. Needs `history` as a `createServer` option.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations with one UNSUPPORTED error and no list when history is off or the store cannot list** — `ErrorCodes.UNSUPPORTED`, never `conversation_list`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message is streaming, before that turn’s stream_end** — answered off the per-session lock.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `validateMessage` accepts `list_conversations` (limit 1-200 integer, `before` a parseable string) and refuses the rest as `INVALID_MESSAGE`
- [ ] `ErrorCodes.UNSUPPORTED`; `history` option on `createServer` and `transport.history` on the config; handler refuses when off or `listFor` absent
- [ ] Handler answers on the non-locked path with the list from `ws.userId`; `SERVER_ERROR` on rejection, `UNSUPPORTED` on `StoreCannotList`
- [ ] Types, spec tables, CHANGELOG, `example/full-config.ts` + `npm run docs:fix`, resume-with-id end to end

## Out of scope

- Previews or titles, deleting from the client, server-side paging state, operator views, live tab sync.
- Validation edge cases (limit 0/201/1.5/'10', bad `before`) and the rejecting-store logging are owed by the round's own unit tests; they are not pinned here.