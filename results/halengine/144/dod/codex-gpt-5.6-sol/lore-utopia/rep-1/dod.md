# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` already exposes the real authenticated WebSocket boundary and the shipped in-memory store supplies real conversation summaries. The acceptance suite connects a real client to that boundary and observes only wire frames.

## Done when these pass

- [ ] **validates the request and identifies every invalid paging field** — accepts the additive request and rejects malformed limits and composite cursors with field-specific errors
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with only the authenticated user's newest summaries, pages them, and lets a listed id resume** — returns ISO summaries for `ws.userId`, forwards the paging window, and feeds a selected id through the existing resume path
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports UNSUPPORTED when history is off or the store cannot list, never an empty list** — preserves the opt-in and distinguishes unavailable history from an empty history
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a store failure without its detail and leaves the socket usable** — contains operational failures without leaking store detail or closing the connection
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list while a turn is streaming, before that turn ends** — keeps the read-only history request outside the per-session turn lock
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, wire-safe summary and cursor types, and `UNSUPPORTED` error code without changing existing frame shapes.
- [ ] Validate the optional limit and composite cursor while discarding fields outside the frame contract.
- [ ] Thread the separately opted-in history option and session store through the server to the message handler.
- [ ] Answer lists for the authenticated socket user off the turn lock, converting summary dates to ISO strings.
- [ ] Map disabled or incapable stores to `UNSUPPORTED`, unexpected store failures to sanitized `SERVER_ERROR`, and `StoreCannotList` to `UNSUPPORTED`.
- [ ] Document the protocol, GDPR boundary, configuration and release as specified by the ticket.

## Out of scope

- Conversation titles or previews, deletion, server-held paging state, operator access to another user's history, and cross-tab live synchronization.