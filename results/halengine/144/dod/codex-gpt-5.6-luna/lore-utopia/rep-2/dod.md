# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and the real `createServer` WebSocket path are already exposed. The acceptance tests exercise those entry points over a real WebSocket and the in-memory session store.

## Done when these pass

- [ ] **accepts list_conversations and validates its limit and composite before cursor** — accepts the new request frame and rejects invalid limits or incomplete cursors with field-specific errors.
      `src/transport/conversation-list.acceptance.test.ts`
- [ ] **answers the authenticated user’s list with summaries, ignoring a frame userId** — returns only the connecting user’s newest-first conversation summaries, with wire-safe ISO timestamps and no conversation content.
      `src/transport/conversation-list.acceptance.test.ts`
- [ ] **refuses the list with UNSUPPORTED when history is not enabled** — keeps the feature opt-in and emits an error rather than a list when disabled.
      `src/transport/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add the additive list message and summary wire types.
- [ ] Validate limit and composite cursor fields.
- [ ] Thread the history option through the real WebSocket server and answer lists outside the turn lock.
- [ ] Enforce authenticated-user ownership and ISO serialization.
- [ ] Return `UNSUPPORTED` when history is disabled.

## Out of scope

- Store implementation details already covered by the conversation-list store spec.
- Conversation deletion, previews or titles, server-side paging state, and live cross-tab synchronization.