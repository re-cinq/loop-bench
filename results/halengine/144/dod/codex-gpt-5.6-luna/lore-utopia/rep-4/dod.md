# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real `createServer` WebSocket entry point and the real in-memory session store already provide the seam. The acceptance tests connect over actual WebSocket clients and exercise validation, authentication ownership, paging, opt-in, and unsupported-store errors.

## Done when these pass

- [ ] **validates list_conversations and names every invalid field** — accepts the new frame and rejects invalid limits and cursors with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user's list as ISO summaries and ignores a frame userId** — returns the authenticated user’s newest summaries with wire-safe timestamps and no turn terminal frame.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **passes paging options to the store and refuses disabled or unsupported history** — forwards the cursor unchanged and reports `UNSUPPORTED` when history is disabled or the store cannot list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive protocol types and validation.
- [ ] Thread history opt-in and authenticated list handling through the real WebSocket server.
- [ ] Preserve paging arguments and return safe errors for disabled or unavailable history.

## Out of scope

- Conversation previews or titles, deletion, server-side paging state, operator access to another user’s history, and live cross-tab synchronization.
- Resume behavior, which is already covered by the existing session-resume path.