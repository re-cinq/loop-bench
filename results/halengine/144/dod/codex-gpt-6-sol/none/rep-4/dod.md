# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` already exposes a real WebSocket entry point and the shipped in-memory store lists real conversations. The acceptance tests exercise the wire protocol and the validator through those seams.

## Done when these pass

- [ ] **accepts a list request and rejects malformed limits and cursors** — the new client frame validates independently of the history switch.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **returns only the connection owner’s newest summaries, forwarding the page cursor** — an authenticated socket receives its own metadata as ISO strings, the store receives the connection user and paging options, and a listed id resumes with replay.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **reports unsupported history when disabled or when the store cannot list** — unavailable history is an error, never an empty list.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a list while a turn is still streaming** — listing does not wait for a turn's stream end.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, cursor and summary wire types, and the additive `UNSUPPORTED` error code.
- [ ] Validate the frame's limit and complete ISO cursor, while discarding any supplied user id.
- [ ] Thread `transport.history` through config and server options, defaulting off, with its retention note.
- [ ] Answer lists outside the per-session turn lock using `ws.userId`, preserving the store's newest-first order and ISO times.
- [ ] Return `UNSUPPORTED` for disabled history or unavailable listing, and a sanitized `SERVER_ERROR` for a failed store call while keeping the socket open.
- [ ] Verify a list can arrive before a streaming turn ends, and a listed id rejoins through the existing resume path.
- [ ] Document the frame fields, authorization and opt-in in the protocol and conversation-list specs; regenerate the getting-started example block; add an Unreleased changelog entry and minor version bump.
- [ ] Keep existing message literals and `ConnectedMessage` compatible; run repository CI gates and update spec citations and status once implementation is green.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live tab synchronization.