# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The real entry points exist: `validateMessage` and `createServer` over a real socket (`wsTestSupport`). Today `list_conversations` is rejected as `INVALID_MESSAGE`, so each test fails on the missing behaviour.

## Done when these pass

- [ ] **accepts list_conversations and names the field of a bad limit or before** — `limit` 1-200 integer and `before` parseable; otherwise invalid naming the field.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with one conversation_list of the connecting user's own, newest first, as ISO strings, ignoring a userId in the frame** — with `history: {enabled: true}`; `listFor` is called with `ws.userId` and the frame's `limit`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and sends no list, with history off or with a store that cannot list**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR without store detail when listFor rejects, and keeps the socket open**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request before the stream_end of a turn still streaming on the same session** — off the per-session lock.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Types: `list_conversations` / `conversation_list` frames, `ErrorCodes.UNSUPPORTED`
- [ ] `validateMessage` case for `list_conversations`
- [ ] `transport.history` option threaded config -> createServer -> createMessageHandler with the store
- [ ] Handler answers on the non-locked path: list, UNSUPPORTED, SERVER_ERROR (`StoreCannotList` -> UNSUPPORTED)
- [ ] Docs: example/full-config.ts + `npm run docs:fix`, CHANGELOG, spec field tables

## Out of scope

- Previews/titles, deleting from the client, server-side paging state, operator view of other users, live tab sync.
- Not pinned here (left to the round's own tests): `before` cursor passthrough, `StoreCannotList`, the startup warning for history without resume, the `?sessionId=` reconnect (already #45), docs/CHANGELOG/version.