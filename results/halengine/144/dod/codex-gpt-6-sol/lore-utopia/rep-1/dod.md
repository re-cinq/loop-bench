# Definition of Done

> the browser holding the socket cannot reach the store

**Strategy: `direct`** — The WebSocket server and validator already accept real client frames, so the new request can be tested through the live socket and validation entry points. The store's existing `listFor` supplies real summaries.

## Done when these pass

- [ ] **accepts a list request and rejects malformed limits and cursors by field** — validates the new request and its composite cursor.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **returns only the connected user’s newest summaries and pages by the supplied cursor** — sends metadata for the authenticated user and supports paging and resume.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers with UNSUPPORTED when history is disabled or the store cannot list** — distinguishes unavailable history from an empty history.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the request and response protocol types, composite cursor, and `UNSUPPORTED` error code.
- [ ] Validate the list request and cursor independently of feature configuration.
- [ ] Thread the history option and store into the handler; answer on the non-locked path using `ws.userId`.
- [ ] Return metadata as ISO strings, preserve paging options, and use the existing resume path.
- [ ] Return `UNSUPPORTED` for disabled or unavailable listing, and sanitize store failures.
- [ ] Update configuration examples, generated docs, changelog, and the minor version.

## Out of scope

- Conversation previews, deletion, operator access to another user's list, and live cross-tab synchronization.