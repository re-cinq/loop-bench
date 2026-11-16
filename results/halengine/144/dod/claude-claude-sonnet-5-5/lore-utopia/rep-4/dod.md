# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store

**Strategy: `direct`** — `createServer`, `validateMessage` and the real in-memory store already exist, so the tests drive a real engine over a real socket; `list_conversations` is an unknown message type today and answered `INVALID_MESSAGE`.

## Done when these pass

- [ ] **accepts a bare list_conversations frame and refuses a bad limit or cursor naming the field** — validation rules for `limit` (integer 1-200) and `before`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection’s own conversations newest first, whoever the frame names, and passes limit and before on** — one `conversation_list` with ISO times, `listFor` called with `ws.userId`, `{limit, before}` passed through.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers an UNSUPPORTED error and no list when history is off, or the store cannot list** — opt-in `transport.history` (option `history` on `createServer`), `ErrorCodes.UNSUPPORTED`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request while a turn is still streaming, before that turn’s stream_end** — handled off the per-session lock.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the frames and `UNSUPPORTED` code; accept `list_conversations` in `validateMessage`.
- [ ] Answer it in `createMessageHandler` (store and `history` threaded from `createServer` and `HalEngineConfig.transport.history`).
- [ ] Refusals, `SERVER_ERROR` on a rejecting store, `StoreCannotList`.
- [ ] Docs, CHANGELOG, `example/full-config.ts` + `npm run docs:fix`.

## Out of scope

- Previews or titles, deleting from the client, server-held paging state, operator views, tab sync.
- The resume-by-id path (#45), already tested elsewhere.
- Rejecting-store logging and the `history`-without-`resume` startup warning: not pinned here.