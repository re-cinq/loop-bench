# Definition of Done

> the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` with a real socket, `validateMessage` and `InMemorySessionStore.listFor` (#143) already exist; the tests drive them through the real upgrade and fail because `list_conversations` is an unknown frame today.

## Done when these pass

- [ ] **rejects a list_conversations frame whose limit or before cannot be honoured, naming the field** — `validateMessage` accepts the bare frame and refuses limit 0, 201, 1.5, '10' and an unparseable before.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection's own user, newest first, from the connection and never from the frame** — with `history: {enabled: true}`, one `conversation_list`, ISO times, no `stream_end`; a frame carrying another `userId` still reaches `listFor` as `ws.userId`, and `limit` is passed through.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and no list, when history is not enabled** — default off.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, not an empty list, when the store cannot list** — store without `listFor`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `validation.ts`: the `list_conversations` case, and the message types in `messages.ts`
- [ ] `ErrorCodes.UNSUPPORTED`, `transport.history` option threaded through `createServer` to `createMessageHandler`
- [ ] Answer on the non-locked path beside `ping`, user id from `ws.userId`
- [ ] Remaining criteria not pinned here: `before` cursor, `SERVER_ERROR` on a rejecting store, `StoreCannotList`, answered during a streaming turn, resume by listed id, startup warning, CHANGELOG, `example/full-config.ts` + `npm run docs:fix`, spec status and GDPR text

## Out of scope

- Preview or title on summaries, deleting a conversation from the client, server-side paging state, operator view of other users, live sync between tabs.