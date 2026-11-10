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

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message loop at `{basePath}/ws` already exist; the acceptance tests connect a real `WebSocket` client against `createServer` with `InMemorySessionStore` and `SessionStore` implementations and fail directly because `list_conversations` is rejected as an unknown message type rather than answered with `conversation_list` or `UNSUPPORTED`.

## Done when these pass

- [ ] **delivering a user conversation list over the WebSocket protocol answers list_conversations with a conversation_list of the connecting user summaries newest first, paging with limit and before, ignoring a wire userId, and resuming a listed id on reconnect** — With `history: {enabled: true}`, sending `{type: 'list_conversations', limit?, before?}` answers `{type: 'conversation_list', conversations: ConversationSummary[]}` for the socket's authenticated user (newest first, ISO-8601 `createdAt` and `updatedAt`, no `stream_end`), calls `store.listFor(ws.userId, {limit, before})` ignoring any wire `userId`, leaves `ConnectedMessage` unchanged, and lets a client reconnect with `?sessionId=<id>` from the list to resume that conversation.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a user conversation list over the WebSocket protocol refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, with SERVER_ERROR and no store detail when listFor rejects, and with INVALID_MESSAGE on malformed fields** — With `history` absent or disabled, or when the store omits `listFor` (or throws `StoreCannotList`), `list_conversations` answers `{type: 'error', code: 'UNSUPPORTED'}` and never an empty list; when `listFor` rejects, it answers `SERVER_ERROR` without leaking store error details; and when `limit` (outside integer 1–200) or `before` (`{updatedAt, sessionId}` where `updatedAt` is not parseable by `Date.parse` or either half is missing) is invalid, it answers `INVALID_MESSAGE`.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a user conversation list over the WebSocket protocol answers list_conversations off the per-session lock before an in-flight user_message sends stream_end** — A `list_conversations` frame sent while a `user_message` is streaming on the same session is answered on the non-locked path beside `ping`, arriving before that turn's `stream_end`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts` and add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (and re-export from `src/index.ts`), joining `IncomingMessage` and `OutgoingMessage` without touching existing lines or changing `ConnectedMessage`.
- [ ] Export `StoreCannotList` from `src/types/sessionStore.ts` (and `src/index.ts`) and throw it from `MongoSessionStore.listFor` when the injected collection implements no `find`.
- [ ] Validate `list_conversations` in `src/transport/ws/validation.ts`: accept optional integer `limit` in `1..200` and optional `before: {updatedAt, sessionId}` where `updatedAt` is a string accepted by `Date.parse` and `sessionId` is a non-empty string, stripping unknown fields like `userId` and failing with a message naming the offending field.
- [ ] Add `HistoryOptions` (`{enabled: boolean}`, with the GDPR retention comment mirroring `SessionResumeOptions` and pointing at #41) on `HalEngineConfig.transport.history` and `HalServerOptions.history`, warning at startup when `history.enabled` is true without `resume.enabled`, and thread `sessionStore` and `history` into `createMessageHandler` to answer `list_conversations` off the per-session lock (`conversation_list` on success, `UNSUPPORTED` when disabled, `listFor` is absent, or `StoreCannotList` is thrown, and `SERVER_ERROR` with no store detail and a log entry carrying `sessionId` when `listFor` fails).
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts` + `docs/getting-started.md` (via `npm run docs:fix`), and `CHANGELOG.md`.

## Out of scope

- Conversation previews or titles on `ConversationSummary`.
- Deleting a conversation from the client over the WebSocket.
- Holding paging cursor state server-side.
- An operator view of another user's conversations.
- Live sync between open tabs.