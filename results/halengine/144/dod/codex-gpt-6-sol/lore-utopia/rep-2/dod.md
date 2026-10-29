# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` already accepts real WebSocket upgrades and has the authenticated user and session store. The acceptance tests exercise that route and the public frame validator.

## Done when these pass

- [ ] **validates a list request and its bounded composite cursor** — accepts the new frame and rejects invalid limit and cursor fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connected user’s newest summaries and pages from a wire cursor** — returns only the authenticated user's metadata as ISO strings, and sends the requested cursor to the store.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses history when the separate opt-in is off** — absent and disabled history answer `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, cursor and wire summary types, and the `UNSUPPORTED` error code without changing existing message members.
- [ ] Validate the bounded composite cursor and limit, and dispatch list requests outside the turn lock using the connection's authenticated user id.
- [ ] Thread the separate `transport.history` opt-in through configuration and `createServer`; return `UNSUPPORTED` when disabled or when `listFor` is absent.
- [ ] Handle a rejecting `listFor` without disclosing store details, keep the socket open, and distinguish `StoreCannotList` from a transient failure.
- [ ] Preserve list access during a streaming turn and let a listed id use the existing ownership-checked resume path.
- [ ] Document the protocol, retention decision, getting-started flow and version change; regenerate the example-backed docs and update the changelog.

## Out of scope

- Conversation previews, deletion, operator access to another user's list, server-side paging state, and live tab sync.