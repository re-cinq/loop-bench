# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` and its WebSocket server are an existing real entry point, while `InMemorySessionStore` supplies real summaries. The acceptance suite opens real sockets through that boundary and is red because the protocol frame is not yet implemented.

## Done when these pass

- [ ] **conversation-list WebSocket acceptance** — validates the client frame, returns the authenticated user's wire-safe summaries and paging request, and refuses unavailable history without pretending it is empty.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive conversation-list protocol types and static frame validation.
- [ ] Thread the opt-in history setting and session store to the unlocked WebSocket list handler.
- [ ] Return ISO summaries for `ws.userId`, map unsupported and store failures safely, and document the protocol and configuration.

## Out of scope

- Conversation previews, deletion, an operator's view of another user's conversations, server-held paging state, and live synchronization across tabs.