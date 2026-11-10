# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — Both the WebSocket frame validator (`validateMessage`) and the server transport (`createServer`) exist today, so the acceptance tests call the real entry points and fail directly on the absent `list_conversations` validation and handling behaviour.

## Done when these pass

- [ ] **validates list_conversations and rejects out-of-range limits or malformed cursors by field name** — `validateMessage` accepts `{type: 'list_conversations'}`, strips extra fields such as `userId`, validates `limit` as an integer 1–200, and validates `before` as a `{updatedAt, sessionId}` cursor with a parseable date string and non-empty `sessionId`, rejecting invalid values with an error message naming the field.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations with the authenticated user's summaries newest first, forwards limit and before, and resumes a picked session** — With `history: {enabled: true}`, `list_conversations` is answered with one `conversation_list` frame carrying the connecting user's summaries newest first with ISO timestamp strings and no `stream_end`, calls `store.listFor` with `ws.userId` (ignoring any `userId` in the frame) and `{limit, before}`, and reconnecting with `?sessionId=<id>` resumes that conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store lacks listFor, SERVER_ERROR when listFor rejects, and answers while a turn streams** — Answers `list_conversations` with an `UNSUPPORTED` error frame and no `conversation_list` when `history` is disabled or the store lacks `listFor` (or throws `StoreCannotList`), answers `SERVER_ERROR` with no leaked store detail when `listFor` rejects, and answers `list_conversations` off the per-session lock before an in-flight turn's `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (additive only, preserving all existing lines) and add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`, re-exporting new public types from `src/index.ts`.
- [ ] Add `list_conversations` validation in `src/transport/ws/validation.ts` (`limit` integer 1–200, `before` `{updatedAt, sessionId}` with parseable `updatedAt` and non-empty `sessionId`, stripping extra fields).
- [ ] Export `StoreCannotList` for collections/stores that cannot list (and throw it from `MongoSessionStore.listFor` when the collection has no `find`), and add `ConversationHistoryOptions` (`{enabled: boolean}` with retention note pointing at #41) threaded through `HalEngineConfig.transport.history` and `createServer` options (warning at startup when `history.enabled` is true without `resume.enabled`).
- [ ] Handle `list_conversations` on the non-locked path in `src/transport/ws/messageHandler.ts` using `ws.userId` and `{limit: message.limit, before: message.before}`, sending `conversation_list` with ISO timestamps when `history.enabled` is true, `UNSUPPORTED` when disabled or when `store.listFor` is absent or throws `StoreCannotList`, and `SERVER_ERROR` (logging session id with no store detail in the client frame) when `listFor` rejects.
- [ ] Update `example/full-config.ts`, regenerate `docs/getting-started.md` via `npm run docs:fix`, update `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md` with citations, add a `CHANGELOG.md` entry under `## [Unreleased]`, and ensure `npm run verify` passes.

## Out of scope

- Previews or titles on conversation summaries (tracked in its own issue).
- Deleting a conversation from the client over the WebSocket.
- Server-side paging state (clients page using the `before` cursor).
- Operator views of another user's conversations.
- Live synchronisation of conversation lists across multiple open tabs.