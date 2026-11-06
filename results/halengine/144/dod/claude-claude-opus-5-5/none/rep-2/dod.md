# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createServer` over a real socket is the seam: a `list_conversations` frame can be sent today and is answered `INVALID_MESSAGE`, so every test fails on absent behaviour, not on wiring. Options this ticket adds (`history`) are spread in untyped, and `UNSUPPORTED` is asserted as a string, so the file runs before the types exist.

## Done when these pass

- [ ] **answers the connection's own user with their conversations, newest first, whatever user a frame names** — one `conversation_list` per frame, ISO times, the connection's own row first, `listFor` called with `ws.userId` and `{limit, before}` as sent, a frame `userId` ignored, and a listed id reopened via `?sessionId=` with `resumed: true` and its replay
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a malformed list_conversations, naming the field at fault** — `validateMessage` accepts the bare frame, limits 1 and 200 and a full cursor; refuses `limit` 0/201/1.5/'10', an unparseable `before`, and a half cursor
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED and no list when history is off, or the store cannot list**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a failing store with SERVER_ERROR carrying no store detail, logs the session, and stays open**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list_conversations sent mid-turn before that turn's stream_end** — off the per-session lock
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `ErrorCodes.UNSUPPORTED`; `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` added to `src/types/messages.ts` (no existing line touched)
- [ ] `validation.ts` `list_conversations` case (limit 1–200 integer, `before` a `{updatedAt, sessionId}` cursor)
- [ ] `createMessageHandler` takes the store and history options; answers off the lock beside `ping`, user id from `ws.userId`
- [ ] `HalEngineConfig.transport.history` threaded through `createServer` like `resume`; startup warning when history is on and resume is off
- [ ] `UNSUPPORTED` for history off / no `listFor` / `StoreCannotList` (exported); `SERVER_ERROR` plus a session-id log line otherwise
- [ ] `ConnectedMessage` unchanged; GDPR text in the protocol spec (§ 4.3, § 5.9 statements are already written and cited) and retention note on the options type
- [ ] `example/full-config.ts` + `npm run docs:fix` for § Conversation list in `docs/getting-started.md`; CHANGELOG `[Unreleased]` entry; MINOR bump

## Out of scope

- Summary previews or titles, deleting a conversation from the client, server-side paging state, an operator view of other users' lists, live sync between tabs (#124)
- `StoreCannotList` itself is pinned by the build's own tests: the acceptance tests do not import a symbol that does not exist yet