# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seam already exists: `store.listFor` shipped in #143, and `createServer`
over a real socket is the entry point a client actually hits, which is how `sessionResume.test.ts`
already tests resume. Every test below starts a real engine on an ephemeral port, connects a real
`ws` client, and fails on behaviour today: `list_conversations` is answered `INVALID_MESSAGE` as an
unknown type, and no `conversation_list` frame exists.

## Done when these pass

All in `src/transport/conversationList.acceptance.test.ts`. Each test names the spec statement the
implementing round adds for it — the two frames go into
`specs/hal-engine-websocket-protocol/spec.md` (§ 4 Client-to-Server Messages, § 5 Server-to-Client
Messages, plus the authorisation rule and the `UNSUPPORTED` row in § 5.6's code table), and the
transport-facing statements into `specs/hal-engine-conversation-list/spec.md`.

- [ ] **answers a list_conversations frame with the user conversations newest first, own row
      included, and no stream_end** — with `history: {enabled: true}` and a store holding three
      conversations, exactly one `conversation_list` carries the user's summaries newest first, the
      connection's own (empty) row first — the ticket's amendment says it is listed like any other —
      each `createdAt`/`updatedAt` an ISO string, each row carrying only the four summary fields, no
      conversation content anywhere on the wire, and no `stream_end`; then a row id reopened with
      `?sessionId=<id>` returns `resumed: true` and that conversation's replay, exercising the
      existing #45 path with no new transport code
- [ ] **lists the connecting user even when the frame names another, asking the store for the
      connection userId** — a frame carrying `userId: 'u2'` on a `u1` connection is answered with
      u1's own list, and the recorded `listFor` argument is `ws.userId` (`u1`), asserted on the
      recorded call, not only on the frame
- [ ] **hands limit and before to the store as the frame sent them and pages from the cursor it
      carried** — `listFor` is recorded called with `('u1', {limit: 2, before})`, `before` the
      `{updatedAt, sessionId}` cursor of ISO strings the frame sent (amended: not a `Date`), and the
      answered page is really the rows older than the cursor
- [ ] **answers UNSUPPORTED and never a list when history is off, the store cannot list, or the
      store raises StoreCannotList** — three setups, one answer: history absent, store without
      `listFor`, store throwing the exported `StoreCannotList` (new public surface, asserted to
      exist on `src/index.ts`) — each answered with one `error` frame coded `UNSUPPORTED` and no
      `conversation_list`; this also pins the decision that `validateMessage` stays config-free,
      since a validator-level refusal would read `INVALID_MESSAGE`
- [ ] **answers a rejecting store with SERVER_ERROR and no store detail, keeps the socket open, and
      logs the session id alone** — a rejecting `listFor` is answered with exactly one `error` frame
      coded `SERVER_ERROR` whose message carries no store detail and no conversation content, the
      same socket still answers a later `ping`, and exactly one error log line carries the session id
      with no detail or user content
- [ ] **accepts a bare list_conversations frame at the validator and refuses a bad limit or a
      one-half cursor, naming the field** — the bare frame and a full `limit`/`before` frame are
      valid; `limit: 0`, `201`, `1.5`, `'10'`, a non-cursor `before`, and each one-half cursor are
      invalid with the field named in the error
- [ ] **answers a list request while a user_message streams on the session, before that turn
      stream_end** — the answer arrives while a held turn is still open, so a history request is
      answered off the per-session lock, like `ping`

Run with:
`node --experimental-vm-modules node_modules/jest/bin/jest.js src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`: additive only — four interfaces (`ListConversationsMessage`,
      `ConversationListMessage`, `ConversationSummary` = `SessionSummary` with ISO-string times,
      `ConversationCursor` = the two-part payload type) and their two union members; no existing line
      touched, and the fixture pinning pre-change message literals still compiles
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — integer `limit` 1–200,
      two-part ISO-string cursor, `INVALID_MESSAGE` otherwise; no config in the validator
- [ ] `src/types/session.ts` gains `ErrorCodes.UNSUPPORTED`; `StoreCannotList` is added and exported
      from the public API (`src/index.ts`)
- [ ] `src/config.ts` gains `transport.history?: {enabled: boolean}` (default off, retention note
      mirrored from `SessionResumeOptions`, pointing at #41), threaded through `createServer`'s
      options like `resume`; with history on and resume off the engine warns at startup, it does not
      refuse
- [ ] `src/transport/ws/messageHandler.ts` answers `list_conversations` on the non-locked path
      beside `ping`, taking the session store and options beside the orchestrator; `sender.ts` (or
      `sendJson`) writes `conversation_list`; user id from `ws.userId`, never the frame
- [ ] Specs: extend the websocket-protocol spec and the conversation-list spec, citing the tests
      above in the repo's `([validated by: ...](...#Lnn))` form (until then `re-lint/require-spec-link`
      fails lint on this new file — that red build is expected); run
      `node scripts/repoint-spec-anchors.mjs` after the citations land; do not edit any `| Status |`
      row by hand
- [ ] Docs and release: `docs/getting-started.md` § Conversation list made by editing
      `example/full-config.ts` and running `npm run docs:fix`; `CHANGELOG.md` entry under
      `## [Unreleased]`; MINOR version bump (new optional config, two additive frames, one new error
      code, one new exported error class); `npm run verify` green with the coverage floors held
- [ ] Leave `ConnectedMessage` untouched: `sessionResume.test.ts` pins its shape, and the connected
      frames in this file are observed as connected before, so the existing tests staying green is
      the proof

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client — an erasure primitive on the wire needs its own
  authorisation decision
- Server-side paging state — the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124)
- Teaching `MongoSessionStore` to throw `StoreCannotList` from `listFor` — the handler contract is
  pinned here; the store-side change rides the same round but its own tests live in the mongo suite