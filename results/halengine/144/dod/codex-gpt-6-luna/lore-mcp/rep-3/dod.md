# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createMessageHandler` is the real dispatch seam, and the existing session store already exposes `listFor`. The acceptance test sends the wire frame through that handler with a real in-memory store and checks the authenticated user's protocol response.

## Done when these pass

- [ ] **answers an authenticated user with their own ISO summary rows when they ask** — the socket request returns the user's newest-first metadata over the WebSocket protocol, without conversation content or a turn terminator.
      `src/transport/ws/messageHandler.acceptance.test.ts`

## Facets

- [ ] Accept and dispatch `list_conversations` as a non-turn request.
- [ ] Read the authenticated user's summaries and serialize both timestamps as ISO strings.
- [ ] Keep history opt-in and return protocol errors when the feature cannot answer.

## Out of scope

- HTTP conversation routes, client rendering, conversation switching, previews, deletion, paging state, and live synchronization between tabs.