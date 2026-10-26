# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket upgrade path already exists through `createServer`, `createConnectionHandler`, and `createMessageHandler`. The acceptance tests use that path with an in-memory session store and real WebSocket clients.

## Done when these pass

- [ ] **validates the list frame and its limit and composite cursor** — `list_conversations` is accepted with valid paging fields and rejected with field validation errors for invalid limits and cursors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user with summaries and forwards list options off the turn lock** — an enabled history request returns ISO-dated summaries for the connecting user, forwards the authenticated user id and paging options to `listFor`, and emits no `stream_end`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers disabled history and stores without listFor with UNSUPPORTED and never an empty list** — history refusal is an error frame and never masquerades as an empty conversation list.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list message and summary wire types and validation.
- [ ] Thread the opt-in history setting and session store through the WebSocket handler.
- [ ] Answer enabled requests from the authenticated connection user and serialize summaries for the wire.
- [ ] Return `UNSUPPORTED` when history is disabled or the store cannot list, without sending an empty list.
- [ ] Add the protocol/specification, documentation, changelog, version, and generated-doc updates required by the ticket.
- [ ] Preserve the existing resume path for reopening a listed conversation.

## Out of scope

- Conversation previews, deletion, operator views, server-held paging state, and live cross-tab synchronization.
- REST history endpoints or any new in-band conversation-switch frame.