# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` already owns the authenticated WebSocket connection, session store, and message handler. The acceptance tests use that real socket path plus the existing in-memory store, with no production seam required.

## Done when these pass

- [ ] **accepts a list frame and names every invalid limit or cursor field** — validation accepts the new frame and rejects malformed paging fields with field-specific errors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **delivers the authenticated user’s summaries and forwards the paging cursor** — an enabled history request returns ISO summaries for only the connecting user, ignores a forged frame user id, and forwards `{limit, before}` to the store.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses the list when history is not enabled without sending an empty list** — history is opt-in and disabled requests return `UNSUPPORTED` without a list frame.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive list message, cursor, summary, outgoing frame, and unsupported error types.
- [ ] Add static validation for the list frame and its bounded paging cursor.
- [ ] Thread history options and the session store through the real WebSocket handler outside the per-session turn lock.
- [ ] Return authenticated summaries as wire-safe ISO timestamps and map unsupported or failing stores to protocol errors.
- [ ] Keep the existing resume path as the way a client opens a listed conversation.

## Out of scope

- Conversation previews, deletion, operator views, server-held paging state, live tab synchronization, and REST history routes.