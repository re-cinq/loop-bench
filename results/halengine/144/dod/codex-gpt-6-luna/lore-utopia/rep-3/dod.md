# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` exposes the real authenticated WebSocket path and accepts a session store. The acceptance test exercises that path with real sockets and the in-memory store.

## Done when these pass

- [ ] **The conversation list websocket protocol answers an authenticated request** — returns the caller's summaries as ISO dates even when the frame names another user.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept and validate the list request, including its paging options.
- [ ] Return the authenticated user's summaries over the socket with the history opt-in enabled.
- [ ] Refuse disabled or unsupported listing and safely report store failures.
- [ ] Keep list requests off the per-session turn lock.

## Out of scope

- Conversation selection and replay, which use the existing `?sessionId=` resume path.
- Preview text, deletion, operator access to another user's conversations, and live sync between tabs.