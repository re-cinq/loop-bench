# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real `createServer` WebSocket path and `validateMessage` already exist. These tests drive both using a real socket and a real session store.

## Done when these pass

- [ ] **accepts list requests and rejects invalid limits or incomplete cursors** — The new frame is valid independently of the feature flag and invalid input names its field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user’s newest summaries and passes a composite cursor to the store** — The response is ordered metadata for the connection's user, paged through the composite cursor, with no turn terminator.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns UNSUPPORTED when history is off or the store cannot list** — Neither condition is represented as an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns a generic SERVER_ERROR for a failed list and keeps the socket usable** — A transient failure hides store detail and does not close the connection.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list during a turn and lets its selected conversation resume with replay** — Listing bypasses the turn lock and the selected id uses the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two frames, cursor and wire summary types to `messages.ts` without changing existing message shapes; add `UNSUPPORTED`.
- [ ] Validate the list frame and composite cursor, dropping extra fields including a supplied user id.
- [ ] Thread the separate, default-off `transport.history` option through `createHalEngine` and `createServer` to the message handler; document the retention decision and warn when history is enabled without resume.
- [ ] Answer lists outside the turn lock using `ws.userId`; serialize summary times as ISO strings and never send `stream_end` for a list.
- [ ] Handle disabled history, missing `listFor`, `StoreCannotList`, and store rejection with the specified codes, safe message and session-id logging.
- [ ] Extend the protocol spec, getting-started example and generated guide, and `CHANGELOG.md`; bump the package minor version and state that in the PR body.
- [ ] Keep spec links, status coverage and the repository's CI gates green after implementation.

## Out of scope

- Conversation previews or titles, deletion, an operator's view of another user, server-held paging state, and live synchronization between tabs.