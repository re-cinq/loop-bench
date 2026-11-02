# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seam exists: `createServer` and its WebSocket message handler are the real entry point, and `InMemorySessionStore.listFor` (#143, #146) is already shipped. The missing piece is the `list_conversations` frame and the `history` option, which the acceptance tests reach through a real socket.

## Done when these pass

- [ ] **answers list_conversations with the connecting user's conversations, newest first, times as ISO strings** — with `history` enabled, one `conversation_list` frame carries the user's conversations newest first, each `createdAt` and `updatedAt` an ISO string, and no `stream_end` follows
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **ignores a userId carried in the frame and answers with the connecting user's own list** — a frame naming another user is answered with the connection's own user's conversations (`ws.userId`), never the other user's
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and no list, when the deployer has not opted in to history** — with `history` absent, the frame gets one `error` frame with code `UNSUPPORTED` and no `conversation_list`
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Acceptance: `list_conversations` answered over the socket with the user's list (`conversationList.acceptance.test.ts`, test 1)
- [ ] Acceptance: the frame's `userId` is ignored (`conversationList.acceptance.test.ts`, test 2)
- [ ] Acceptance: history off answers `UNSUPPORTED` with no list (`conversationList.acceptance.test.ts`, test 3)
- [ ] `src/types/messages.ts`: `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage`, additive union members only
- [ ] `src/transport/ws/validation.ts`: a `list_conversations` case; `limit` integer 1–200, `before` a `{updatedAt, sessionId}` cursor, otherwise `INVALID_MESSAGE` naming the field
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`, additive
- [ ] `src/transport/ws/messageHandler.ts`: answer `list_conversations` off the per-session lock, beside `ping`, with the user id from `ws.userId`
- [ ] `src/transport/createServer.ts`: `history?: {enabled: boolean}` option, default off, threaded to the handler
- [ ] Store without `listFor` answers `error` `UNSUPPORTED`, not an empty list
- [ ] A rejecting `listFor` answers `SERVER_ERROR` with no store detail, socket stays open, failure logged with session id only
- [ ] A `list_conversations` sent during a streaming turn is answered before that turn's `stream_end`
- [ ] Reconnect with `?sessionId=<id>` from a listed row resumes that conversation (existing #45 path, end-to-end)
- [ ] `src/config.ts`: `transport.history`, threaded through `createServer`; startup warning when `history` is on without `resume`
- [ ] Spec: `specs/hal-engine-websocket-protocol/spec.md` gains the two frames, their field tables and the authorisation rule; GDPR statements on the new options type
- [ ] `example/full-config.ts` § Conversation list, regenerated with `npm run docs:fix` (never hand-edited into `docs/getting-started.md`)
- [ ] `CHANGELOG.md` entry under `## [Unreleased]`

## Out of scope

- A title or preview on summaries (its own issue)
- Deleting a conversation from the client (needs its own erasure authorisation decision)
- Server-side paging state; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled it out)
- Unsolicited `conversation_list` pushes
- Version bump and PR body wording (release concerns, not behaviour)