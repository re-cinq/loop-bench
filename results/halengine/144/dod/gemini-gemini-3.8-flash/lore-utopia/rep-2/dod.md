# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.
>
> A consumer may have no such route to extend: an engine deployment behind an api with a session
> store and no conversation endpoints of its own has nothing to add this to. The engine already knows who is connected and already
> replays a conversation on resume; answering "which conversations do I have" over the same socket
> is the smaller surface.

**Strategy: `direct`** — The WebSocket transport (`createServer` and its underlying message handlers) provides the direct entry point for client frames. The acceptance tests connect real WebSocket clients to an active server, asserting that `list_conversations` delivers the user's summaries on the wire, runs off the turn lock, and enforces the opt-in gate.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list newest first over the socket when history is enabled** — With history enabled, sending `list_conversations` (even with another user's id attached) receives exactly one `conversation_list` frame with the connecting user's summaries sorted newest first, ISO timestamp strings, no `stream_end`, and enables rejoining via reconnecting with `?sessionId=`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a turn is streaming without waiting on the turn lock** — A `list_conversations` frame sent while a `user_message` turn is actively streaming arrives before the turn finishes with `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with code UNSUPPORTED when history is not enabled** — When `transport.history` is absent or disabled, `list_conversations` is refused with an `error` frame carrying code `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` interfaces and union members to `src/types/messages.ts`
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts` and export `StoreCannotList` in `src/types/sessionStore.ts`
- [ ] Implement `list_conversations` message validation in `src/transport/ws/validation.ts`
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` and `HalServerOptions`
- [ ] Implement conversation list answering in `src/transport/ws/messageHandler.ts` and `src/transport/ws/conversationList.ts` off the turn lock
- [ ] Handle stores without `listFor` or throwing `StoreCannotList` by answering `UNSUPPORTED`
- [ ] Extend protocol specs and getting started documentation with the new frames and configuration

## Out of scope

- Message content preview or titles in conversation summaries (separate issue)
- Deleting conversations from the client
- Server-side paging state (client pages using composite cursor `{updatedAt, sessionId}`)
- Operator view of another user's conversations
- Live cross-tab sync over WebSocket