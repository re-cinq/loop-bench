# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — A WebSocket transport and session store seam already exists via `createServer`. An acceptance test can connect over WebSocket, send `list_conversations`, and observe the server's protocol response directly.

## Done when these pass

- [ ] **delivers the authenticated user conversation list over WebSocket and allows reconnecting to a listed session** — Sending `list_conversations` with `history: {enabled: true}` queries the store for the connection's authenticated user (ignoring any spoofed `userId` in the frame) and returns a `conversation_list` frame carrying summaries with ISO string timestamps, newest first, supporting `limit` and `before` paging; reconnecting with `?sessionId=<id>` resumes that session.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations immediately without waiting for an active streaming turn to finish** — Handling for `list_conversations` runs outside the per-session lock alongside `ping`, returning the `conversation_list` response while a streaming `user_message` turn is still open before its `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with UNSUPPORTED when history is disabled or the store cannot list** — Sending `list_conversations` when `history` is not enabled, or when the configured store does not implement `listFor`, is answered with an `error` frame carrying code `UNSUPPORTED` rather than an empty list or server failure.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` (plus `ConversationCursor` and `ConversationSummary`) to `src/types/messages.ts`, and `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` validation in `src/transport/ws/validation.ts` validating optional integer `limit` (1-200) and composite `before` cursor (`{updatedAt, sessionId}`)
- [ ] Add `history?: {enabled: boolean}` to `HalServerOptions` and `HalEngineConfig.transport.history`, and wire through `createServer` and `connectionHandler`
- [ ] Extend `createMessageHandler` to accept `sessionStore` and history options, answering `list_conversations` out-of-band beside `ping` with `ws.userId`
- [ ] Answer `UNSUPPORTED` when history is disabled or when store lacks `listFor` / throws `StoreCannotList`
- [ ] Update documentation (`docs/getting-started.md`, `example/full-config.ts`, `CHANGELOG.md`) and specifications (`specs/hal-engine-websocket-protocol/spec.md`)

## Out of scope

- Preview text or conversation title on summaries (separate issue)
- Deleting a conversation from the client (separate erasure authorization decision)
- Server-side paging state (client pages with `before` cursor)
- Operator view of another user's conversations
- Live synchronization of conversation lists across open tabs