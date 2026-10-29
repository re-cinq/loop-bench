# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing WebSocket validator and `createServer` socket path accept frames today, and the shipped in-memory store already lists real conversations. The acceptance file drives that path through a real WebSocket connection.

## Done when these pass

- [ ] **accepts the list request and rejects invalid limits and cursors at the protocol boundary** — The new frame validates independently of configuration, with bounded paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the authenticated user’s newest summaries and passes the composite cursor to the store** — An opted-in socket lists only its user's metadata, preserves paging, and sends no turn terminator.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED without a list when history is off or the store cannot list** — Both unavailable states are explicit errors instead of empty histories.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, their payload types, and the `UNSUPPORTED` code without changing existing message forms.
- [ ] Validate the limit and both halves of the ISO cursor; dispatch list requests outside the session turn lock.
- [ ] Gate listing with `transport.history`, derive the owner from the socket, and serialize summaries as metadata only.
- [ ] Return safe errors for absent or failing stores, preserving the open socket and logging failures without user content.
- [ ] Document the protocol and opt-in behavior, regenerate the getting-started example, and add the unreleased MINOR change note.
- [ ] Keep resume as the existing path for opening a listed conversation and pass CI's spec, documentation, build, and verification gates.

## Out of scope

- Conversation previews, deletion, server-side paging state, operator access to another user's history, and live tab synchronization.