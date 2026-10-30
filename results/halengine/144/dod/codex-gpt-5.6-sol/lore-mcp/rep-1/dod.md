# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store

**Strategy: `direct`** — The real `createServer` entry point exposes the authenticated WebSocket, session store, resume path, and turn lock. Acceptance tests can therefore exercise the protocol through real socket upgrades without changing production code or introducing a parallel seam.

## Done when these pass

- [ ] **validates the list frame and its bounded composite cursor** — The new client frame accepts optional paging and rejects malformed limits or either incomplete/invalid cursor half.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, pages on the wire cursor off the turn lock, and resumes a chosen row** — An enabled real server returns ISO summaries for `ws.userId`, forwards paging, does not wait for a streaming turn, and leaves selection to the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns UNSUPPORTED when history is off or unavailable instead of pretending the list is empty** — Disclosure is opt-in and a store without listing produces an explicit error rather than an empty history.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, their wire payload types, and the additive `UNSUPPORTED` error code.
- [ ] Validate the bounded limit and both ISO-string fields of the composite cursor.
- [ ] Thread the separate history opt-in and store through the server to a non-locking list handler.
- [ ] Serialize store summaries as wire-safe ISO strings and always authorize from the connected socket.
- [ ] Report disabled, unavailable, unsupported-store, and transient store failures without disclosing store detail.
- [ ] Document the frames, authorization and retention rules, generated configuration example, changelog, and MINOR release.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's conversations, and live synchronization between tabs.