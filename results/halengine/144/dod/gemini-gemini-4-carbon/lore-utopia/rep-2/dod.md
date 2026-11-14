# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `createMongoSessionStore`, `InMemorySessionStore`, and `validateMessage` already expose the live WebSocket transport and validator seams, so acceptance tests open real upgraded sockets and fail directly on the missing `list_conversations` protocol behaviour.

## Done when these pass

- [ ] **delivers the connecting user's conversations newest first, pages by cursor, and resumes a chosen id** — With `transport.history: {enabled: true}`, `list_conversations` calls `store.listFor` with `ws.userId` and `{limit, before}` (ignoring any `userId` on the frame), returns one `conversation_list` frame with ISO timestamps newest first (including the active session) and no `stream_end`, leaves `ConnectedMessage` unchanged, and allows reconnecting with `?sessionId=<id>` to replay the selected conversation.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message is still streaming on the same session** — `list_conversations` runs off `PerSessionLock` alongside `ping` so its `conversation_list` reply arrives before an in-flight turn's `stream_end`.
      `src/conversationList.acceptance.test.ts`
- [ ] **refuses with UNSUPPORTED when history is off or the store cannot list, and warns when resume is off** — Replies with `error` code `UNSUPPORTED` (never `conversations: []`) when `transport.history` is omitted or `{enabled: false}`, when the `SessionStore` has no `listFor`, or when `listFor` throws `StoreCannotList` (such as a Mongo collection without `find`), and logs a startup warning when `history` is enabled while `resume` is disabled.
      `src/conversationList.acceptance.test.ts`
- [ ] **answers a rejecting listFor with SERVER_ERROR without leaking store or user detail, and keeps the socket open** — Replies with `error` code `SERVER_ERROR` carrying no store detail, keeps the WebSocket open for subsequent frames, and logs the failure at `error` with `sessionId` and no user conversation content.
      `src/conversationList.acceptance.test.ts`
- [ ] **validates list_conversations limits and composite cursors independently of whether history is enabled** — `validateMessage` statically accepts `list_conversations` (stripping extra fields), enforces integer `limit` in `1..200`, and requires `before` when present to carry both a parseable `updatedAt` string and non-empty `sessionId` string, failing with `INVALID_MESSAGE` naming the field otherwise.
      `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (additive only, touching no existing lines), add `ErrorCodes.UNSUPPORTED` in `src/types/session.ts`, and export new public types plus `StoreCannotList` from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer `1..200`, composite `before: {updatedAt, sessionId}`, dropping extra fields; restore `re-lint/prefer-polymorphism` suppression per `ADR-006`).
- [ ] Throw `StoreCannotList` from `MongoSessionStore.listFor` when `collection.find` is absent so permanent store misconfiguration is distinguishable from transient store failure.
- [ ] Thread `history?: SessionHistoryOptions` (with GDPR retention note referencing #41) through `HalEngineConfig.transport` (`src/config.ts`) and `createServer` (`src/transport/createServer.ts`), warning at startup when `history.enabled` is true without `resume.enabled`.
- [ ] Pass `sessionStore` and `history` options into `createMessageHandler` (`src/transport/ws/messageHandler.ts`) and answer `list_conversations` off `PerSessionLock` using `session.userId`, sending `conversation_list` via `sender.ts`, `UNSUPPORTED` when disabled/unsupported/`StoreCannotList`, or `SERVER_ERROR` (redacted, logged with `sessionId` and no user content) when `listFor` rejects.
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts` + `docs/getting-started.md` (via `npm run docs:fix`), `CHANGELOG.md` under `## [Unreleased]`, and bump MINOR version if required by repo checks.

## Out of scope

- Conversation previews or titles on `ConversationSummary` rows.
- Deleting or erasing conversations from the client over the WebSocket protocol.
- Server-side paging state (clients page explicitly with the `before` cursor).
- Operator views of another user's conversations.
- Live conversation sync across multiple open tabs (#124).