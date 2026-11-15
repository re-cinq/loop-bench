# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createServer` over a real socket is the seam: the acceptance tests open a real upgrade with `wsTestSupport`, send a `list_conversations` frame, and read the frames that come back, against a real `InMemorySessionStore` (subclassed only to record `listFor`'s argument or to fail as a database would). Today every one of them is answered `INVALID_MESSAGE: Unknown message type: list_conversations`. `history` is passed to `createServer` by spread so the file compiles before `HalServerOptions.history` exists.

## Done when these pass

- [ ] **answers list_conversations with one conversation_list of the user own conversations, newest first, times as ISO strings** — one `conversation_list`, no `stream_end`, the user's seeded conversations newest first, no other user's row, each row exactly `sessionId/createdAt/updatedAt/entryCount` with ISO times
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists the connection user, not a userId the frame carries, and hands limit and before to listFor as sent** — `listFor` recorded as `('u1', {limit: 2, before: {updatedAt, sessionId}})` for a frame carrying `userId: 'u2'`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers an error and never a list when history is off, the store cannot list, or the store fails** — `UNSUPPORTED` for history off and for a store with no `listFor`; `SERVER_ERROR` with no store detail for a failing `listFor`, socket open, failure logged with a session id and no content
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list asked for mid-turn before that turn stream_end, rather than queueing behind the lock** — answered off the `PerSessionLock`
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts a bare list_conversations and refuses a limit or cursor it cannot page on, naming the field** — `validateMessage` accepts the bare frame and refuses `limit` 0, 201, 1.5, `'10'` and a bad or half `before` cursor
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `validation.ts`: `list_conversations` case (limit 1–200 integer, `before` a `{updatedAt, sessionId}` cursor) and the four new interfaces in `src/types/messages.ts`, additive only
- [ ] `ErrorCodes.UNSUPPORTED`; `HalEngineConfig.transport.history?: {enabled}` threaded through `createServer` like `resume`
- [ ] `createMessageHandler` takes the store and history options; answers `list_conversations` beside `ping`, off the lock, with `ws`'s connection user
- [ ] Refusals: history off / no `listFor` / `StoreCannotList` -> `UNSUPPORTED`; any other rejection -> `SERVER_ERROR`, logged with session id
- [ ] Startup warning when `history` is on without `resume`; retention note on the new options type pointing at #41
- [ ] Docs: `specs/hal-engine-websocket-protocol/spec.md` field tables for both frames, conversation-list spec, `example/full-config.ts` + `npm run docs:fix`, CHANGELOG under `## [Unreleased]`, MINOR bump

## Out of scope

- Summary previews or titles; deleting a conversation from the client; server-side paging state; an operator view of another user's conversations; live sync between tabs (#124)
- Opening a listed conversation: reconnect with `?sessionId=` is the existing #45 path, unchanged