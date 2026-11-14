# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` and `validateMessage` already expose the real WebSocket upgrade, message dispatch, and frame validation boundaries, and `SessionStore.listFor` is already shipped on `InMemorySessionStore` and `MongoSessionStore`. Each acceptance test exercises those real entry points over live WebSocket connections and fails today because `list_conversations` is rejected as an unknown message type and the history protocol surface is absent.

## Done when these pass

- [ ] **lists only the authenticated user conversations, pages by cursor, and resumes a chosen id** — with `transport.history.enabled` and `resume.enabled`, starts without warning, answers `list_conversations` from `ws.userId` alone (ignoring any `userId` on the frame) with one `conversation_list` carrying ISO-string summaries newest first (current session included) and no `stream_end`, forwards `{limit, before}` for composite cursor paging, leaves `ConnectedMessage` unchanged, and resumes a conversation picked from the list via `?sessionId=<id>`
  `src/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message is still running, before stream_end** — handles `list_conversations` off `PerSessionLock` (beside `ping`), delivering `conversation_list` before an in-flight `user_message` finishes with `stream_end`
  `src/conversationList.acceptance.test.ts`

- [ ] **validates list_conversations limits and cursors, refusing out-of-range or partial values** — accepts `list_conversations` with optional integer `limit` (`1..200`) and optional composite `before` (`{updatedAt, sessionId}` of ISO string and non-empty string), strips undeclared fields, and refuses invalid `limit` or `before` values with an error naming the offending field
  `src/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when listing is off or unavailable, and SERVER_ERROR without store detail** — exports `ErrorCodes.UNSUPPORTED` and `StoreCannotList`, logs a startup warning when `transport.history` is enabled without `transport.resume`, answers `UNSUPPORTED` when `transport.history` is disabled, when the store implements no `listFor`, or when the store throws `StoreCannotList` (such as `MongoSessionStore` on a collection without `find`), and answers transient `listFor` rejections with `SERVER_ERROR` carrying no store detail on an open socket while logging `sessionId` and no user content
  `src/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (additive only, with a compile-time fixture pinning pre-existing message literals), add `UNSUPPORTED: 'UNSUPPORTED'` to `ErrorCodes` in `src/types/session.ts`, define `StoreCannotList` (thrown by `MongoSessionStore.listFor` when `collection.find === undefined`), and re-export the new public types and `StoreCannotList` from `src/index.ts`.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` (restoring the `re-lint/prefer-polymorphism` inline suppression documented in `adrs/ADR-006-lint-suppressions.md` for the third switch arm) to validate `list_conversations` with optional integer `limit` in `1..200` and optional `{updatedAt, sessionId}` ISO-string cursor `before`, dropping undeclared fields.
- [ ] Add `SessionHistoryOptions` (`{enabled: boolean}`, mirroring `SessionResumeOptions`' GDPR retention note pointing at `re-cinq/HALEngine#41`) under `transport.history` in `src/config.ts`, warn at startup when `history.enabled` is true without `resume.enabled`, and thread `history` and `sessionStore` through `src/transport/createServer.ts` and `src/transport/ws/connectionHandler.ts` into `createMessageHandler`.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` (and `sender.ts`) outside `PerSessionLock`: answer `UNSUPPORTED` when `history?.enabled` is not `true`, when `store.listFor` is absent, or when `store.listFor` throws `StoreCannotList`; otherwise call `await store.listFor(ws.userId, {limit, before})` (never reading `userId` from the frame), serialise `createdAt` and `updatedAt` to ISO strings in a single `conversation_list` frame with no `stream_end`, and answer any other rejection with generic `SERVER_ERROR` while logging with `sessionId` and no user content.
- [ ] Update companion docs and examples for CI doc gates: note WebSocket delivery in `specs/hal-engine-conversation-list/spec.md` (preserving 100% statement-citation coverage if adding testable statements), keep `docs/adding-a-message-type.md` accurate for the message union, add `history` under `transport` in `example/full-config.ts`, and record the addition under `Unreleased` in `CHANGELOG.md`.

## Out of scope

- Conversation titles, snippets, or auto-generated labels (#145).
- Deleting a conversation over the WebSocket (#41).
- Switching the active conversation on an already-open socket without reconnecting (`?sessionId=<id>`).
- Server-side search or filtering beyond `{limit, before}` cursor paging.
- Operator views of another user's conversations or live multi-tab sync (#124).