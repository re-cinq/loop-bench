# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, `InMemorySessionStore.listFor`, and `MongoSessionStore.listFor` already exist on this branch, so the acceptance tests drive the real WebSocket entry points and validator directly and fail today because `list_conversations` is unrecognized.

## Done when these pass

- [ ] **accepts list_conversations with valid options, drops extra fields, and refuses malformed limit or before** — validates `{type: 'list_conversations'}`, `{limit, before: {updatedAt, sessionId}}`, drops unknown fields like `userId`, and rejects out-of-range/non-integer `limit` or incomplete/unparseable `before`
      `src/conversationList.acceptance.test.ts`
- [ ] **delivers the authenticated user conversations newest first with ISO times, forwards paging options, and resumes a picked id** — enforces `ws.userId` ownership even when `userId` is spoofed on the frame, forwards `{limit, before}` to `listFor`, returns ISO 8601 `ConversationSummary` rows with no `stream_end` and unchanged `ConnectedMessage`, and resumes a listed `sessionId` via `?sessionId=`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off, when the store omits listFor, or when MongoSessionStore lacks find** — returns an `error` frame with `code: 'UNSUPPORTED'` and never fabricates an empty list when `transport.history` is disabled, `listFor` is absent, or `MongoSessionStore` throws `StoreCannotList`
      `src/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR without store details on listFor rejection, keeps the socket open, and logs sessionId** — returns `SERVER_ERROR` with no internal error details, leaves the connection open for subsequent frames, and logs `sessionId` without user content
      `src/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations before stream_end while a user_message is streaming on the same session** — handles `list_conversations` off `PerSessionLock` alongside `ping`
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` additively to `src/types/messages.ts`, and `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`
- [ ] Export `StoreCannotList` from `src/types/sessionStore.ts` (and `src/index.ts`) and throw it from `MongoSessionStore.listFor` when `collection.find` is absent
- [ ] Add `list_conversations` validation (`limit` integer 1–200, composite `before: {updatedAt, sessionId}`) in `src/transport/ws/validation.ts`
- [ ] Add `ConversationHistoryOptions` (`{enabled: boolean}`) with retention note referencing #41, wire `transport.history` through `src/config.ts` and `src/transport/createServer.ts`, and log a startup warning when `history.enabled` is set without `resume.enabled`
- [ ] Handle `list_conversations` off `PerSessionLock` in `src/transport/ws/messageHandler.ts` using `session.userId`, forwarding `{limit, before}`, serialising ISO timestamps, and mapping `StoreCannotList`/absent `listFor`/off-flag to `UNSUPPORTED` and other errors to `SERVER_ERROR`
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts` + `npm run docs:fix` (`docs/getting-started.md`), `CHANGELOG.md`, and `package.json` minor version if due, then verify `npm run verify` passes

## Out of scope

- Preview or title fields on conversation summaries
- Deleting conversations over WebSocket or server-side paging state
- Operator views of another user's conversations or live sync across open tabs