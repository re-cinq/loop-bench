# Definition of Done

> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are callable entry points today; the tests call them with the future signature (using a type cast so ts-jest compiles them) and fail because the behaviour is absent, not because an import is broken.

## Done when these pass

- [ ] **accepts a bare list_conversations frame and rejects one with an out-of-range limit** — `validateMessage` accepts `{type:'list_conversations'}` and rejects `limit:0` / `limit:201` with an error naming the field
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with one conversation_list frame when history is enabled, using the connection userId** — with `history:{enabled:true}` and three sessions for the authenticated user, the handler sends exactly one `conversation_list` frame carrying three summaries whose `createdAt`/`updatedAt` are ISO strings, with no `stream_end`; a spurious `userId` field in the frame does not change whose list is returned
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with an UNSUPPORTED error when history is not configured** — without the history option, the handler responds with an `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` to `IncomingMessage` and `ConversationListMessage`/`ConversationSummary`/`ConversationCursor` to `OutgoingMessage` in `src/types/messages.ts` (additive only)
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: accept bare frame; reject `limit` ≤ 0 or > 200; reject `before` with an unusable `updatedAt`; reject cursor with only one half present
- [ ] Update `createMessageHandler` to accept `(orchestrator, store, options)` and handle `list_conversations` on the non-locked path alongside `ping`
- [ ] Thread `sessionStore` and `transport.history` through `createServer` into `createMessageHandler`
- [ ] Add `transport.history?: {enabled: boolean}` to `HalEngineConfig` in `src/config.ts`
- [ ] Handle store with no `listFor` → `UNSUPPORTED`; `listFor` rejection → `SERVER_ERROR`; export `StoreCannotList` and map it to `UNSUPPORTED` instead
- [ ] Add spec statements to `specs/hal-engine-websocket-protocol/spec.md` (§ Conversation list) and add `([validated by: ...])` citations pointing at the acceptance test lines
- [ ] Add `§ Conversation list` to `docs/getting-started.md` via `example/full-config.ts` + `npm run docs:fix`
- [ ] Add `CHANGELOG.md` entry under `## [Unreleased]`
- [ ] MINOR version bump

## Out of scope

- Pagination correctness (limit/before passed through to `listFor`) — covered by store-layer tests in `specs/hal-engine-conversation-list/`
- Non-blocking ordering guarantee (answered before `stream_end` of a concurrent `user_message`) — behaviour follows naturally from routing `list_conversations` outside the per-session lock alongside `ping`; pinned by the existing "answers a ping at once while a run is pending" test pattern
- Resume path end-to-end (`?sessionId=` from a list row) — existing session-resume tests already cover this
- Live sync, operator views, delete-from-client, paging state held server-side