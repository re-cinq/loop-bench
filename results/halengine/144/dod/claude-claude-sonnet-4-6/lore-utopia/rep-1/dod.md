# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade

**Strategy: `direct`** — `validateMessage` in `validation.ts` and `createMessageHandler` in `messageHandler.ts` are the existing entry points; the new frame type and handler path are added there, and the tests call them directly.

## Done when these pass

- [ ] **accepts a bare list_conversations frame and rejects each invalid variant with an error naming the field** — `validateMessage({type: 'list_conversations'})` succeeds; `limit: 0`, `201`, `1.5`, `'10'` and `before` with an unparseable `updatedAt` each return an error naming the field
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with a conversation_list carrying ISO-string summaries in newest-first order** — with `history: {enabled: true}` and a store holding three conversations, one `conversation_list` frame arrives with three summaries ordered newest first, each `createdAt` and `updatedAt` a valid ISO string, and no `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **calls listFor with the socket userId when the frame carries another user id** — a frame with `userId: 'u2'` on a `'u1'` connection calls `listFor('u1', ...)` and the returned list contains none of the other user's sessions
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is not enabled or the store implements no listFor** — without a `history` option the frame returns `error` with code `UNSUPPORTED`; with `history: {enabled: true}` against a store with no `listFor`, same result, no `conversation_list` in either case
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations before the running turn's stream_end** — `list_conversations` sent while a `user_message` is streaming returns `conversation_list` before the stream releases and sends `stream_end`
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, and `ConversationListMessage` to `src/types/messages.ts`; union members into `IncomingMessage` and `OutgoingMessage`
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`: `limit` integer 1–200 when present; `before` a `{updatedAt: Date.parse-valid string, sessionId: string}` cursor when present; refuses one half of the cursor alone
- [ ] Update `createMessageHandler` in `src/transport/ws/messageHandler.ts` to accept `store` and `opts: {history?: {enabled: boolean}}` alongside `orchestrator`; handle `list_conversations` on the non-locked path using `session.userId` (never the frame's field)
- [ ] Add `HalEngineConfig.transport.history?: {enabled: boolean}` to `src/config.ts`; thread store and options through `createServer` to `createMessageHandler`
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` with the two frames, their field tables, the authorisation rule, and `transport.history`; add trailing `([validated by ...])` citations on each testable statement
- [ ] Update `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`
- [ ] Add `CHANGELOG.md` entry under `## [Unreleased]`
- [ ] Bump version MINOR

## Out of scope

- A preview or title on the conversation summaries (its own issue)
- Deleting a conversation from the client (needs its own authorisation decision)
- Server-side paging state (the client pages with `before`)
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled out)
- The reconnect-and-resume path is already covered by #45 and needs no new transport code