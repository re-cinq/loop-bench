# Definition of Done

> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade. That is a second authorisation
> path to the same personal data, written once per consumer, each one able to get the ownership
> check wrong in its own way

**Strategy: `direct`** — `validateMessage` and `createMessageHandler` are both callable seams. The acceptance tests call `validateMessage` for the validation facet and call `createMessageHandler` with the extended signature `(orchestrator, store, options)` (extra args are silently ignored at runtime today, so all five tests fail because the behaviour is absent, not because an import is broken).

## Done when these pass

- [ ] **list_conversations validation** — `validateMessage` accepts a bare `list_conversations` frame and rejects invalid `limit` (0, >200, fractional, non-number) and `before` (non-cursor) values, with the error message naming the offending field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **conversation list delivery** — with `history: {enabled: true}` and a store returning three summaries, a `list_conversations` frame is answered with one `conversation_list` frame carrying three rows in newest-first order, each `createdAt` and `updatedAt` as an ISO string, and no `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **auth regression** — a frame carrying `userId` of another user is answered with the connecting user's list; `listFor` is called with `ws.userId`, not the frame field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **feature guard** — with no `history` config, `list_conversations` is answered with an `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **non-blocking** — a `list_conversations` sent while a `user_message` is streaming is answered (the `conversation_list` frame arrives) before the streaming turn's `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: accept bare frame, validate `limit` (integer 1–200), validate `before` as a cursor object whose `updatedAt` is a parseable date — test 1 green
- [ ] Add `ListConversationsMessage` and `ConversationSummary` and `ConversationListMessage` to `src/types/messages.ts` (additive only, no existing lines touched)
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts` (additive)
- [ ] Extend `createMessageHandler(orchestrator, store, options)` to handle `list_conversations` on the non-locked path beside `ping`: read `ws.userId`, call `store.listFor`, send `conversation_list` or `UNSUPPORTED` error — tests 2–5 green
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts` and thread it through `createServer` options
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` with the two new frames, their field tables and the authorisation rule; add `([validated by: ...])` citations
- [ ] Add § Conversation list to `docs/getting-started.md` via `example/full-config.ts` + `npm run docs:fix`
- [ ] Add `CHANGELOG.md` entry under `## [Unreleased]`
- [ ] Bump version MINOR

## Out of scope

- Conversation title / preview (its own issue)
- Deleting a conversation from the client
- Server-side paging state (client pages with `before`)
- Operator view of another user's conversations
- Live sync between open tabs (#124)
- `StoreCannotList` exported error class (noted in ticket amendments; tested indirectly once the handler uses it)