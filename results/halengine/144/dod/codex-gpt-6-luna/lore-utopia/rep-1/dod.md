# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and `validateMessage` are existing real entry points. A real WebSocket upgrade can exercise the authenticated connection path and the existing session store without a substitute transport.

## Done when these pass

- [ ] **Accepts and validates conversation-list frames** — valid frames are accepted; invalid limits and cursors are rejected with the field named.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **Delivers the authenticated user's paged conversation summaries** — the frame cannot select another user, pagination reaches `listFor`, and summaries are newest first with ISO timestamps and no turn terminator.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **Refuses history when the opt-in is off** — the request gets `UNSUPPORTED` and no conversation list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add and validate the list request frame and its paging fields.
- [ ] Wire the opt-in history handler through the real WebSocket server and return the authenticated user's summaries.
- [ ] Cover the disabled and unavailable-store error paths without representing failure as an empty list.
- [ ] Document the request, response, privacy rule and deployment opt-in in the protocol and conversation-list specs.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, cross-tab live sync, and a REST history endpoint.