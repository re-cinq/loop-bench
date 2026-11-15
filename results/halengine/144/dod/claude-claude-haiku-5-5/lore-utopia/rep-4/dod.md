# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` already takes `sessionStore` and `resume`, and `startEngine`-style tests open a real WebSocket against it. `SessionStore.listFor` already ships on `InMemorySessionStore` (#146), so the frame has something to answer from. What is missing is the frame itself and the `transport.history` option, so the tests fail on behaviour today.

## Done when these pass

- [ ] **answers list_conversations with the user conversations, newest first, as ISO-string summaries, in one conversation_list** — a real socket, a store holding three conversations for the connecting user, one `conversation_list` carrying three summaries in activity order, each time an ISO string, each summary carrying exactly its four fields, and no `stream_end`
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **takes the user from the connection, so a frame naming another user is answered with the connecting user's own list** — a `list_conversations` frame carrying `userId: 'u2'` on a `u1` connection is answered with `u1`'s conversations and none of `u2`'s
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations with an UNSUPPORTED error and no list when the deployer has not enabled history** — with `transport.history` absent, the frame gets one `error` frame coded `UNSUPPORTED` and no `conversation_list`
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary` and `ConversationCursor` as new interfaces and union members only
- [ ] `src/types/session.ts`: add `UNSUPPORTED` to `ErrorCodes`
- [ ] `src/transport/ws/validation.ts`: `list_conversations` case — `limit` integer 1–200, `before` a `{updatedAt, sessionId}` pair; anything else `INVALID_MESSAGE` naming the field
- [ ] `src/config.ts` and `src/transport/createServer.ts`: `transport.history?: {enabled: boolean}`, default off, threaded like `resume`; the list tests above go green here
- [ ] `src/transport/ws/messageHandler.ts`: answer `list_conversations` on the non-locked path beside `ping`, user id from `ws.userId`, `UNSUPPORTED` when disabled or when the store has no `listFor`
- [ ] `src/transport/ws/messageHandler.ts`: a store `listFor` that rejects is answered `SERVER_ERROR` with no store detail, socket left open, failure logged with session id and no content
- [ ] A `list_conversations` sent during a streaming `user_message` is answered before that turn's `stream_end` (not pinned by an acceptance test yet)
- [ ] A client reconnecting with `?sessionId=<id>` from a listed row gets `resumed: true` and the replay (existing #45 path; add a test that exercises it)
- [ ] `specs/hal-engine-websocket-protocol/spec.md` and the conversation-list spec: frames, field tables, authorisation rule, GDPR statement; citations added once the statements exist
- [ ] `CHANGELOG.md` under `## [Unreleased]`; `example/full-config.ts` edited and `npm run docs:fix` run for `docs/getting-started.md`
- [ ] Version bump MINOR in the PR body

## Out of scope

- A preview or title on summaries (its own issue)
- Deleting a conversation from the client (needs its own authorisation decision)
- Server-side paging state; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)