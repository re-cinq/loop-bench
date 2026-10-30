# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine configuration and real WebSocket server provide the seam. The tests connect over real sockets to the real in-memory store and exercise validation, authorization, paging, resume, opt-in refusal, and lock behavior.

## Done when these pass

- [ ] **validates the list frame and its complete composite cursor** — the new client frame accepts only the documented limit and complete ISO-string cursor.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, forwards paging unchanged, and lets a listed id resume** — an enabled server returns wire-safe summaries for `ws.userId`, passes paging to the store, and leaves selection on the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store cannot list, never an empty list** — both unsupported states fail explicitly instead of looking like an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a turn is still waiting, before that turn can send stream_end** — listing bypasses the per-session turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two additive protocol frames, their cursor and summary payload types, and `UNSUPPORTED`.
- [ ] Validate `list_conversations` limits and complete composite cursors while discarding extra fields.
- [ ] Thread the default-off `transport.history` option and session store into the WebSocket handler.
- [ ] Return authenticated, paged, ISO-string summaries outside the turn lock.
- [ ] Return safe `UNSUPPORTED` and `SERVER_ERROR` frames for unavailable or failed listing and log failures without user content.
- [ ] Document the protocol, privacy/retention decision, configuration, and MINOR release change.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's conversations, in-band conversation switching, and live synchronization between tabs.