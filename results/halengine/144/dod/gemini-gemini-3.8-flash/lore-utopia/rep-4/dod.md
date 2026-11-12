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

**Strategy: `direct`** — The WebSocket transport already authenticates upgrades, associates `ws.userId` with connections, and handles WebSocket messages via `createServer`. Acceptance tests directly exercise real WebSocket connections against `createServer` with `history: {enabled: true}` and verify protocol frames over the wire.

## Done when these pass

- [ ] **answers the user's conversations newest first, with both times as ISO strings, ignoring any userId in the frame** — With `history: {enabled: true}` and a store holding three conversations for user `u1`, sending a `list_conversations` frame (even carrying `userId: 'attacker'`) is answered with exactly one `conversation_list` frame containing three summaries newest first, with ISO 8601 strings for `createdAt` and `updatedAt`, no `stream_end`, and `store.listFor` is called with the authenticated `ws.userId`.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses the frame when conversation history is not turned on** — With `history` absent or disabled (default off), sending a `list_conversations` frame is answered with an `error` frame whose code is `UNSUPPORTED` and no `conversation_list` frame.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a list in the middle of a streaming turn, before that turn ends** — A `list_conversations` frame sent while a `user_message` is streaming on the same session is answered off the per-session lock, arriving before that turn's `stream_end`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Declare `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, and `ConversationCursor` in `src/types/messages.ts` and add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Add `history?: {enabled: boolean}` to `HalServerOptions` and `HalEngineConfig['transport']`, threaded through `createServer`.
- [ ] Implement validator support for `list_conversations` in `src/transport/ws/validation.ts`.
- [ ] Implement `list_conversations` handling in `src/transport/ws/messageHandler.ts` calling `sessionStore.listFor(ws.userId, ...)` off the per-session lock and sending `conversation_list` or `error` (`UNSUPPORTED` / `SERVER_ERROR`).
- [ ] Update documentation (`example/full-config.ts`, `docs/getting-started.md` via `npm run docs:fix`), spec links, and `CHANGELOG.md`.

## Out of scope

- Operator view of another user's conversations (authorisation question of its own).
- Live sync between open tabs (ruled out by #124).
- Paging cursors based solely on `updatedAt` timestamps (composite `{updatedAt, sessionId}` required by #143).
- Resuming or replaying conversation history content (handled by existing session resume #45).