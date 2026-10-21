# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` is the real WebSocket server seam, and the test drives a real authenticated socket through it into the message handler and session store.

## Done when these pass

- [ ] **answers the connecting user with their conversation summaries** — a client request returns only the authenticated user's newest-first summaries with wire-safe ISO timestamps, even when the frame includes another user id.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the real-socket red test for authenticated conversation-list delivery.
- [ ] Implement opt-in history handling and return the authenticated user's summaries as `conversation_list`.

## Out of scope

- Summary previews or titles, deletion, server-held paging state, operator access to another user's list, and live synchronization between tabs.