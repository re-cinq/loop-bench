# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine`, `createServer`, `validateMessage`, and the WebSocket upgrade/message/session seams already exist, so the acceptance tests drive real WebSocket connections against real stores (`InMemorySessionStore`, `MongoSessionStore`, and `fiveMemberStore`) and fail today because `list_conversations` and `transport.history` are absent.

## Done when these pass

- [ ] **refuses list_conversations with UNSUPPORTED when history is off, when the store omits listFor, or when the store throws StoreCannotList** — pins opt-in `transport.history` default off, stores without `listFor`, and `MongoSessionStore` collections lacking `find` throwing `StoreCannotList`
  `src/wsConversationList.acceptance.test.ts`

- [ ] **answers list_conversations with the authenticated user summaries newest first as ISO strings, ignores frame userId, pages with cursor, and lets a listed id resume** — pins `ws.userId` ownership enforcement, `{limit, before}` cursor forwarding, ISO wire formatting without entries or credentials, no `stream_end`, unchanged `ConnectedMessage`, and end-to-end `?sessionId=` resume
  `src/wsConversationList.acceptance.test.ts`

- [ ] **validates list_conversations limit and before cursor and rejects invalid shapes naming the field** — pins `validateMessage` acceptance of `list_conversations`, stripping of extra fields like `userId`, rejection of invalid `limit` (1–200 integer) and half/invalid `before` cursors naming the field, and `INVALID_MESSAGE` on the wire
  `src/wsConversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message turn is streaming on the same session before stream_end** — pins handling `list_conversations` outside `PerSessionLock` so an active turn does not block it
  `src/wsConversationList.acceptance.test.ts`

- [ ] **answers a rejecting listFor with SERVER_ERROR hiding store details, keeps the socket open, and logs sessionId without user content** — pins `SERVER_ERROR` sanitisation, open socket survival (`ping`/`pong`), and safe error logging with `sessionId`
  `src/wsConversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ConversationSummary`, `ListConversationsMessage`, and `ConversationListMessage` to `src/types/messages.ts` (additive only), add `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, and export `StoreCannotList` and the new types from `src/index.ts`.
- [ ] Have `MongoSessionStore.listFor` throw `StoreCannotList` when `collection.find` is absent.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` for `list_conversations` (`limit` integer 1–200, `before` `{updatedAt, sessionId}` cursor, stripping unknown fields).
- [ ] Thread `history?: {enabled: boolean}` through `HalEngineConfig.transport`, `createServer`, `connectionHandler`, `createMessageHandler`, and `sender.ts`, logging a startup warning when `history.enabled` is set without `resume.enabled`, and answering `list_conversations` outside `PerSessionLock`.
- [ ] Update `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), `CHANGELOG.md`, and bump the MINOR version in `package.json` and `package-lock.json`, then verify `npm run verify` passes.

## Out of scope

- A preview or title on conversation summaries.
- Deleting a conversation from the client over WebSocket.
- Server-side paging state (the client pages with `before`).
- An operator view of another user's conversations.
- Live sync between open tabs.