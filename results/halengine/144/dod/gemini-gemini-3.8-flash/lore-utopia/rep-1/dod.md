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

**Strategy: `direct`** — The WebSocket server and message handling pipeline provide a direct entry point where client frames are sent over a WebSocket connection. Acceptance tests directly connect to `createServer`, transmit `list_conversations` frames, and observe the protocol responses over the socket.

## Done when these pass

- [ ] **answers the user's conversations newest first, with both times as ISO strings** — With history enabled, sending `list_conversations` over WebSocket delivers the connecting user's conversation summaries newest activity first, with createdAt and updatedAt formatted as ISO strings and no stream_end frame.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses the frame when conversation history is not turned on** — With history absent or disabled, sending `list_conversations` is answered with an error frame carrying code UNSUPPORTED.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a list in the middle of a streaming turn, before that turn ends** — Sending `list_conversations` while a user_message turn is streaming on the same session is answered off the per-session lock without waiting for the turn's stream_end.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add protocol frame types `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` to `src/types/messages.ts`, and `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` message validation in `src/transport/ws/validation.ts` validating `limit` (integer 1-200) and `before` cursor (`{updatedAt, sessionId}`)
- [ ] Extend `createServer` and `createMessageHandler` with optional `history` configuration and session store dependency
- [ ] Implement `list_conversations` handler answering with `conversation_list` for authenticated user off the turn lock
- [ ] Handle disabled history and stores lacking `listFor` (or throwing `StoreCannotList`) by answering `error` with code `UNSUPPORTED`
- [ ] Handle store rejections by answering `error` with code `SERVER_ERROR` without leaking store details
- [ ] Extend specs and docs (`specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts`, `docs/getting-started.md`) and update CHANGELOG.md

## Out of scope

- Previews or titles on summaries
- Deleting conversations from the client
- Server-side paging state (client pages with `before` cursor)
- Operator view of another user's conversations
- Live synchronization between open tabs