# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server already accepts authenticated clients and the shipped in-memory store already provides `listFor`, so the acceptance test reaches the transport without a double.

## Done when these pass

- [ ] **accepts a list request but rejects invalid list windows by their field** — validates the new request frame and its pagination boundary.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns only the authenticated user’s newest summaries as ISO wire values** — delivers an enabled connection's own history without a turn frame.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list request with UNSUPPORTED when history is not enabled** — keeps the disclosure opt-in.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive request and response protocol types, validation, `UNSUPPORTED`, and the independent `transport.history` option.
- [ ] Route an enabled list request through the authenticated connection user to `listFor`, serialize summary timestamps, and keep it off the turn lock.
- [ ] Return `UNSUPPORTED` when history is off or the store cannot list, and safely report store failures.
- [ ] Document the protocol, configuration, retention note, changelog, and generated getting-started configuration.

## Out of scope

- Conversation previews or titles, deletion, server-side paging state, operator access to another user's history, and live synchronization.