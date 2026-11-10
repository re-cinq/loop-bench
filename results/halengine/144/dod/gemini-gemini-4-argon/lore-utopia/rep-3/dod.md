# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way — the exact failure #45 went out of its way to avoid for resume.

**Strategy: `direct`** — `createHalEngine` and `createServer` already wire the WebSocket transport, `validateMessage`, `createMessageHandler`, and `SessionStore`, so acceptance tests can connect a real WebSocket client and send `list_conversations` frames against the live server today.

## Done when these pass

- [ ] **listing conversations over the WebSocket protocol lists the connecting user's conversations newest first as ISO timestamps, pages with limit and before, and rejoins a listed id on reconnect** — With `transport.history: {enabled: true}`, a `list_conversations` frame returns `conversation_list` carrying only the authenticated user's summaries in descending `updatedAt` order with ISO 8601 `createdAt` and `updatedAt` strings, pages via `limit` and `before: {updatedAt, sessionId}`, ignores any `userId` on the frame and calls `store.listFor` with `ws.userId`, and supplies a `sessionId` that `?sessionId=<id>` resumes with its stored replay
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol answers list_conversations at once while a user_message turn is still streaming** — `list_conversations` is answered outside `PerSessionLock`, so a request sent mid-stream receives `conversation_list` before the turn's `stream_end`
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol answers UNSUPPORTED when history is off or the store cannot list, INVALID_MESSAGE on malformed paging, and SERVER_ERROR when listFor rejects** — With `transport.history` omitted/disabled, a store without `listFor`, or a `MongoSessionStore` whose collection implements no `find` (throwing `StoreCannotList`), `list_conversations` answers an `error` frame with code `UNSUPPORTED`; invalid `limit` (outside integer 1–200) or malformed `before` cursor answers `INVALID_MESSAGE` naming the field; a rejecting `listFor` answers `SERVER_ERROR` without leaking store details while keeping the socket open
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ConversationCursor`, `ListConversationsMessage`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts`, add `ErrorCodes.UNSUPPORTED` to `src/types/session.ts`, export `StoreCannotList` (thrown when `MongoSessionStore.listFor` runs against a collection with no `find`), and re-export the new public surface from `src/index.ts`
- [ ] Validate `list_conversations` frames (`limit` integer 1–200 when present; `before` cursor with parseable `updatedAt` string and non-empty `sessionId` string when present) in `src/transport/ws/validation.ts`, returning `INVALID_MESSAGE` naming the invalid field
- [ ] Add `HistoryOptions` (`{enabled: boolean}`) with the GDPR retention note under `transport.history` in `src/config.ts`, `src/transport/createServer.ts`, and `src/transport/ws/connectionHandler.ts`, warn at startup when `history.enabled` is true without `resume.enabled`, and pass `sessionStore` and `history` to `createMessageHandler`
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside `PerSessionLock` using `ws.userId` and `{limit, before}`: answer `UNSUPPORTED` when `history?.enabled` is not `true`, `sessionStore?.listFor` is absent, or `listFor` throws `StoreCannotList`; serialize `Date` fields to ISO strings in `conversation_list`; report other `listFor` failures as `SERVER_ERROR` with no store detail and log with `sessionId`
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `example/full-config.ts`, `docs/getting-started.md` (via `npm run docs:fix`), and `CHANGELOG.md`

## Out of scope

- Conversation titles or previews on summaries (tracked in #145)
- Deleting a conversation from the client over the WebSocket
- Switching the active conversation in place without reconnecting with `?sessionId=<id>`
- Server-side paging state (the client pages with `before`)
- Operator views of another user's conversations
- Live sync between open tabs (#124)