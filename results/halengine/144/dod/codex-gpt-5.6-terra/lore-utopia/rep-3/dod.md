# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The WebSocket validator and real server startup provide direct seams for the frame and its authenticated response. The acceptance suite uses a real socket and in-memory store.

## Done when these pass

- [ ] **conversation list WebSocket acceptance** — validates the list frame, authenticated ISO summaries, and disabled-history refusal.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list request and response protocol types, validation, and `UNSUPPORTED` error code.
- [ ] Thread the explicit history opt-in and store through the message handler, answering a user's list outside the turn lock.
- [ ] Serialize summaries and document the authenticated, metadata-only WebSocket contract.

## Out of scope

- Conversation previews, deletion, operator views, server-held paging state, and live synchronization between tabs.