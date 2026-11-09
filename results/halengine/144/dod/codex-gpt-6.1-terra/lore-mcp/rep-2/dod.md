# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and the running WebSocket server already expose the protocol boundary. Real in-memory sessions and socket frames exercise it without doubles.

## Done when these pass

- [ ] **validates a list request and its composite cursor** — Accept valid requests and reject malformed paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns only the authenticated user’s summaries and pages them over the socket** — Deliver the authenticated user's requested page without conversation content.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is disabled** — Default to an unsupported error rather than disclosing a list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive protocol types and validate the composite cursor.
- [ ] Wire opt-in history to the store, authorize from the socket, and serialize the summaries.
- [ ] Handle unsupported stores and store failures safely, outside the per-session turn lock.
- [ ] Document configuration, privacy, reconnect and release changes described in the ticket.

## Out of scope

- Conversation deletion, titles, operator access and live synchronization between tabs.