# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and a real WebSocket server backed by the in-memory session store expose the protocol boundary today.

## Done when these pass

- [ ] **validates conversation list requests and their composite cursor** — Accept the request and reject malformed paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user’s metadata and pages using the wire cursor** — Send authenticated, ordered wire summaries and honor paging.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list request when history is not enabled** — Default to an UNSUPPORTED error.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire types and validate the request and cursor.
- [ ] Thread the independent history option and store through the server; answer outside the turn lock with the authenticated user's metadata.
- [ ] Return UNSUPPORTED for disabled history or unavailable listing, and a sanitized SERVER_ERROR for store failures; preserve the socket and log safely.
- [ ] Verify a listed id resumes and replays via the existing path, including during streaming, and document configuration, privacy, and release changes described in the ticket.

## Out of scope

- Conversation deletion, previews, operator access, server-side paging state, and live synchronization across tabs.