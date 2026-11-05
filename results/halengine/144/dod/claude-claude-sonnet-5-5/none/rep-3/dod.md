# Definition of Done

> A client cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` with a real WebSocket upgrade is an existing seam; the new `history` option and `list_conversations` frame are absent, so the tests fail on behaviour (the frame is answered `INVALID_MESSAGE`).

## Done when these pass

- [ ] **validates list_conversations** — bare frame valid; `limit` 0/201/1.5/'10' and `before: 'not a date'` invalid, with the field named.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with one conversation_list of the connecting user only** — newest first, ISO times, a frame `userId` of another user ignored.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **passes limit and the connection user to listFor** — asserted on the recorded argument, not the frame's `userId`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store cannot list** — one `error` frame, no list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `validateMessage` accepts/rejects `list_conversations`; types added to `messages.ts`
- [ ] `ErrorCodes.UNSUPPORTED`, `transport.history` threaded through config and `createServer`
- [ ] Handler answers the list off the lock, from `ws.userId`
- [ ] Specs, docs (`npm run docs:fix`), CHANGELOG; spec statements get `validated by` links to this file

## Out of scope

- Previews/titles, deleting from the client, server-side paging state, operator views, live tab sync.
- Not pinned here (left to rounds): `SERVER_ERROR` on a rejecting store, `StoreCannotList`, answering during a streaming turn, the reconnect-by-id end to end, startup warning.