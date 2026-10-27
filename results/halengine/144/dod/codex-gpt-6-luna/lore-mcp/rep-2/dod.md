# Definition of Done

> “It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.”

**Strategy: `direct`** — `createMessageHandler` is the existing real WebSocket message entry point and can be exercised with an authenticated socket and session store. The test proves a request returns the wire summaries and uses the connection's user identity.

## Done when these pass

- [ ] **Authenticated conversation list** — a socket request receives ISO timestamp summaries from its own user's list, even if the frame supplies another user id.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the `list_conversations` and `conversation_list` protocol types and wire serialization.
- [ ] Validate list paging fields and handle list requests on the non-locked path.
- [ ] Gate listing behind `transport.history.enabled` and return an error when listing is unavailable.
- [ ] Document the protocol and history opt-in.

## Out of scope

- Selecting a listed conversation; clients reconnect using the existing resume protocol.