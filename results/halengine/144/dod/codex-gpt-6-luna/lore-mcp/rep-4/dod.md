# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createMessageHandler` is the real message dispatch seam and can be exercised with a socket, session, and store. The acceptance test sends a real list frame through it and observes the serialized protocol response and the store's authenticated user argument.

## Done when these pass

- [ ] **answers the authenticated user with their own summaries on the wire** — a list frame yields one `conversation_list` with ISO timestamps and queries `listFor` using the connection's user id despite an attacker-supplied frame field.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list frame and handler path, keeping the query tied to the authenticated connection.
- [ ] Serialize summary dates as ISO strings in the outgoing frame.

## Out of scope

- Paging validation and error behavior for disabled history or unsupported stores.
- Reconnection and replay of a selected conversation.