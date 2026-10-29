# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` already accepts a real session store and serves authenticated WebSocket connections. The acceptance file exercises that public path and the existing frame validator.

## Done when these pass

- [ ] **accepts the history request and rejects malformed limits and cursors** — validates the new request and its bounded, composite cursor.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the connected user’s metadata, pages with the wire cursor, and opens a selected conversation** — sends safe summaries, preserves the authenticated owner and paging arguments, and uses the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses history when the deployer has not enabled it or the store cannot list** — reports `UNSUPPORTED` rather than a false empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request during a streaming turn without waiting for stream_end** — answers outside the session lock without ending the turn.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the request, cursor, summary and response wire types and the `UNSUPPORTED` error code without changing existing frames.
- [ ] Validate the request shape independently of the history opt-in.
- [ ] Thread `transport.history` and the session store through the server; answer from the authenticated socket user with ISO summaries and the requested page.
- [ ] Refuse disabled or unavailable history, and handle store failures with a safe `SERVER_ERROR` while keeping the socket open.
- [ ] Answer history requests outside the session turn lock, without unsolicited lists or `stream_end`.
- [ ] Document the protocol, retention and resume relationship, regenerate the getting-started listing from `example/full-config.ts`, and add a consumer-facing changelog entry and MINOR version bump.

## Out of scope

- Conversation previews, deletion, an operator view of other users, server-held paging state, and live tab sync.