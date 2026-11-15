# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` over a real socket and `validateMessage` are the seams; today `list_conversations` is an unknown frame type, answered `INVALID_MESSAGE`, so every test fails on the missing behaviour. The tests pass `history` to `createServer` through an options value, not a literal, so they compile before the option's type exists.

## Done when these pass

- [ ] **validates list_conversations bare, and refuses a bad limit or before naming the field** — `limit` must be an integer from 1 to 200; `before` must be a whole `{updatedAt, sessionId}` cursor with a parseable date
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connection's own user's list, newest first in ISO strings, whatever user id the frame carries** — exactly one `conversation_list`, no `stream_end`; `listFor` is called with `ws.userId` and `{limit, before}` as sent
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses with one UNSUPPORTED error and no list when history is off or the store cannot list, and SERVER_ERROR when listing fails** — no store detail is sent to the client, the socket stays open, and the failure is logged with the session id
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list sent mid-stream before that turn's stream_end, off the session lock**
  `src/transport/conversationList.acceptance.test.ts`
- [ ] **rejoins a conversation picked from the list through the existing ?sessionId= resume, replay included**
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `messages.ts`: add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary` and `ConversationListMessage` plus their two union members, changing no existing line; add `ErrorCodes.UNSUPPORTED`
- [ ] `validation.ts`: add a `list_conversations` case (validator test goes green)
- [ ] `createMessageHandler(orchestrator, {sessionStore, history})`: answer the frame off the lock beside `ping`, using `ws.userId` and serialising dates to ISO strings
- [ ] Refusals: `UNSUPPORTED` when history is off or the store has no `listFor`; `SERVER_ERROR` plus a log line with the session id when `listFor` rejects
- [ ] `StoreCannotList` exported and answered `UNSUPPORTED` (amendment 3; no acceptance test pins it yet, so add a unit test with it)
- [ ] `HalEngineConfig.transport.history` threaded through `createServer`; warn at startup when history is on and resume is off
- [ ] Mirror `SessionResumeOptions`' retention note (#41) on the history options type
- [ ] Add § 5.9 `conversation_list` field table to the protocol spec; update the conversation-list spec, `example/full-config.ts` plus `npm run docs:fix`, and `CHANGELOG.md` under `[Unreleased]`; the version bump is MINOR

## Out of scope

- Previews or titles on the summaries
- Deleting a conversation from the client
- Server-side paging state
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- Any unsolicited `conversation_list` push