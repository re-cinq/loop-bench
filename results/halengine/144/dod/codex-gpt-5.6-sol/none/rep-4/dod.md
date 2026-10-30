# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The public engine factory can be started on an ephemeral port and exercised through a real WebSocket client, with the shipped in-memory session store supplying real conversation summaries.

## Done when these pass

- [ ] **validates a list request and rejects each malformed limit or cursor by field name** — The new client frame and its bounded, composite cursor are part of static protocol validation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers from the authenticated user's store window before an in-flight turn ends** — An enabled engine returns only the connected user's ISO-serialized summaries, honors paging, ignores a frame user id, and answers outside the turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, never an empty list, when history is off or the store cannot list** — Both opt-out and an incapable store are explicit failures rather than false empty histories.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, their cursor and wire-summary payload types, and the additive `UNSUPPORTED` error code.
- [ ] Validate `limit` and the complete composite `before` cursor while discarding fields outside the frame contract.
- [ ] Thread the independently opt-in history setting and session store through the public engine and server factories.
- [ ] Answer lists from `ws.userId` outside the per-session turn lock, serialize dates, and forward the requested window.
- [ ] Distinguish disabled or incapable stores from an empty history, and sanitize unexpected listing failures as `SERVER_ERROR` without closing the socket.
- [ ] Document the disclosure, retention, resume dependency, client flow, and MINOR release change in the generated docs and changelog.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live synchronization between tabs.