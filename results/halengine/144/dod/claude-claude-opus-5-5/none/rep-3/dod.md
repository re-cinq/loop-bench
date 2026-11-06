# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createServer` over a real socket and `validateMessage` are the seams. Today `list_conversations` is an unknown type answered `INVALID_MESSAGE`, so every test drives the real entry point and fails on missing behaviour. The store's arguments are observed through a real `InMemorySessionStore` wrapped to record `listFor` calls. The tests pass `history` through a `Partial<HalServerOptions> & Record<string, unknown>` spread so they compile before the option exists.

## Done when these pass

- [ ] **accepts list_conversations with an optional limit of 1-200 and a full cursor, and names the field it refuses** — the validator accepts the bare frame and a full `{updatedAt, sessionId}` cursor. It refuses `limit` 0, 201, 1.5 and `'10'`, a `before` that is not a date and a half cursor, with an error naming the field.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the connection's own user, newest first in ISO strings, whatever user id the frame carries, and pages as sent** — with `history: {enabled: true}`, a frame carrying `userId: 'u2'` gets u1's list, newest first, with ISO times and no `stream_end`. The connection's own fresh conversation is listed too. `listFor` is recorded with `'u1'` and `{limit, before}` exactly as the frame sent them.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses with one error and no list, socket left open: UNSUPPORTED when off or unable to list, SERVER_ERROR when the store fails** — each of these gets one `UNSUPPORTED`: history absent, a store with no `listFor`, and a Mongo store on a collection with no `find` (the `StoreCannotList` path). A rejecting `listFor` gets one `SERVER_ERROR` with no store detail, logged with the session id. In every case the socket still answers a ping.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list sent while the session's turn is still streaming before that turn's stream_end** — the request does not wait on `PerSessionLock`.
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **reopens a conversation picked from the list through the existing ?sessionId= resume, replay included** — the row's id resumes through the #45 path with `resumed: true` and its two entries replayed.
  `src/transport/conversationList.acceptance.test.ts`

Run: `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/transport/conversationList.acceptance.test.ts --coverage=false`

## Facets

- [ ] `messages.ts`: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary`, added only; `ErrorCodes.UNSUPPORTED` added
- [ ] `validation.ts`: the `list_conversations` case (limit 1–200 integer, full cursor with a parseable `updatedAt`)
- [ ] `createServer` / `HalEngineConfig.transport.history` threaded like `resume`; `createMessageHandler` takes the store and options
- [ ] handler answers `list_conversations` off the lock with `ws.userId`, summaries serialised to ISO strings
- [ ] refusals: history off or no `listFor` → `UNSUPPORTED`; exported `StoreCannotList` thrown by `MongoSessionStore` without `find` → `UNSUPPORTED`; other rejection → `SERVER_ERROR`, logged with the session id
- [ ] startup warning when `history` is on without `resume`
- [ ] Reviewed rather than tested: the GDPR retention note on the new options type (pointing at #41), the conversation-list spec extension, `example/full-config.ts` + `npm run docs:fix`, CHANGELOG `## [Unreleased]`, a MINOR bump, `ConnectedMessage` untouched, and a compile fixture for pre-existing message literals

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's list, live sync between tabs (#124)
- Any push of `conversation_list`; it is only ever an answer