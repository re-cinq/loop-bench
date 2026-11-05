# Definition of Done

> A consumer has `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage`, `createServer` and the real WebSocket upgrade already exist, so the tests drive them today and fail because `list_conversations` is an unknown type and `transport.history` does not exist.

## Done when these pass

- [ ] **accepts a bare list_conversations and names the field of any bad limit or before** — validation: limit integer 1-200, `before` parseable, else `INVALID_MESSAGE` naming the field.
  `src/transport/conversationListFrame.acceptance.test.ts`
- [ ] **answers the connecting user their own conversations, newest first, whatever userId the frame carries** — one `conversation_list` with ISO times, `listFor` called with `ws.userId`, `limit`/`before` passed through.
  `src/transport/conversationListFrame.acceptance.test.ts`
- [ ] **answers one UNSUPPORTED error, never a list, when history is off or the store cannot list** — opt-in flag off, or no `listFor`.
  `src/transport/conversationListFrame.acceptance.test.ts`
- [ ] **answers a list request while a user_message is still streaming, before its stream_end** — answered off the per-session lock.
  `src/transport/conversationListFrame.acceptance.test.ts`

## Facets

- [ ] Add the two frame types, `ErrorCodes.UNSUPPORTED` and the validation case.
- [ ] Add `transport.history` and thread it through `createServer` into `createMessageHandler` with the store.
- [ ] Answer `list_conversations` beside `ping`, off the lock, with the three refusals/answers above.
- [ ] Not pinned here, still owed by the ticket: `listFor` rejection as `SERVER_ERROR` / `StoreCannotList` as `UNSUPPORTED`, resume-by-id from a row, `ConnectedMessage` unchanged, CHANGELOG, `example/full-config.ts` + `npm run docs:fix`, remaining spec text.

## Out of scope

- Previews or titles, deleting a conversation from the client, server-held paging state, operator views of other users, live sync between tabs.