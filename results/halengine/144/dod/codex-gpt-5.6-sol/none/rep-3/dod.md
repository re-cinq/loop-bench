# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server is already an executable seam: a live authenticated socket can send frames against a real in-memory session store and observe the protocol response.

## Done when these pass

- [ ] **validates the list frame and its bounded composite cursor** — The new request and its optional paging fields are accepted, while malformed bounds and cursors identify the invalid field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers from the authenticated user in newest-first wire form and pages with the returned cursor** — An enabled live socket receives only its own summaries as ISO wire values, without a turn terminal frame, and can page using the returned composite cursor.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports UNSUPPORTED instead of an empty list when history is disabled or the store cannot list** — Both opt-out and an older store lacking `listFor` fail explicitly over the live socket.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add and validate the two additive protocol frames and their wire payload types.
- [ ] Thread the independently disabled history option and session store into the non-locked message path.
- [ ] Serialize the authenticated user's newest-first summaries and forward the paging window unchanged.
- [ ] Return `UNSUPPORTED` for disabled history or a store that cannot list, without emitting an empty list.
- [ ] Document the opt-in disclosure, retention responsibility, reconnect flow, and MINOR release.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live synchronization between tabs.