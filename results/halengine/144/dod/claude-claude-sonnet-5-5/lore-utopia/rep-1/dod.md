# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — `createServer`, `validateMessage` and the real socket already exist; the tests drive a real engine over a real upgrade and fail today because `list_conversations` is an unknown frame type (`INVALID_MESSAGE`).

## Done when these pass

- [ ] **refuses a limit or before that is not in range, naming the field, and accepts the bare frame** — `validateMessage` accepts `{type:'list_conversations'}`; limit 0/201/1.5/'10' and a bad `before` cursor are invalid with the field named.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with one conversation_list of the connecting user's own rows ... whatever userId the frame carries** — one `conversation_list`, no `stream_end`, ISO strings, the store's `listFor` called with `ws.userId` and the frame's `limit`/`before` cursor.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a user with three conversations with all three, newest first** — ordering and count.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and no list, with history off or with a store that cannot list** — `error` frame code `UNSUPPORTED`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a rejecting listFor with SERVER_ERROR carrying no store detail, and keeps the socket open**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list_conversations before the stream_end of a turn still streaming on the same session** — off the per-session lock.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the frame types and `ErrorCodes.UNSUPPORTED` (additive) and the `validation.ts` case.
- [ ] `createMessageHandler(orchestrator, store, history)` answering on the non-locked path; thread `history` through `createServer` and `HalEngineConfig.transport.history`.
- [ ] Export `StoreCannotList` (answered `UNSUPPORTED`); startup warning for history without resume.
- [ ] Specs, `docs/getting-started.md` via `example/full-config.ts` and `npm run docs:fix`, CHANGELOG, then link specs to these tests.

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, operator view of another user's list, live sync between tabs.
- Picking a conversation (reconnect with `?sessionId=`) is already pinned by `src/transport/sessionResume.test.ts`.
- The spec has no unlinked statements for this ticket yet; the spec text and its citations are owed by the implementing round.