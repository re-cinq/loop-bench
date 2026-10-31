# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` provides a real WebSocket entry point backed by a real session store. The acceptance test sends the new frame through an authenticated connection and observes the wire response and store call.

## Done when these pass

- [ ] **returns the authenticated user’s ISO summaries and passes the cursor to the store** — an enabled history request returns only the connected user’s conversations as wire-safe summaries and forwards paging unchanged.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the `list_conversations` and `conversation_list` protocol types and validation.
- [ ] Thread the history option and session store into the non-locked WebSocket handler.
- [ ] Return the authenticated user’s paged summaries as ISO strings, with the documented error cases.

## Out of scope

- Conversation previews, deletion, server-side paging state, operator access to another user’s conversations, and live cross-tab synchronization.