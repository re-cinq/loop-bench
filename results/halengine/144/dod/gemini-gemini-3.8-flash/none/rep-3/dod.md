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

**Strategy: `direct`** — An authenticated WebSocket connection and transport entry point already exist in `createServer`. Acceptance tests connect over real sockets, exercise the `list_conversations` frame against the server with history enabled or disabled, and observe the resulting protocol frames directly.

## Done when these pass

- [ ] **delivers the authenticated user's conversation list over WebSocket, ignoring any userId in the frame** — With `transport.history.enabled` on, a client sending `list_conversations` (even with an injected foreign `userId`) receives a `conversation_list` frame containing the authenticated user's conversation summaries ordered newest first with ISO timestamps, calls `store.listFor` with `ws.userId`, and can resume any listed session via `?sessionId=<id>`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with an UNSUPPORTED error frame when history is not enabled** — When `transport.history` is disabled or absent, sending a `list_conversations` frame receives an `error` frame with code `UNSUPPORTED` and no conversation list.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations without waiting for an in-flight streaming turn on the session lock** — Sending `list_conversations` while a `user_message` is actively streaming on the session answers with `conversation_list` before that turn's `stream_end` arrives.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, and `ConversationSummary` interfaces and their union members to `src/types/messages.ts`, and export `UNSUPPORTED` in `ErrorCodes` (`src/types/session.ts`) and `StoreCannotList`.
- [ ] Add `list_conversations` message validation in `src/transport/ws/validation.ts`, checking optional integer `limit` (1–200) and optional `{updatedAt, sessionId}` ISO cursor `before`.
- [ ] Add `HalEngineConfig.transport.history?: {enabled: boolean}` config opt-in and thread `history` through `createServer` into message handling.
- [ ] In `src/transport/ws/messageHandler.ts`, answer `list_conversations` on the non-locked path beside `ping`, querying `store.listFor` with `ws.userId`, handling `UNSUPPORTED` when history is off, `listFor` is missing, or `StoreCannotList` is thrown, and `SERVER_ERROR` on failure.
- [ ] Update `docs/getting-started.md` via `example/full-config.ts` (`npm run docs:fix`), verify documentation blocks (`npm run docs:check`), and add `CHANGELOG.md` unreleased entry.

## Out of scope

- Preview or title on summaries (its own issue).
- Deleting a conversation from the client.
- Server-side paging state (client pages with `before`).
- Operator view of another user's conversations.
- Live sync between open tabs.