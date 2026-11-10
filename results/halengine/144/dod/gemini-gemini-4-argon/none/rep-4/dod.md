# Definition of Done

> #143 gives a consumer `store.listFor(userId, options)` inside the server process. A browser client still has no way to ask for that list: the WebSocket protocol has `user_message` and `ping` in, `connected` and the streaming frames out, and nothing else. This adds the wire half so a connected client can fetch its own conversations and pass a chosen `sessionId` on the next upgrade (#45).

**Strategy: `direct`** — The WebSocket transport entry point (`createServer` / `createMessageHandler` / `validateMessage`) and `SessionStore.listFor` already exist and can be driven over a real WebSocket connection today.

## Done when these pass

- [ ] **pages the connecting user conversations newest first with ISO dates and forwards limit and before** — With `history: {enabled: true}`, sending `{type: 'list_conversations', limit, before}` over an authenticated WebSocket connection calls `store.listFor(session.userId, {limit, before})` (ignoring any `userId` in the frame) and replies with `{type: 'conversation_list', conversations}` carrying only `{sessionId, createdAt, updatedAt, entryCount}` with ISO string dates.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations at once without waiting for an in-flight user_message stream** — `list_conversations` is dispatched outside `PerSessionLock` so it resolves immediately even while a `user_message` turn is actively streaming on the same session.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts valid limit and before bounds and rejects malformed ones with INVALID_MESSAGE without calling listFor** — `validateMessage` accepts `limit` in `1..200` and `before: {updatedAt, sessionId}` with a parseable ISO date and non-empty `sessionId`, and rejects out-of-range or malformed values with `{type: 'error', code: 'INVALID_MESSAGE'}` before touching the store.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with error UNSUPPORTED when history is absent or the store implements no listFor, and SERVER_ERROR when listFor rejects** — When `history` is not enabled or `store.listFor` is absent, the server answers `{type: 'error', code: 'UNSUPPORTED'}` rather than `{conversations: []}`; when `store.listFor` throws or rejects, `wsErrorHandler` answers `{type: 'error', code: 'SERVER_ERROR'}` and logs without `userId`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `UNSUPPORTED: 'UNSUPPORTED'` to `ErrorCodes` in `src/types/session.ts` and add `ListConversationsMessage`, `ConversationListMessage`, and `ConversationSummary` to `src/types/messages.ts` (re-exported from `src/index.ts`).
- [ ] Validate `list_conversations` in `src/transport/ws/validation.ts` (`limit` integer in `1..200`, `before` object with non-empty `sessionId` and parseable `updatedAt` via `!Number.isNaN(Date.parse(before.updatedAt))`).
- [ ] Thread `SessionHistoryOptions` (`{enabled: boolean}`) through `HalEngineConfig.transport.history`, `HalServerOptions.history`, `ConnectionHandlerDeps`, and `createMessageHandler(orchestrator, sessionStore?, history?)`, and export `SessionHistoryOptions` from `src/index.ts`.
- [ ] Handle `list_conversations` outside `PerSessionLock` in `src/transport/ws/messageHandler.ts`: throw `StoreCannotList` (answered as `ErrorCodes.UNSUPPORTED` by `wsErrorHandler`) when `!history?.enabled || !sessionStore?.listFor`, otherwise await `sessionStore.listFor(session.userId, {limit, before})` and send `conversation_list` via `sendConversationList` in `src/transport/ws/sender.ts`.
- [ ] Document `list_conversations`, `conversation_list`, and `UNSUPPORTED` in `specs/hal-engine-websocket-protocol/spec.md`, `docs/session-stores.md`, `example/full-config.ts`, and `CHANGELOG.md`.

## Out of scope

- Conversation title or preview snippet on `ConversationSummary` (belongs to #145)
- Deleting or renaming a conversation over the socket
- Total conversation count or `hasMore` flag on `conversation_list`
- Holding a cursor server-side
- Operator view of another user's conversations
- Live sync of conversation lists between open tabs