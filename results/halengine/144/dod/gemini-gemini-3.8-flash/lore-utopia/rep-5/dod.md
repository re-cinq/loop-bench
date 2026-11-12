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

**Strategy: `direct`** — The WebSocket server and message handling pipeline exist and handle client frames over real sockets. Acceptance tests connect real WebSocket clients to the engine to exercise `list_conversations` and observe wire responses directly without mocks or doubles.

## Done when these pass

- [ ] **answers the connecting user's conversations newest first with ISO strings even when the frame names another user** — with history enabled, a `list_conversations` frame is answered with a `conversation_list` frame containing the authenticated user's conversations newest activity first, with ISO timestamps and ignoring any foreign `userId` in the frame
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses the frame with UNSUPPORTED when conversation history is not turned on** — with history disabled or omitted, sending `list_conversations` is answered with an `error` frame carrying code `UNSUPPORTED`
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a list in the middle of a streaming turn, before that turn ends** — a `list_conversations` frame sent while a `user_message` turn is actively streaming is answered off the per-session lock before `stream_end`
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts` with `ConversationCursor` and `ConversationSummary`
- [ ] Add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts` and `src/types/messages.ts`
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts` validating integer `limit` (1-200) and composite cursor `before` (`{updatedAt, sessionId}`)
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts` and `HalServerOptions` in `src/transport/createServer.ts`
- [ ] Implement `list_conversations` handling in `src/transport/ws/conversationList.ts` and wire into `src/transport/ws/messageHandler.ts` off the `PerSessionLock` using `ws.userId`
- [ ] Answer with `UNSUPPORTED` when history is disabled, store lacks `listFor`, or store throws `StoreCannotList`
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` with sections 4.3, 5.9, and error code `UNSUPPORTED`
- [ ] Update `specs/hal-engine-conversation-list/spec.md` with § Asking for the list over the socket
- [ ] Add § Conversation list to `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`
- [ ] Update `CHANGELOG.md` under `## [Unreleased]`

## Out of scope

- Preview or title on conversation summaries (separate issue)
- Deleting a conversation from the client (erasure primitive needing separate authorization)
- Server-side paging state (client pages via composite cursor `before`)
- Operator view of another user's conversations
- Live cross-tab sync between open sockets