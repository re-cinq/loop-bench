# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade. — "answering 'which conversations do I have' over the same socket is the smaller
> surface."

**Strategy: `direct`** — the seam already exists: `createServer` upgrades a real socket and answers
frames, so each test opens a real client against a real engine and reads the answer off the wire.
Nothing new must be built beside old code; the frames simply do not exist yet, which is exactly why
every test below is red — the engine answers `list_conversations` with `error INVALID_MESSAGE`
today, because no such type is known.

## Done when these pass

All in `src/transport/conversationList.acceptance.test.ts` (run with
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`;
do not add tests to this file — later rounds write their own beside the code):

- [ ] **answers a history request with the conversations its store holds, newest first, as ISO
      strings** — with `history: {enabled: true}`, one `conversation_list` frame and no
      `stream_end`; rows newest-first; both times ISO strings; the connection's own conversation
      listed like any other (`entryCount: 0`); and a second, paged frame whose `limit` and
      `before` reach `listFor` exactly as the frame sent them, `before` the
      `{updatedAt, sessionId}` cursor of ISO strings. Criteria 3 and 5.
- [ ] **answers a frame naming another user with the list of the user the connection
      authenticated** — a frame carrying `userId: 'u2'` on a connection authenticated as `u1` is
      answered with u1's own conversations, and the recorded `listFor` argument is `u1`, not the
      frame's. Criterion 4.
- [ ] **answers a history request it cannot serve with UNSUPPORTED and never with an empty
      list** — with `history` absent, and with `history` on against a store implementing no
      `listFor`, one `error` frame with code `UNSUPPORTED`, no `conversation_list`, no list data on
      the error frame. Criteria 6 and 7.
- [ ] **answers a store failure with a SERVER_ERROR that says nothing of the store, and keeps the
      socket open** — a rejecting `listFor` yields one `error` frame, code `SERVER_ERROR`, message
      carrying neither the store's error text nor any conversation content; a later `ping` is still
      answered (socket open); the failure is logged at error level with the session id. Criterion 8.
- [ ] **answers a history request mid-turn, before the turn it asked during has ended** — the list
      is answered while a `user_message` is still paused mid-stream, before that turn's
      `stream_end`, so it does not queue on `PerSessionLock`. Criterion 9.
- [ ] **rejoins, with its replay, the conversation a list row names on reconnect** — the id taken
      from a `conversation_list` row, reconnected with `?sessionId=<id>`, answers `resumed: true`,
      `entryCount`, the stored replay, and a `connected` frame whose keys are exactly the
      pre-existing set (criterion 11: `ConnectedMessage` unchanged). Criterion 10.
- [ ] **accepts the history frame statically, and refuses an ill-formed limit or cursor naming the
      field** — `{type: 'list_conversations'}`, `limit: 1`, `limit: 200` and a full
      `{updatedAt, sessionId}` cursor validate; `limit: 0`, `201`, `1.5`, `'10'`, a bare-string
      `before` and each half of a cursor alone are refused with a message naming the field; and the
      fixture of pre-existing `user_message`/`ping` literals still validates (the additive-only
      face of criterion 1).

Each test validates a statement in `specs/hal-engine-websocket-protocol/spec.md` (§4.3, §5.9, the
`UNSUPPORTED` row of §5.6, and two security bullets in §12) or in
`specs/hal-engine-conversation-list/spec.md` (§ Over the wire); the statements carry the
`([validated by: ...])` citations, already anchored.

## Facets

- [ ] `src/types/messages.ts`: four new interfaces (`ListConversationsMessage`,
      `ConversationListMessage`, `ConversationSummary`, `ConversationCursor`) and their two union
      members, additive only — the fixture test above pins that nothing pre-existing breaks; a
      `git diff` of the file must touch no existing line.
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case (integer `limit` 1–200;
      `before` an object carrying a parseable `updatedAt` and a `sessionId`; anything else
      `INVALID_MESSAGE` naming the field) — red test: the validator one.
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` takes the session store and the
      `history` option alongside the orchestrator and answers `list_conversations` on the
      non-locked path beside `ping`; the user id from `ws.userId`, never the frame; a store without
      `listFor` answered `UNSUPPORTED`; a rejecting store answered `SERVER_ERROR` with a
      session-scoped, content-free log line — red tests: all five wire ones.
- [ ] `src/transport/createServer.ts` + `src/config.ts`: `history?: {enabled: boolean}` on
      `HalServerOptions` and `HalEngineConfig.transport`, threaded like `resume`, default off. The
      acceptance tests pass `history: {enabled: true}` through a cast on the options object; when
      the option lands on `HalServerOptions`, drop that cast (it is marked with a comment in the
      test's `start` helper).
- [ ] `ErrorCodes.UNSUPPORTED` in `src/types/session.ts`, additive, exported through
      `src/index.ts`.
- [ ] **`StoreCannotList`** (amendment 3): a new exported error class that a store throws to read
      as a permanent misconfiguration; the handler answers it `UNSUPPORTED` rather than
      `SERVER_ERROR`. Not in the acceptance file: the export does not exist yet and importing it
      would fail the whole file's compile, taking every other red bar with it. The implementing
      round pins it in its own test beside the handler.
- [ ] The startup warning: `transport.history` enabled without `transport.resume` logs a warning
      (a list whose rows cannot be opened is a deployment slip).
- [ ] Specs: the §4.3/§5.9 sections, the `UNSUPPORTED` row and the §12 bullets are written and
      cited; extend them (field tables, GDPR retention note wording) rather than rewriting. Status
      rows stay as they are.
- [ ] `docs/getting-started.md` § Conversation list via `example/full-config.ts` +
      `npm run docs:fix` (never hand-edit the markdown block); `CHANGELOG.md` under
      `## [Unreleased]`; MINOR version bump; `npm run verify` green with coverage floors held.

## Out of scope

- A preview or title on the summaries (its own issue); deleting a conversation from the client; paging state held server-side (the client pages with `before`); an operator view of another user's conversations; live sync between open tabs (#124 ruled it out).
- A REST route over the same data — the decision is a frame, not a route.
- The round's own unit tests (`validation.test.ts`, `messageHandler.test.ts`, `createServer.test.ts`): they cover their units as the round works; this file is the ticket's contract.