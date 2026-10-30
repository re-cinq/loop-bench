# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The running WebSocket server is an existing public seam. The acceptance tests connect a real client to it and exercise validation, authenticated listing, lock bypass, paging, opt-in, and failure frames without production changes.

## Done when these pass

- [ ] **accepts a list request and rejects invalid limits or an incomplete cursor** — the new request and its bounded composite cursor are validated as protocol input
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, forwards the page, and answers outside a streaming turn** — an enabled real socket returns ISO summaries for its authenticated owner, ignores a frame user id, forwards paging, and does not queue behind a turn
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported or failed listing as errors without closing the socket or inventing an empty list** — disabled history, a store without listing, and a failed store produce the specified safe errors while the connection remains usable
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two additive protocol frames, cursor and wire-summary types, and the `UNSUPPORTED` error code.
- [ ] Validate `list_conversations` limits and its complete composite cursor.
- [ ] Thread the history opt-in and session store to the non-locked WebSocket handler.
- [ ] Serialize only the authenticated user's summaries and forward the requested page.
- [ ] Distinguish unsupported listing from a failed listing without leaking store details.
- [ ] Document the protocol, configuration, retention responsibility, changelog entry, and MINOR version bump.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live cross-tab synchronization.