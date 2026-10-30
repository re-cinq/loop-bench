# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The frame validator and a real `createServer` WebSocket connection are existing entry points. The acceptance tests use those seams with the real in-memory store and orchestrator.

## Done when these pass

- [ ] **validates an optional limit and composite before cursor before accepting the frame** — The request frame accepts the documented optional paging fields and rejects malformed bounds or cursors with a field-specific error.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers from the authenticated user immediately, pages with the wire cursor, and resumes a listed conversation** — An enabled server returns only the authenticated user's newest-first ISO summaries, passes paging through, bypasses an active turn, and a returned id resumes through the existing path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported and failed stores as errors without pretending the user has an empty history** — Disabled history, a store without listing, and a failed listing produce the specified errors while keeping failures safe and explicit.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two additive protocol frames, their cursor and summary payload types, and the `UNSUPPORTED` error code.
- [ ] Validate list requests and their bounded composite paging cursor.
- [ ] Wire the opt-in history configuration and session store into the WebSocket handler.
- [ ] Answer lists outside the turn lock using the connection's authenticated user and wire-safe dates.
- [ ] Map disabled, unavailable, unsupported, and failed listing operations to safe error frames and logs.
- [ ] Document the frames, authorization and retention rules, configuration, changelog, and minor release.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live cross-tab synchronization.