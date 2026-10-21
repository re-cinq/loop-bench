# Definition of Done

> The browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` is the real WebSocket entry point and already receives both the authenticated session store and the socket message handler. The acceptance test uses a real WebSocket connection and the shipped in-memory store to pin delivery of the authenticated user's summaries.

## Done when these pass

- [ ] **delivers only the connected user’s summaries with ISO dates when history is enabled** — a client can request its authenticated user's conversation summaries over the WebSocket, without receiving another user's list or a turn frame.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept and handle the list request on the socket using the connection's authenticated user.
- [ ] Return conversation summaries over the wire with ISO date strings.
- [ ] Gate listing behind the history opt-in and report unsupported requests as errors.

## Out of scope

- Conversation previews, deletion, cross-tab sync, and a client-side conversation switch frame.