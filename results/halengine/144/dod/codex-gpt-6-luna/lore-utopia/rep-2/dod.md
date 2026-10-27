# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` exposes the real authenticated WebSocket path and the existing in-memory session store already lists summaries. The acceptance tests can exercise the request, validation, and response without a test double.

## Done when these pass

- [ ] **serves the authenticated user’s conversation summaries over the WebSocket** — an enabled real socket request returns only that user's summaries, newest first, with ISO dates and no conversation content; pages with the wire cursor and resumes a listed session through the existing connection path.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **validates list paging fields before the handler reads them** — accepts the frame and composite cursor, and rejects invalid limits or a malformed cursor with a field-specific error.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses a history request when the transport history option is off** — the valid request receives `UNSUPPORTED` and no list.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers a history request before a streaming turn on the same session ends** — a history reply is not queued behind a turn's `stream_end`.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept and validate the list request and paging fields.
- [ ] Thread the opt-in setting and session store into the non-turn WebSocket handler.
- [ ] Return authenticated user's summaries on the wire, with ISO dates and a safe error when history is disabled.

## Out of scope

- Returning titles or previews, deleting conversations, server-held paging state, operator access to other users' histories, and live cross-tab synchronization.