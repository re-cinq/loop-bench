# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` over a real socket (`startEngineWith` in `src/transport/wsTestSupport.ts`) and `validateMessage` are the seams; today `list_conversations` is refused as `Unknown message type`, so every test fails on behaviour. `transport.history` is passed by spread so the suite compiles against today's `HalServerOptions`.

## Done when these pass

- [ ] **answers list_conversations with exactly one conversation_list of the connected user's own conversations, newest first, as ISO strings, paged as the frame asked, even when the frame names another user** — three summaries, no `stream_end`, `listFor` recorded with `ws.userId` and `{limit: undefined, before: undefined}`, then `{limit, before: {updatedAt, sessionId}}` reaching `listFor` untouched
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED with history absent, with no listFor, or with a collection that cannot list, and SERVER_ERROR with no store detail for a store that fails, keeping the socket open and logging the session id** — an error, never an empty list; the `StoreCannotList` amendment via a real `MongoSessionStore` over a find-less collection
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations while a user_message is still streaming, before that turn's stream_end** — off the per-session lock
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **resumes a conversation picked from the list when the client reconnects with its id** — the existing #45 resume path, end to end
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts one with no fields, a whole-number limit of 1 to 200 or a before cursor of a parseable time and a session id, and refuses any other limit or before naming the field** — `validateMessage`
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary`, additive only; `ErrorCodes.UNSUPPORTED`
- [ ] `validation.ts`: a `list_conversations` case (validator tests green)
- [ ] `HalEngineConfig.transport.history` threaded through `createServer` into `createMessageHandler` beside the store
- [ ] handler answers `list_conversations` off the lock from `ws.userId`, serialising the dates as ISO strings
- [ ] `UNSUPPORTED` for history off, no `listFor`, and the exported `StoreCannotList` (thrown by `MongoSessionStore` on a find-less collection); `SERVER_ERROR` with a session-id log otherwise
- [ ] startup warning for `history` without `resume`
- [ ] GDPR prose in the protocol spec, the retention note on the options type, `CHANGELOG.md`, `example/full-config.ts` plus `npm run docs:fix`, a MINOR bump

## Out of scope

- A preview or title on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's list, live sync between tabs (all named out of scope by the ticket)
- Type-level criteria (`messages.ts` diff touching no existing line, `ConnectedMessage` unchanged): proven by CI's build and review, not by a runtime test