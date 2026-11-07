# Definition of Done

> The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — `createServer` over a real socket is the seam: every test starts a real engine on an ephemeral port with a real `InMemorySessionStore` (a recording or failing subclass where the argument or a failure must be observed) and talks the wire protocol, so nothing new is imported. `history` is passed through a non-literal options object so the test fails on behaviour today rather than on ts-jest's excess-property check.

## Done when these pass

- [ ] **answers the connection's own user's conversations newest first, whatever user the frame names, and each one reopens** — one `conversation_list`, three summaries newest first with ISO times, no `stream_end`; a frame carrying `userId: 'u2'` still gets u1's list and `listFor` is called with `'u1'`; reconnecting with `?sessionId=<row>` answers `resumed: true` and a replay
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **hands limit and before to listFor as the frame sent them, and refuses an unusable one by naming the field** — `{limit: 2, before: {updatedAt, sessionId}}` reaches `listFor` verbatim; `limit` 0, 201, 1.5, `'10'` and `before: 'not a date'` are each `INVALID_MESSAGE` naming the field
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses with UNSUPPORTED, and never an empty list, when history is off or the store cannot list**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a failing store with SERVER_ERROR carrying no store detail, logs the session, and keeps the socket open**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers while a turn is still streaming on the same session, before that turn's stream_end**
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` as new union members only; `ErrorCodes.UNSUPPORTED`
- [ ] `validation.ts`: `list_conversations` case (limit integer 1–200, `before` a `{updatedAt, sessionId}` cursor whose `updatedAt` `Date.parse` accepts; a lone string or half a cursor refused)
- [ ] `createMessageHandler(orchestrator, sessionStore, history)` answers `list_conversations` off the lock beside `ping`, user id from `ws.userId`
- [ ] `HalEngineConfig.transport.history?: {enabled: boolean}` threaded through `createServer` like `resume`; startup warning when history is on and resume off
- [ ] `UNSUPPORTED` for history off and for a store without `listFor`; `SERVER_ERROR` plus a session-id log line for a rejecting `listFor`; exported `StoreCannotList` mapped to `UNSUPPORTED` (add a test for it once the export exists)
- [ ] Spec § 4.3 (statements already cited) gains the field tables, § 5 the `conversation_list` frame, the GDPR paragraph; retention note on the new options type pointing at #41
- [ ] `example/full-config.ts` + `npm run docs:fix` for § Conversation list in `docs/getting-started.md`; `CHANGELOG.md` under `## [Unreleased]`; MINOR bump

## Out of scope

- Previews or titles on summaries, deleting a conversation from the client, server-side paging state, an operator view of another user's list, live sync between tabs (#124)
- Any in-band "switch conversation" frame: picking a row is the existing #45 resume path
- Changes to `ConnectedMessage`