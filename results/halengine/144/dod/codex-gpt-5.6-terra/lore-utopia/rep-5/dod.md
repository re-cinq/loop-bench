# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and its in-memory store can be exercised over a socket today. The acceptance suite observes the frames sent to an authenticated client through that public entry point.

## Done when these pass

- [ ] **conversation-list WebSocket acceptance** — validates bounded cursor input, authenticated conversation delivery, and visible unsupported responses.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add and validate the `list_conversations` input frame and composite cursor.
- [ ] Thread the history option and session store into the WebSocket handler, returning ISO summaries for `ws.userId` without taking the turn lock.
- [ ] Return `UNSUPPORTED` when history is off or listing is unavailable.

## Out of scope

- Conversation previews, deletion, operator-wide lists, server-held paging state, and live tab synchronization.