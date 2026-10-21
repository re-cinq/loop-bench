# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createMessageHandler` is the existing dispatch seam, and `validateMessage` is directly callable. The acceptance tests exercise both with a real in-memory session store and verify the socket frames.

## Done when these pass

- [ ] **WebSocket conversation list acceptance** — accepts a valid paged frame, passes the connection user's identity and paging cursor to the store, and returns newest-first summaries with ISO times.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **WebSocket paging validation acceptance** — accepts a bare list request and rejects invalid limits and cursors with the field named.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **WebSocket history availability acceptance** — disabled history and a store without `listFor` both return `UNSUPPORTED`.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept and validate `list_conversations` with the documented paging fields.
- [ ] Answer enabled requests with the authenticated user's own serialized summaries.
- [ ] Return `UNSUPPORTED` when history is disabled or the store cannot list.

## Out of scope

- Conversation previews, client-side paging state, deletion, cross-tab synchronization, and opening a conversation through an in-band switch frame.