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

**Strategy: `direct`** — The WebSocket server and message dispatching seams already exist in `createServer` and accept a `SessionStore`; acceptance tests connect real WebSocket clients and request conversation lists over the established protocol entry point.

## Done when these pass

- [ ] **delivers the authenticated user's conversation summaries over websocket, newest first, and allows rejoining a conversation** — When `transport.history` is enabled, answering `list_conversations` (even with a spoofed `userId`) with a `conversation_list` frame carrying the authenticated user's summaries newest first, ISO string timestamps, and allowing reconnect with `?sessionId=<id>` to resume that conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with an UNSUPPORTED error frame when history is not enabled** — When `transport.history` is omitted or disabled, answering `list_conversations` with an `error` frame carrying code `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user message is streaming without waiting on the turn lock** — Answering `list_conversations` outside the per-session turn lock so the client receives its conversation list before the in-flight streaming turn's `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` interfaces and union types in `src/types/messages.ts`.
- [ ] Add `UNSUPPORTED` error code in `src/types/session.ts` and `src/types/messages.ts`.
- [ ] Update `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` frames with optional integer `limit` (1-200) and composite cursor `before` (`{updatedAt, sessionId}`).
- [ ] Thread `history?: {enabled: boolean}` option through `HalServerOptions` in `src/transport/createServer.ts` and `HalEngineConfig.transport.history` in `src/config.ts`.
- [ ] Update `createMessageHandler` in `src/transport/ws/messageHandler.ts` to accept `SessionStore` and history options, answering `list_conversations` outside the per-session lock using `ws.userId` with `conversation_list` or `UNSUPPORTED` error.
- [ ] Handle store errors during `listFor` (returning `SERVER_ERROR` or `UNSUPPORTED` if store cannot list) in `src/transport/ws/messageHandler.ts`.
- [ ] Document the feature in `example/full-config.ts` and regenerate `docs/getting-started.md` via `npm run docs:fix`.

## Out of scope

- Preview or message content inside conversation summaries (its own issue).
- Deleting a conversation from the client over WebSocket.
- Server-side paging state (the client pages with `before`).
- Operator view of another user's conversations.
- Live sync between open tabs.