# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real `createServer` upgrade path and WebSocket protocol are already available, and the acceptance tests exercise them with the shipped in-memory session store.

## Done when these pass

- [ ] **validates list_conversations limits and the composite ISO cursor** — accepts the new frame and rejects invalid limit/cursor fields with field-specific errors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user with an ordered ISO conversation list and forwards paging** — returns summaries over the real socket, uses the connection user rather than a frame user id, forwards `{limit, before}`, and does not emit a turn terminator.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses the list when history is off or the store cannot list** — returns `UNSUPPORTED` for both deployment/configuration cases rather than an empty list.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive incoming and outgoing protocol types, including the composite cursor and ISO wire summaries.
- [ ] Validate list options and dispatch the request outside the per-session turn lock.
- [ ] Thread the history opt-in through server configuration and answer disabled or unsupported requests with `UNSUPPORTED`.
- [ ] Use `ws.userId` for store access and map store summaries to JSON-safe protocol values.
- [ ] Keep the protocol specification and acceptance citations aligned with the executable contract.

## Out of scope

- Conversation deletion, previews or titles, server-side paging state, operator access to another user's conversations, and live cross-tab synchronization.
- Client-side reconnect behavior beyond the existing session-resume protocol.