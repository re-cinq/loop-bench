# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The running WebSocket server is already the real entry point, and it owns both the authenticated connection and the session store. The acceptance tests exercise validation and delivery through that path with the in-memory store.

## Done when these pass

- [ ] **accepts list_conversations and validates its limit and composite before cursor** — the new frame is accepted, while invalid paging fields name the field in `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated user’s newest summaries and pages with the returned cursor** — an enabled connection receives ISO-dated summaries for its own user, honors paging, ignores a frame user id, and emits no turn terminator.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses the frame with UNSUPPORTED when history is not enabled** — the default-off configuration returns an error and no conversation list.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Validate the additive request frame and its limit/cursor constraints.
- [ ] Deliver authenticated, newest-first summaries with ISO wire timestamps and paging.
- [ ] Keep list requests outside the per-session turn terminator path.
- [ ] Refuse the feature when history is disabled.

## Out of scope

- Store implementation details already covered by the conversation-list spec.
- Conversation deletion, live cross-tab synchronization, previews/titles, and operator access to another user’s history.