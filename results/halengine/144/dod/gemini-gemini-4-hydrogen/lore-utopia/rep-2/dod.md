# Definition of Done

> `#143` gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, and `validateMessage` already exist and open real WebSocket connections against `SessionStore.listFor`. The acceptance suite calls those real entry points over live WebSockets and fails today on `Unknown message type: list_conversations`.

## Done when these pass

- [ ] **delivers the connecting user's conversations newest first with ISO dates, ignores a forged userId, pages with before, and lets the client resume a listed id** — `list_conversations` delivers `conversation_list` scoped to `ws.userId` with ISO timestamps, includes the current session, pages via `limit`/`before`, sends no `stream_end`, and listed ids resume via `?sessionId=`
      `src/conversationList.acceptance.test.ts`

- [ ] **rejects malformed list_conversations frames in validation and on the wire without stream_end** — `validateMessage` accepts `{type: 'list_conversations'}`, rejects bad `limit` and `before` cursors naming the field, and sends `INVALID_MESSAGE` on the wire with no `stream_end`
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message turn is mid-stream, without waiting for stream_end** — `list_conversations` runs off `PerSessionLock` and answers before an in-flight turn finishes
      `src/conversationList.acceptance.test.ts`

- [ ] **refuses list_conversations with UNSUPPORTED when history is off or the store cannot list, and warns when history is enabled without resume** — `history` defaults off leaving `connected` unchanged, `createServer` warns if `history` is enabled without `resume`, and missing `listFor` or `StoreCannotList` returns `UNSUPPORTED`
      `src/conversationList.acceptance.test.ts`

- [ ] **answers SERVER_ERROR without leaking store details when listFor fails, logs with sessionId, and keeps the socket open** — store rejections yield a generic `SERVER_ERROR`, log `sessionId`, and leave the socket usable for subsequent frames
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `UNSUPPORTED` to `ErrorCodes`, add `ListConversationsMessage` / `ConversationListMessage` / `ConversationSummaryWire` to `src/types/messages.ts`, and export `StoreCannotList` from `src/infrastructure/stores/mongo/mongoSessionStore.ts` and `src/index.ts`
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` for `list_conversations` (`limit` integer 1–200, `before` `{updatedAt, sessionId}` cursor)
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig['transport']`, `HalServerOptions`, and `createServer`, logging a startup warning when `history?.enabled` is set without `resume?.enabled`
- [ ] Dispatch `list_conversations` in `src/transport/ws/messageHandler.ts` off `PerSessionLock`, scoping strictly to `ws.userId` and mapping disabled/`!store.listFor`/`StoreCannotList` to `UNSUPPORTED` and other errors to `SERVER_ERROR`
- [ ] Update `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`, and extend `specs/hal-engine-conversation-list/spec.md`

## Out of scope

- Conversation titles, pinning, archiving, or delete/rename frames
- Searching conversation contents or filtering server-side
- Operator access to another user's conversations or live cross-tab sync