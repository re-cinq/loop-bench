# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — `createServer` already exposes the real authenticated WebSocket entry point, and the shipped in-memory store supplies real conversation summaries. The acceptance file connects over an actual socket and observes frames at that boundary.

## Done when these pass

- [ ] **validates a list request and rejects invalid limits or incomplete cursors by field name** — the new client frame accepts optional paging fields only in their specified ranges and composite shape.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **sends the authenticated user newest-first ISO summaries without waiting for a streaming turn** — enabled history uses the connection identity, forwards paging, serializes summaries, and bypasses the turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers unsupported or failed list providers with errors rather than an empty list** — disabled history, incapable stores, and failed stores report the required error codes without fabricating an empty history or leaking failure detail.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, their cursor and summary payloads, and the additive `UNSUPPORTED` error code.
- [ ] Validate `limit` and the complete ISO-string `{updatedAt, sessionId}` cursor while discarding extra fields.
- [ ] Thread the opt-in history setting and store through the server to a non-locked list handler.
- [ ] Serialize only the authenticated user's newest-first summaries and forward both paging values.
- [ ] Report disabled, incapable, known-unsupported, and failed stores without an empty list or sensitive detail.
- [ ] Document the frames, authorization and retention rules, opt-in configuration, changelog entry, and minor version bump.

## Out of scope

- Conversation previews or titles, deletion, server-side paging state, operator access to another user's conversations, in-band conversation switching, and live synchronization between tabs.