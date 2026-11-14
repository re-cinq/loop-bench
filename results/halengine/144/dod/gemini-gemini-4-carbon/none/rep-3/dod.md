# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` already expose the frame validator, WebSocket upgrade/message loop, and `SessionStore` boundary directly, so the acceptance suite calls those public entry points today and fails because `list_conversations` and `transport.history` are not yet implemented.

## Done when these pass

- [ ] **validates list_conversations limits, composite before cursors and unknown fields** — `validateMessage` accepts bare and paged `list_conversations` frames (`limit` 1–200, composite `{updatedAt, sessionId}` `before` cursor) while stripping unknown fields, and rejects invalid `limit` and malformed or partial `before` cursors naming the field.
      `src/conversationList.acceptance.test.ts`

- [ ] **delivers the authenticated user's conversations newest first, pages with limit and before, ignores a forged userId, and resumes a listed session** — with `transport.history` and `transport.resume` enabled, `list_conversations` leaves `ConnectedMessage` unchanged, queries `store.listFor` with `ws.userId` and `{limit, before}`, answers with one `conversation_list` of ISO-timestamped summaries newest first and no `stream_end`, and lets the client reconnect with `?sessionId=<id>` to replay a listed conversation.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations off the per-session lock while a user_message turn is streaming** — `list_conversations` runs outside `PerSessionLock` so a request sent mid-turn is answered with `conversation_list` before that turn's `stream_end`.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, when the store omits listFor, or when a Mongo collection has no find, and warns when history is enabled without resume** — `list_conversations` answers `UNSUPPORTED` when `transport.history` is disabled/absent, when `SessionStore.listFor` is absent, or when `listFor` throws `StoreCannotList` (such as a `MongoSessionStore` collection without `find`), and enabling `transport.history` without `transport.resume` logs a startup warning while enabling both does not.
      `src/conversationList.acceptance.test.ts`

- [ ] **answers a rejecting listFor with SERVER_ERROR carrying no store detail, keeps the socket open, and logs the session id without user content** — a transient `store.listFor` rejection answers one `SERVER_ERROR` frame with no leaked store message, leaves the WebSocket open, and logs `sessionId` without user conversation content.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, `ConversationListMessage`, `ErrorCodes.UNSUPPORTED`, and `StoreCannotList` to the protocol/store types and re-export them from `src/index.ts`, updating `MongoSessionStore.listFor` to throw `StoreCannotList` when `collection.find` is absent.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer 1–200, composite `before: {updatedAt, sessionId}`) and strip extra properties.
- [ ] Add opt-in `transport.history?: {enabled: boolean}` to `HalEngineConfig` and `HalServerOptions` (default off, re-exporting `ConversationHistoryOptions`), logging a startup warning when `history` is enabled without `resume`.
- [ ] Dispatch `list_conversations` outside `PerSessionLock` in the WebSocket connection/message path using `ws.userId` only, serialising `SessionSummary` dates to ISO strings in `conversation_list`, answering `UNSUPPORTED` when history is off, `listFor` is absent, or `StoreCannotList` is thrown, and answering `SERVER_ERROR` with safe logging on other `listFor` rejections.
- [ ] Complete companion docs and changelog updates (`specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts` + `npm run docs:fix` for `docs/getting-started.md`, and `CHANGELOG.md`).

## Out of scope

- Conversation titles (`title?: string`), tracked in #145
- Deleting conversations over the WebSocket protocol (remains on consumer `store.delete` per #41)
- Wiring the demo HTTP `GET /chats` routes to `listFor` (#47)
- Server-side `hasMore` pagination flags (clients page with the composite `before` cursor)
- Operator views of another user's conversations and live cross-tab synchronisation (#124)