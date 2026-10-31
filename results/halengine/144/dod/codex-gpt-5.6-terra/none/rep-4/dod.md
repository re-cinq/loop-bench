# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server, validator, and in-memory session store are already callable from tests. The acceptance suite exercises a browser socket through that existing transport seam.

## Done when these pass

- [ ] **conversation list WebSocket acceptance** — validates the list frame, delivers the authenticated user's summaries when opted in, and refuses the request by default.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list frame types and static frame validation.
- [ ] Thread the history opt-in and session store into the WebSocket handler, returning authenticated, wire-safe summaries outside the turn lock.
- [ ] Return safe `UNSUPPORTED` and server-error responses when listing is unavailable or fails, and document the transport contract.

## Out of scope

- Conversation previews, deletion, server-held paging state, operator history views, and live cross-tab synchronization.