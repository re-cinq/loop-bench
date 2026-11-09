# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade. That is a second authorisation path to the same personal data, written once per
> consumer, each one able to get the ownership check wrong in its own way.

**Strategy: `direct`** — the seam already exists: `createServer` upgrades a real socket today and
`createMessageHandler` answers its frames, so every test below calls the real entry point and fails
on behaviour. A `list_conversations` frame sent today is answered `error INVALID_MESSAGE`, which is
exactly the behaviour being absent — no replacement module and no characterization bar is owed.

## Done when these pass

- [ ] **accepts a list_conversations frame and refuses a bad limit or cursor naming the field** —
      `validateMessage` admits the frame; `limit` an integer 1–200, `before` a `{updatedAt,
      sessionId}` cursor of ISO strings, either half missing refused with the field named (criteria
      bullet 2 and amendment 1)
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the user's newest conversations first, as ISO rows, and its picked id rejoins on
      ?sessionId=** — with `history: {enabled: true}`, one `conversation_list`, newest first, each
      `createdAt`/`updatedAt` an ISO string, the connection's own conversation listed first with no
      entries, and no `stream_end`; then a row id reconnects through the existing #45 resume path
      (criteria bullets 3, 10, and the amendment that lists the current conversation like any other)
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the connection's own list and asks the store for the connection's user, never
      the frame's** — a frame carrying another user's `userId` is answered with the connecting
      user's rows, and the recorded `listFor` argument is `ws.userId` with the frame's `limit` and
      `before` passed through (criteria bullets 4, 5)
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, never an empty list, when history is off, the store cannot list, or it
      throws StoreCannotList** — three engines: `history` absent, a store with no `listFor`, a store
      throwing the new exported `StoreCannotList`; each answered with one `error` frame of code
      `UNSUPPORTED` and no list (criteria bullets 6, 7, amendment 3)
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers SERVER_ERROR without store detail, keeps the socket open and logs the session id
      when the store fails** — a `listFor` that rejects is one `error` frame of code `SERVER_ERROR`
      whose message names no store, the socket then answers a `ping`, and an error line carrying the
      session id and no store detail is logged (criterion bullet 8)
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request made mid-turn before that turn's stream_end, without waiting on
      the lock** — asked while a `user_message` of the same session is parked mid-stream, the list
      arrives before that turn ends (criterion bullet 9, decision "answered off the per-session
      lock")
    `src/transport/conversationList.acceptance.test.ts`

## Facets

- `src/types/messages.ts`: `ListConversationsMessage`, `ConversationListMessage`,
  `ConversationCursor`, `ConversationSummary` — additive only, two new union members, no existing
  line touched
- `src/transport/ws/validation.ts`: the `list_conversations` case the first test pins
- `src/transport/ws/messageHandler.ts`: take the session store and history options beside the
  orchestrator; answer `list_conversations` on the non-locked path beside `ping`; map
  `StoreCannotList` to `UNSUPPORTED`, a rejecting `listFor` to `SERVER_ERROR` logged with the
  session id and no store detail
- `src/transport/createServer.ts` and `src/config.ts`: thread `history` through the server options
  like `resume`; `HalEngineConfig.transport.history`
- `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`; `src/types/sessionStore.ts`: exported
  `StoreCannotList`, surfaced through `src/index.ts` — the acceptance test reads it off that
  module's namespace, so if it lands elsewhere, repoint the destructure in the UNSUPPORTED test
- Warn at startup when `transport.history` is on without `transport.resume` (the amendment: say so,
  do not refuse to start)
- GDPR: retention note mirrored on the new history options type pointing at #41; the protocol spec
  prose added with this commit stays accurate
- The rest of the ticket's own checklist that no test pins: the `messages.ts` fixture pinning
  pre-existing literals, `CHANGELOG.md` under `## [Unreleased]`, `docs/getting-started.md` §
  Conversation list made in `example/full-config.ts` and regenerated with `npm run docs:fix`, MINOR
  version bump, `npm run verify` green and coverage floors holding or rising

## Notes for the next pod

- The criterion "three summaries" counts the seeded conversations plus the connection's own, which
  the amendment lists like any other: the test seeds two older conversations and expects three rows,
  its own first with `entryCount` 0.
- Error codes are asserted as wire literals (`'UNSUPPORTED'`, `'SERVER_ERROR'`), not via
  `ErrorCodes`, and the new frame types are parsed into a local `Frame` interface, so no test reds
  on a missing export — only the `StoreCannotList` guard throw does, and its message names the
  expected home.
- `npm run spec:names`, `check:spec-links` and `check:spec-status` pass as committed; re-run the
  name fixer on the two touched specs if line numbers shift.

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client, which would put an erasure primitive on the wire
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled it out)
- A REST route for the list, and an in-band conversation-switch frame