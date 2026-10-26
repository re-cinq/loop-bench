# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing WebSocket validator and real server/client harness are direct seams for the requested behavior. The acceptance tests use the in-memory session store and a real WebSocket connection, so the red bars observe the protocol rather than source text or test doubles.

## Done when these pass

- [ ] **validates list_conversations cursors and limits** — accepts the new frame and rejects invalid limit and cursor fields with field-specific errors.
      `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **delivers only the authenticated user’s summaries, in pages, with ISO timestamps** — lists the connection user’s summaries over the socket, ignores a frame user id, preserves newest-first paging, and exposes only the four wire fields.
      `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **refuses the list with UNSUPPORTED when history is not enabled** — keeps the feature opt-in and sends an error instead of a list when disabled.
      `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add the additive conversation-list message types and validator rules.
- [ ] Thread the history option through server configuration and answer list requests outside the per-session turn lock.
- [ ] Serialize authenticated conversation summaries and map unsupported or disabled history to `UNSUPPORTED`.
- [ ] Keep the new protocol behavior documented and connected to its WebSocket spec statements.

## Out of scope

- Conversation previews, deletion, operator views, live cross-tab synchronization, or a new in-band conversation switch frame.