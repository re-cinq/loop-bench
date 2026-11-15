# Definition of Done

> answering "which conversations do I have" over the same socket is the smaller surface.

The ticket's title states the ask: "Deliver a user's conversation list over the WebSocket protocol". Today a `list_conversations` frame is refused as `Unknown message type`, so a client holding the socket cannot learn which conversations its user has.

**Strategy: `direct`** — `createServer` over a real socket and `validateMessage` are the seams. Each test drives a real engine with a real `InMemorySessionStore` and fails today because the frame is unknown.

## Done when these pass

- [ ] **validates list_conversations: limit an integer 1-200, before a {updatedAt, sessionId} cursor** — the frame is valid bare or paged; `limit` 0, 201, 1.5 or '10', a non-date `before` and a half cursor are invalid with an error naming the field
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connection's own conversations, newest first as ISO strings, whatever userId the frame names** — one `conversation_list` with three summaries and no `stream_end`; a foreign `userId` is ignored; `listFor` is recorded as `('u1', {limit, before})` exactly as sent
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses with one error and no list: UNSUPPORTED when off or unable to list, SERVER_ERROR without detail when the store fails** — history off, no `listFor`, and `StoreCannotList` (exported from `src/index.ts`) all give `UNSUPPORTED`; a rejecting store gives `SERVER_ERROR` without its detail, the socket stays open, and the log carries the session id and no content
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list request sent while a turn is streaming before that turn ends** — answered off the per-session lock
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **resumes a conversation picked from the list through the existing ?sessionId reconnect, replay included** — the #45 path, end to end
  `src/transport/conversationList.acceptance.test.ts`

Run: `NODE_OPTIONS=--experimental-vm-modules npx jest src/transport/conversationList.acceptance.test.ts`. The tests pass `history: {enabled: true}` to `createServer` beside `resume`, and reconnect with `?sessionId=c-new`, so the connection adds no fourth conversation of its own.

## Facets

- [ ] `messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor` and `ConversationSummary`, all additive; add `UNSUPPORTED` to `ErrorCodes`
- [ ] `validation.ts`: add the `list_conversations` case (limit, cursor), so the validator test goes green
- [ ] `createServer`: add the `history` option, and have `createMessageHandler` take the store and options and answer on the non-locked path beside `ping`, with the user from `ws.userId`
- [ ] Error paths: history off or no `listFor` gives `UNSUPPORTED`; export `StoreCannotList`, which gives `UNSUPPORTED`; a rejection gives `SERVER_ERROR` and is logged with the session id
- [ ] `HalEngineConfig.transport.history` threaded through `createHalEngine`; startup warning when history is on and resume is off
- [ ] Spec § 5 field tables for `conversation_list` and `UNSUPPORTED`, plus the GDPR statements; the conversation-list spec; CHANGELOG; `example/full-config.ts` and `npm run docs:fix`; a MINOR bump

## Out of scope

- Summary previews or titles, deleting from the client, server-held paging state, an operator view of another user's list, and live sync between tabs (all named out of scope in #144)
- An in-band switch frame: a client opens a listed conversation with the existing `?sessionId=` reconnect