# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` and a real WebSocket connection are available today. The tests exercise validation and wire frames through that path using the shipped in-memory store.

## Done when these pass

- [ ] **accepts a list request and rejects invalid limits or incomplete cursors** — a valid request reaches dispatch and malformed bounds or cursors are refused.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user’s summaries, pages on the wire cursor, and resumes a selected row** — the client gets its own metadata in wire format and can open a selected conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with UNSUPPORTED when history is not enabled** — the feature remains opt-in.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with UNSUPPORTED when an enabled store has no listFor** — unavailable history is an error, not an empty result.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request before a streaming turn ends** — listing does not queue behind a turn.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, cursor and wire summary types, `UNSUPPORTED`, and static request validation while preserving existing message literals.
- [ ] Thread `transport.history` through `createHalEngine` and `createServer`; answer lists from the connection's authenticated user outside the turn lock.
- [ ] Map absent listing and `StoreCannotList` to `UNSUPPORTED`; map a rejecting store to a safe `SERVER_ERROR` while keeping the socket open and logging the session id without user content.
- [ ] Document the opt-in, retention responsibility, frames, replay path, and version change in the specs, generated getting-started example, and changelog; bump the minor version.
- [ ] Keep the protocol types additive and the existing `connected` frame unchanged.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator views of another user, and live synchronization across tabs.