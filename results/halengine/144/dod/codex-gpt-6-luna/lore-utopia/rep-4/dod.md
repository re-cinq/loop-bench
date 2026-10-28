# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and a real WebSocket connection are an existing seam, and `validateMessage` is directly callable. The tests exercise the protocol with the real session store and no doubles.

## Done when these pass

- [ ] **Returns the authenticated user’s summaries as ISO timestamps when history is enabled** — a client frame receives the caller’s own metadata-only rows over the socket, with pagination forwarded to the store.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **Validates list_conversations pagination fields at the protocol boundary** — the frame is accepted and invalid limits or cursors are rejected with the field named.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **Answers with UNSUPPORTED and no list when history is disabled** — opt-out is an explicit error response rather than a misleading empty history.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept and validate `list_conversations` frames, including bounded limit and cursor fields.
- [ ] Return authenticated-user summaries as ISO wire values through the WebSocket handler.
- [ ] Refuse history requests with `UNSUPPORTED` when the feature is disabled.

## Out of scope

- Switching conversations in-band; clients reconnect with `?sessionId=` through the existing resume path.
- Conversation previews, deletion, cross-tab synchronization, and operator access to another user’s history.