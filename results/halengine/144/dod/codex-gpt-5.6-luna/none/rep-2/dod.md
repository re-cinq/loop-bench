# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The WebSocket validator and the real server upgrade/connection path already exist. The acceptance tests exercise those entry points with the shipped in-memory store and a real WebSocket client.

## Done when these pass

- [ ] **validates list_conversations with an optional bounded limit and composite cursor** — accepts the protocol request shape and rejects invalid paging fields with field-specific errors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user’s paged list as ISO summaries and ignores a frame userId** — delivers only the connection user’s paged conversation summaries when history is enabled, with no stream response.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses the request when history is not enabled** — returns `UNSUPPORTED` rather than a list when the opt-in is absent.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive inbound and outbound conversation-list protocol types and validator rules.
- [ ] Thread history options and the session store through the WebSocket handler.
- [ ] Answer the authenticated user’s list request with ISO summaries, paging, and unsupported-feature errors.
- [ ] Keep list requests outside the per-session turn lock.
- [ ] Add the protocol/config documentation, changelog, version bump, and spec citations required by the ticket.

## Out of scope

- Conversation previews, deletion, operator views, live cross-tab synchronization, and a new in-band conversation switch frame.