# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — A seam exists directly on the WebSocket transport (`createServer` / `startEngineWith`) where real WebSocket clients connect and send protocol frames. Acceptance tests can exercise `list_conversations` frame handling, opt-in refusal, and off-the-lock delivery against the live transport today and fail on absent behavior.

## Done when these pass

- [ ] **answers the connecting user's conversations newest first, with both times as ISO strings, and hands a client an id it can rejoin the conversation with** — With `history: {enabled: true}`, sending `list_conversations` (even with a spoofed `userId`) answers with exactly one `conversation_list` frame carrying the authenticated user's conversations in newest-first order with ISO 8601 strings, and yields a `sessionId` that can be rejoined over session resume.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses the list_conversations frame with UNSUPPORTED when history is not enabled** — With `history` absent or disabled, sending `list_conversations` is refused with an `error` frame of code `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a list in the middle of a streaming turn, before that turn ends** — A `list_conversations` frame sent while a `user_message` turn is streaming is answered off the per-session lock before that turn's `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` (plus `ConversationCursor` and `ConversationSummary`) to `src/types/messages.ts` and `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` frame validation in `src/transport/ws/validation.ts` accepting whole-number `limit` (1-200) and composite `{updatedAt, sessionId}` cursor
- [ ] Add `transport.history?: {enabled: boolean}` to `HalEngineConfig` and `createServer` options
- [ ] Implement `list_conversations` handler in `createMessageHandler` off the turn lock, taking `userId` from connection and calling `sessionStore.listFor`
- [ ] Answer `UNSUPPORTED` when history is off, when store has no `listFor`, or when store throws `StoreCannotList`
- [ ] Extend specs in `specs/hal-engine-websocket-protocol/spec.md` and document `history` in `example/full-config.ts` and `docs/getting-started.md`

## Out of scope

- Previews or titles on conversation summaries (separate issue)
- Deleting conversations from the client
- Server-side paging state (client pages with `before` cursor)
- Operator view of another user's conversations
- Live cross-tab sync