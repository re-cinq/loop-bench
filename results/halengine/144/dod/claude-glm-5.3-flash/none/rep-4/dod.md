# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the
> browser holding the socket cannot reach the store, so every consumer that wants a history
> sidebar has to stand up its own authenticated HTTP route over the same data the engine already
> authenticated on the upgrade.

**Strategy: `direct`** — the seam already exists: a real engine (`createServer` / `createHalEngine`)
on a real socket, and `validateMessage` as a plain call. Every test below drives the real entry
point today and fails on the absent behaviour (`Unknown message type: list_conversations`,
`INVALID_MESSAGE` where `UNSUPPORTED` is owed), not on missing plumbing.

## Done when these pass

All in `src/transport/conversationList.acceptance.test.ts`. Twelve are red right now; one is
green by design (the additive pin) and must stay green.

- [ ] **still accepts the frames the protocol already answered, pinned by the messages.ts fixture**
      — every `IncomingMessage`/`OutgoingMessage` literal valid before this ticket still compiles
      and still validates, so the `messages.ts` diff can only ever be additive (green today by
      design: it is the guard, not a red bar)
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts a bare frame, a limit inside 1-200, and a whole cursor** — `validateMessage` takes
      `{type: 'list_conversations'}`, `limit` 1-200, and a `{updatedAt, sessionId}` cursor of ISO
      strings, and forwards them in `data`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a limit outside 1-200 or not an integer, naming the field** — `limit: 0 / 201 /
    1.5 / '10'` are `INVALID_MESSAGE` with a message naming `limit`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a cursor that is not a whole one, naming before** — a string `before`, a cursor
      missing `sessionId`, one missing `updatedAt`, or one carrying no parseable stamp, each
      refused with a message naming `before`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list_conversations frame with the conversations of the authenticated user,
      newest first** — through `createHalEngine` with `transport: {history: {enabled: true}}`: one
      `conversation_list` and nothing else after `connected`, rows ordered newest first, each row
      exactly `{sessionId, createdAt, updatedAt, entryCount}` with the two times as ISO strings,
      the connection's own (empty) conversation listed last like any other, no `stream_end`, and
      `ConnectedMessage` still carrying only its four original fields
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the list of the connecting user alone, even when the frame names another** —
      the regression: a frame carrying `userId: 'u2'` is answered with `ws.userId`'s own list, and
      the recorded `listFor` argument is the connecting user
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **hands the frame limit and cursor to the store the frame sent them** — `listFor` is called
      with `{limit: 2, before: {updatedAt, sessionId}}` exactly as the frame carried them, and a
      bare frame passes both as undefined rather than dropping the call
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED while history is off, and while the store cannot list at all** — one
      `error` frame with code `UNSUPPORTED` and no `conversation_list`, both when `history` is
      absent and when the store satisfies only its five original members while holding a
      conversation
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a rejecting store with a server error that names nothing, the socket kept and the
      session logged** — one `error` frame with code `SERVER_ERROR`, its message carrying no store
      detail, the socket still answering `ping`, and an error-level log line naming the session id
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a store that throws StoreCannotList with UNSUPPORTED, reading it as the
      misconfiguration it is** — the new exported `StoreCannotList` exists and a store throwing it
      is answered `UNSUPPORTED` rather than `SERVER_ERROR`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a list asked mid-turn before that turn sends stream_end, without waiting on the
      lock** — `list_conversations` sent while a `user_message` is held mid-stream is answered
      inside the hold, before that turn's `entry_commit` and `stream_end`
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **carries a client from a conversation_list row to that conversation over the resume path** —
      an id taken from a list row, replayed through `?sessionId=<id>` with `resumed: true` and the
      conversation's entries: the existing #45 path, exercised end to end with no new transport code
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **warns at startup when history is on without resume, and stays quiet when resume is on** —
      the amendment: `transport.history` without `transport.resume` is useless and the engine says
      so at startup
      `src/transport/conversationList.acceptance.test.ts`

Run with:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`
(CI runs the whole suite with floors as the "Test (with coverage floor)" step of the `Verify` job
in `.github/workflows/ci.yml`.)

## Facets

- [ ] `src/types/messages.ts`: add `ListConversationsMessage`, `ConversationListMessage`,
      `ConversationCursor` and `ConversationSummary` (four interfaces, per the amendment), their
      two union members, additive only — the first test is the guard that pins this
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case the three refusal tests pin
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`, additive
- [ ] `src/types/sessionStore.ts`: export `StoreCannotList`
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` takes the session store and the
      history options beside the orchestrator; answer `list_conversations` on the non-locked path
      beside `ping`, reading the user from `ws.userId`; `SERVER_ERROR` without store detail on a
      rejecting `listFor`, `UNSUPPORTED` for `StoreCannotList`, log with the session id
- [ ] `src/transport/createServer.ts` + `src/config.ts`: `history?: {enabled: boolean}` threaded
      through both option types beside `resume`, default off, plus the startup warning when it is
      on without `resume`
- [ ] The client takes an id from a row and reconnects with `?sessionId=<id>`: no new transport
      code — the resume-path test proves the existing path already carries it
- [ ] Specs: extend `specs/hal-engine-websocket-protocol/spec.md` (the two frames, field tables,
      authorisation rule) and `specs/hal-engine-conversation-list/spec.md`. The statements these
      tests validate do not exist yet, so the citations are owed by the round writing them: add
      `([validated by: <test title>](../../src/transport/conversationList.acceptance.test.ts#Lnn))`
      using each test's title as it reads above, then `node scripts/repoint-spec-anchors.mjs` to
      settle the line numbers. No existing statement or citation was touched by this commit.
- [ ] `docs/getting-started.md` via `example/full-config.ts` + `npm run docs:fix` (never hand-edited)
- [ ] `CHANGELOG.md` entry under `## [Unreleased]`, MINOR version bump, PR body says MINOR
- [ ] `grep` of the diff shows no path that answers `conversations: []` (the UNSUPPORTED tests pin
      the behaviour; the grep is review work on the diff itself)
- [ ] `npm run verify` green and the coverage floors hold or rise (CI's `Verify` job)

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire, with its own
  authorisation decision
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled it out)
- `ConnectedMessage` changing in any way (pinned by the happy-path test)