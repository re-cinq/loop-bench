# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and its frame validator already provide a seam. The acceptance suite opens real upgraded sockets against an in-memory store and calls the exported validator directly.

## Done when these pass

- [ ] **conversation list WebSocket protocol** — validates list frames, delivers only the authenticated user's wire summaries, forwards paging, and refuses the disabled feature.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire types and static validation for a bounded composite cursor.
- [ ] Thread the opt-in history transport and session store into the non-locked WebSocket handler.
- [ ] Return authenticated-user summaries as ISO wire values; distinguish unsupported stores and store failures safely.
- [ ] Document the wire frames, retention/privacy decision, configuration, and release note.

## Out of scope

- Conversation previews, deletion, operator access to another user's history, server-held paging state, and live multi-tab synchronization.