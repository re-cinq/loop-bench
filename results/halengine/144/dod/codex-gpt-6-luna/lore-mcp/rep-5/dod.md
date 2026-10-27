# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and `createMessageHandler` are existing entry points. The acceptance tests use real WebSocket connections and the real in-memory session store to observe protocol behavior.

## Done when these pass

- [ ] **Conversation list protocol acceptance** — validates request fields, returns only the authenticated user's summaries in wire format, and reports `UNSUPPORTED` when disabled or unsupported by the store.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept `list_conversations` with bounded limit and cursor validation.
- [ ] Deliver an authenticated user's newest summaries as a `conversation_list` frame with ISO timestamps.
- [ ] Return `UNSUPPORTED` when history is disabled or the store has no listing capability.

## Out of scope

- Resuming a selected conversation, which is already covered by the session resume protocol.
- Client-side history UI, deletion, previews, and cross-tab live synchronization.