# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and the real WebSocket server are existing seams. The acceptance suite sends frames over an authenticated socket and observes the returned wire frames and the store boundary.

## Done when these pass

- [ ] **conversation-list WebSocket delivery** — validates cursors, delivers only the authenticated user's summaries, reports unavailable history safely, and bypasses a streaming turn's lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire shapes, validator, error code, and history option.
- [ ] Dispatch enabled history requests through the authenticated connection and the optional store capability.
- [ ] Return safe errors for unavailable or failed history, and keep list requests outside the turn lock.

## Out of scope

- Conversation previews, deletion, cross-user/operator lists, and live synchronization between sockets.