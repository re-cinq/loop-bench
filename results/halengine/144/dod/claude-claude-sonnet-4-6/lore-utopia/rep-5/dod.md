# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` in `src/transport/ws/` are real, callable entry points today; the acceptance tests call them directly and fail because the feature is absent.

## Done when these pass

- [ ] **validateMessage accepts list_conversations and rejects invalid variants** — `validateMessage({type: 'list_conversations'})` is valid; `limit: 0`, `limit: 201`, `limit: 1.5`, `limit: '10'` and `before: 'not a date'` are invalid with errors naming the field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler answers conversation_list with ISO string times and no stream_end** — with `history: {enabled: true}` and a store returning three summaries, a `list_conversations` frame produces exactly one `conversation_list` frame whose `createdAt`/`updatedAt` are ISO strings, and no `stream_end` follows
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler uses ws.userId, ignores frame userId** — a `list_conversations` frame carrying a foreign `userId` field is answered with the connecting user's list; `listFor` is called with `ws.userId`; the `limit` cursor field reaches `listFor`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **UNSUPPORTED when history is off** — with no `history` option in config, `list_conversations` is answered with an `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **UNSUPPORTED when store has no listFor** — with `history: {enabled: true}` and a store implementing no `listFor`, the answer is the same `UNSUPPORTED` error frame and no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` to `IncomingMessage` and `ConversationListMessage` / `ConversationSummary` to `OutgoingMessage` in `src/types/messages.ts` (additive only — no existing line changes)
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: valid plain; `limit` integer 1–200; `before` a `{updatedAt, sessionId}` cursor object (string alone is invalid)
- [ ] Extend `createMessageHandler` signature to accept `store: SessionStore` and `options?: {history?: {enabled: boolean}}`; wire it in `createServer`
- [ ] Handle `list_conversations` off the per-session lock alongside `ping`: read `ws.userId`, call `store.listFor`, send `conversation_list`; answer `UNSUPPORTED` when history is off or store has no `listFor`; answer `SERVER_ERROR` on a rejected promise, logging session id only
- [ ] Add `HalEngineConfig.transport.history?: {enabled: boolean}` and thread it through `createServer`
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` with the two frames, field tables and authorisation rule; add trailing `([validated by ...])` citations on new statements
- [ ] Add `§ Conversation list` to `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`
- [ ] Add `CHANGELOG.md` entry under `## [Unreleased]`; bump version MINOR

## Out of scope

- Preview titles on summaries (its own issue)
- Deleting a conversation from the client
- Server-side paging state
- Operator view of another user's conversations
- Live sync between open tabs (#124)
- `StoreCannotList` exported error class (mentioned in amended criteria; can be added in this ticket or a follow-up)