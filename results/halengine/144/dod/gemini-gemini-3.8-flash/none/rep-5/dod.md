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

**Strategy: `direct`** — `createServer` and the WebSocket transport provide an existing seam where authenticated clients exchange JSON frames. Acceptance tests observe the protocol directly over real WebSocket connections against real session stores, failing because `list_conversations` is not yet recognized, handled, or answered with `conversation_list`.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list over websocket, with iso timestamps and paging, isolated from other users** — An authenticated client sending `list_conversations` receives a single `conversation_list` frame carrying its own conversation summaries newest-first with ISO date strings and no `stream_end`, ignoring any spoofed `userId` in the frame and supporting cursor-based paging and subsequent session resume.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with an UNSUPPORTED error frame when history is not enabled or the store cannot list** — When `transport.history` is omitted or disabled, or when the store implements no `listFor` method, a `list_conversations` frame is answered with an `error` frame carrying code `UNSUPPORTED` and no `conversation_list`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations off the per-session lock without waiting for a streaming user_message turn to finish** — A `list_conversations` frame sent while a `user_message` stream is in progress on the session is answered immediately without waiting on the turn lock or blocking behind `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` to `src/types/messages.ts`, and `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Add `list_conversations` validation in `src/transport/ws/validation.ts` validating integer `limit` (1–200) and composite `before` cursor `{updatedAt, sessionId}`.
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport`, `HalServerOptions`, and thread through `createServer` into `createMessageHandler`.
- [ ] Implement `list_conversations` dispatch in `src/transport/ws/messageHandler.ts` off the `PerSessionLock`, calling `store.listFor(ws.userId, ...)` and sending `conversation_list` with ISO strings.
- [ ] Handle `history` disabled, absent `listFor`, and `StoreCannotList` by answering with `error` code `UNSUPPORTED`.
- [ ] Update documentation (`example/full-config.ts` and `docs/getting-started.md`) and specifications (`specs/hal-engine-websocket-protocol/spec.md`).

## Out of scope

- Preview or title on summaries.
- Deleting or erasing conversations from the client.
- Server-side paging state (paging is purely client-driven via cursor).
- Operator view of another user's conversations.
- Live synchronization of conversation lists across open tabs.