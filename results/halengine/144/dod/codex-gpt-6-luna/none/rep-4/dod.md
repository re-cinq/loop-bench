# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are callable seams, and the in-memory session store provides real user-scoped data for the handler path.

## Done when these pass

- [ ] **Conversation list protocol validation** — the list frame and its optional paging fields are validated at the WebSocket boundary.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **Authenticated conversation list response** — an enabled request returns only the connection user's summaries as ISO wire values, without ending a turn.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **History opt-in refusal** — a disabled feature answers `UNSUPPORTED` and sends no list.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add list frame validation with bounded paging fields.
- [ ] Return user-scoped conversation summaries over the socket with history enabled.
- [ ] Refuse list requests when history is disabled.

## Out of scope

- Reconnection and replay, which remain the existing `sessionId` resume path.
- Documentation and release metadata not needed to observe the list protocol behavior.