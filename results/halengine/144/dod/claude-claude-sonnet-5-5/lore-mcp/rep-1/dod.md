# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — `createServer` plus a real `ws` client is an existing seam (`wsTestSupport.ts`), and `InMemorySessionStore.listFor` already exists from #143. The new `list_conversations` frame, the `transport.history` option and `UNSUPPORTED` are absent, so each test fails on behaviour.

## Done when these pass

- [ ] **accepts a bare list_conversations frame and refuses a limit or before that is out of range, naming the field** — `validateMessage` accepts the frame; limit 0/201/1.5/'10' and before 'not a date' are invalid with the field named.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers one conversation_list of the connection's own user, newest first with ISO times, ignoring a userId in the frame** — with `history: {enabled: true}`, one list of three, no other user's row, `listFor` called with `ws.userId` and the frame's `limit`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and no list, while transport.history is off** — one `error` frame with code `UNSUPPORTED`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a user_message is still streaming, before that turn's stream_end** — the list does not wait on the per-session lock.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the frame types, `UNSUPPORTED` and the `list_conversations` validation case.
- [ ] Add `transport.history` / `history` option, thread it and the store into `createMessageHandler`, answer off the lock.
- [ ] Store without `listFor` and a rejecting `listFor` answer `UNSUPPORTED` / `SERVER_ERROR` (not pinned here yet).
- [ ] Docs, CHANGELOG, `example/full-config.ts` + `npm run docs:fix`, conversation-list spec.

## Out of scope

- Previews/titles, deleting from the client, server-side paging state, operator views, tab sync.
- Resume by `?sessionId=` (already shipped in #45).