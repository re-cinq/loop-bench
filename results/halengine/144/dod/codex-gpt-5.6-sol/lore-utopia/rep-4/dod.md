# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The frame validator and real WebSocket server are existing entry points. The acceptance tests connect through an actual socket and exercise real session-store values.

## Done when these pass

- [ ] **validates the list request and its paging fields** — The new frame is accepted only with the bounded limit and complete ISO cursor the protocol defines.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the authenticated user’s newest conversations and forwards the cursor** — An enabled server returns wire-safe summaries for `ws.userId`, ignores a frame-supplied user id, and forwards paging unchanged.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports UNSUPPORTED when history is disabled or the store cannot list** — Opt-out and a store without list support are explicit failures, never false empty histories.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, cursor and summary wire types without changing existing message shapes.
- [ ] Validate the bounded limit and complete ISO cursor independently of feature configuration.
- [ ] Thread the history opt-in and session store to the non-locking WebSocket message path.
- [ ] Serialize owned summaries and preserve paging arguments while ignoring extra frame fields.
- [ ] Return sanitized `UNSUPPORTED` and `SERVER_ERROR` failures without closing the socket.
- [ ] Document the authenticated metadata disclosure, retention decision, configuration and release change.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live synchronization between tabs.