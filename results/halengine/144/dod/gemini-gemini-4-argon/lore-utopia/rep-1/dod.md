# Definition of Done

> #143 gives a consumer `store.listFor(userId)`, and the client still has no way to see that list without the consumer standing up a REST route beside the WebSocket. The session is already chosen and replayed on the socket (#45); asking which conversations exist to pass back as `?sessionId=` belongs on the same wire.

**Strategy: `direct`** — `validateMessage` (`src/transport/ws/validation.ts`), `createServer` (`src/transport/createServer.ts`), `setupWebSocketHandler` (`src/transport/ws/connectionHandler.ts`), and `createMessageHandler` (`src/transport/ws/messageHandler.ts`) already expose the exact WebSocket validation and server seams where `list_conversations`, `conversation_list`, `transport.history`, and `ErrorCodes.UNSUPPORTED` plug in.

## Done when these pass

- [ ] **delivering a conversation list over the WebSocket protocol validates list_conversations and rejects an out-of-range limit or a malformed cursor, naming the field** — accepts `{type: 'list_conversations'}` with optional integer `limit` (`1`–`200`) and `before: {updatedAt, sessionId}` cursor, strips unknown fields such as `userId`, and rejects invalid `limit` or `before` values with `INVALID_MESSAGE` naming the field and no `stream_end`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivering a conversation list over the WebSocket protocol answers the connecting user's conversations newest first with ISO times, ignores a frame userId, and pages with limit and before** — with `history: {enabled: true}`, answers `list_conversations` with one `conversation_list` frame carrying four-field summaries (`sessionId`, `createdAt`, `updatedAt`, `entryCount`) with ISO 8601 strings and no `stream_end`, calls `store.listFor` with `ws.userId` rather than any `userId` on the frame, and forwards `limit` and `before`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivering a conversation list over the WebSocket protocol refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, and reports a store failure as SERVER_ERROR** — answers `list_conversations` with `ErrorCodes.UNSUPPORTED` when `history` is disabled, when the store implements no `listFor`, or when the store throws `StoreCannotList`, and answers a store rejection with `SERVER_ERROR` carrying no internal store detail while keeping the socket open and logging with `sessionId`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivering a conversation list over the WebSocket protocol answers list_conversations while a user_message is streaming, before that turn sends stream_end** — handles `list_conversations` as a read outside the per-session `user_message` lock so a list request sent mid-stream is answered before the running turn's `stream_end`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivering a conversation list over the WebSocket protocol hands a client a sessionId it can reconnect with to rejoin and replay the conversation** — a `sessionId` returned in `conversation_list` and passed back as `?sessionId=<id>` on reconnect with `resume: {enabled: true}` rejoins that conversation (`resumed: true`) and replays its stored entries
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ErrorCodes.UNSUPPORTED` to `src/types/session.ts` and additive `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage` types (and union members) to `src/types/messages.ts`, re-exporting them from `src/index.ts`.
- [ ] Export `StoreCannotList` from the session store layer and `src/index.ts`, and throw it from `MongoSessionStore.listFor` when the injected collection has no `find`.
- [ ] Validate `list_conversations` in `src/transport/ws/validation.ts` (`limit` integer `1`–`200`, `before` cursor `{updatedAt, sessionId}` with a parseable date string and string id, stripping extra properties).
- [ ] Thread `history?: ConversationHistoryOptions` (`{enabled: boolean}`) through `HalEngineConfig.transport`, `HalServerOptions`, `setupWebSocketHandler`, and `createMessageHandler`, warning at startup when `history.enabled` is true without `resume.enabled`.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside the `user_message` turn lock, calling `store.listFor(ws.userId, ...)` and sending `conversation_list` with four-field ISO summaries, or `UNSUPPORTED` / `SERVER_ERROR` with no `stream_end`.
- [ ] Update `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), `.specify/spec.md`, and `CHANGELOG.md`.

## Out of scope

- A conversation title or preview snippet derived from entries (#145).
- Deleting or renaming a conversation over the WebSocket.
- Holding pagination state server-side (the client pages with `before`).
- An operator view of another user's conversations.
- Live sync between open tabs (#124).