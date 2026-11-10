# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, and `createMessageHandler` already exist and accept real WebSocket connections, so acceptance tests can connect over the WebSocket protocol, send `list_conversations` frames, and fail directly on the missing protocol handling.

## Done when these pass

- [ ] **delivering a conversation list over the WebSocket protocol > with history enabled, answers list_conversations with the connected user summaries newest first, pages with limit and before, and resumes a chosen id** — When `transport.history.enabled` is `true`, a `list_conversations` frame returns a `conversation_list` frame for the socket's authenticated user (ignoring any `userId` in the frame), ordered newest first with ISO timestamp strings and no `stream_end`, forwards `limit` and composite `before` cursor to `store.listFor`, and allows reconnecting with `?sessionId=<id>` to resume a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a conversation list over the WebSocket protocol > answers list_conversations off the per-session lock while a user_message is streaming on the same session** — A `list_conversations` request sent while a `user_message` turn is streaming on the same session is answered on the non-locked path before that turn's `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **delivering a conversation list over the WebSocket protocol > refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, INVALID_MESSAGE when malformed, and SERVER_ERROR when the store rejects** — `list_conversations` is refused with `UNSUPPORTED` when `transport.history` is disabled or the store cannot list, `INVALID_MESSAGE` when `limit` or `before` is invalid, and `SERVER_ERROR` without leaking store error details when `listFor` rejects.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts`, `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`, and `StoreCannotList` where appropriate.
- [ ] Validate `list_conversations` frames (`limit` integer 1–200, composite `before` cursor with parseable `updatedAt` and non-empty `sessionId`) in `src/transport/ws/validation.ts`.
- [ ] Thread `transport.history?: {enabled: boolean}` through `HalEngineConfig`, `createServer`, and `createMessageHandler`, warning at startup if `history` is enabled without `resume`.
- [ ] Handle `list_conversations` off the per-session lock in `src/transport/ws/messageHandler.ts` using `ws.userId` (or `session.userId` bound from `ws.userId`), serializing dates as ISO strings and mapping disabled/missing/StoreCannotList to `UNSUPPORTED` and unexpected store errors to `SERVER_ERROR`.
- [ ] Update `example/full-config.ts`, regenerate `docs/getting-started.md` via `npm run docs:fix`, update `CHANGELOG.md` and `specs/`, and bump the package version as required by the ticket.

## Out of scope

- A preview or title on conversation summaries
- Deleting a conversation from the client over the WebSocket
- Server-side paging state
- An operator view of another user's conversations
- Live sync of conversation lists between open tabs