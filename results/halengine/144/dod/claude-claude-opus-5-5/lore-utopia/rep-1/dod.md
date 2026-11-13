# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The seams exist: `validateMessage` is the validator's entry point, and `createServer` (driven over a real socket through `src/transport/wsTestSupport.ts`) is the transport's. Today both answer `list_conversations` with `INVALID_MESSAGE: Unknown message type`, which is exactly the absent behaviour. The `history` option is passed through an options variable so the tests compile before `HalServerOptions` declares it.

## Done when these pass

- [ ] **accepts a list_conversations frame and refuses a bad limit or cursor with a message naming the field** — validation of the new frame: bare and paged frames valid; `limit` 0, 201, 1.5, `'10'` and a malformed or half `before` cursor refused naming the field.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connecting user's own list, newest first with ISO times, whatever user id the frame names** — with `history: {enabled: true}`, one `conversation_list` per request, newest first (the connection's own fresh session heads it), ISO strings, no `stream_end`; a spoofed `userId` is ignored and `listFor` is recorded being called with `'u1'` and `{limit, before}` as sent.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store cannot list, and SERVER_ERROR without detail when it fails** — history absent and store without `listFor` both answer `UNSUPPORTED`; a rejecting `listFor` answers `SERVER_ERROR` with no store detail, the socket still answers a ping, and an error is logged with the session id.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request sent mid-stream before that turn's stream_end** — the request is answered off the per-session lock.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **resumes a conversation picked from the list through the existing ?sessionId= reconnect** — an id from `conversation_list` reconnects with `resumed: true` and its entry count via the #45 path.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage` added to `src/types/messages.ts` (additive only); `UNSUPPORTED` added to `ErrorCodes`
- [ ] `validation.ts` gains the `list_conversations` case (limit 1–200 integer, cursor with parseable `updatedAt` and a `sessionId`)
- [ ] `createMessageHandler` takes the store and history options; answers `list_conversations` beside `ping`, off the lock, with `ws.userId`
- [ ] `HalEngineConfig.transport.history` threaded through `createServer` like `resume`; startup warning when history is on and resume is off
- [ ] `StoreCannotList` exported and mapped to `UNSUPPORTED`; other rejections to `SERVER_ERROR` with a log line carrying the session id
- [ ] Docs: protocol spec field tables and error-code row, `example/full-config.ts` + `npm run docs:fix`, CHANGELOG under `## [Unreleased]`, MINOR bump

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's list, live sync between tabs (all named out of scope by the ticket).
- The `messages.ts` "every prior literal still compiles" fixture and the `git diff` / `grep` criteria are review and CI checks, not behaviour these tests pin.