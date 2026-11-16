# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store

**Strategy: `direct`** — `createServer` plus a real WebSocket upgrade (`src/transport/wsTestSupport.ts`) is an existing seam; today a `list_conversations` frame is answered `INVALID_MESSAGE`. The tests run with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>` (CI "Test" step).

## Done when these pass

- [ ] **answers the connecting user their own conversations, newest first, whatever userId the frame carries** — one `conversation_list`, own rows only, ISO strings, no content, no `stream_end`; a foreign `userId` in the frame is ignored.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **passes limit to the store, so a page is as long as the client asked** — `limit` reaches `listFor`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers an UNSUPPORTED error and no list when history is not enabled** — `transport.history` off by default, threaded through `createServer` options.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers an UNSUPPORTED error, never an empty list, from a store that cannot list**
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `list_conversations` accepted by `validateMessage` (limit 1-200 integer, before a cursor), `ConversationListMessage`, `ErrorCodes.UNSUPPORTED`
- [ ] `createMessageHandler` takes store and history options; answers off the lock, user id from `ws.userId`
- [ ] `HalServerOptions.history` and `HalEngineConfig.transport.history`
- [ ] Rejecting `listFor`, `StoreCannotList`, streaming-concurrency, resume-by-id, specs, docs, CHANGELOG (ticket criteria, not yet pinned here)

## Out of scope

- Previews or titles, deleting from the client, server-side paging state, operator view of other users, live tab sync.