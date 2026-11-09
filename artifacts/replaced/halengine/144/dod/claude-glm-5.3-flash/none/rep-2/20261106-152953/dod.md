# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client**
> anything: the browser holding the socket cannot reach the store, so every
> consumer that wants a history sidebar has to stand up its own authenticated
> HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — the seam exists. `createServer` already authenticates
the user on the upgrade and hands every inbound frame to
`createMessageHandler`, so each test opens a real socket against a real engine
(real store, real upgrade, no doubles) and fails today on the missing answer:
`list_conversations` comes back as `error INVALID_MESSAGE` ("Unknown message
type") where the `conversation_list` or the `UNSUPPORTED` refusal is owed. The
one piece with no server-side seam to reach through — the validator — is tested
at its own real entry point, `validateMessage`.

## Done when these pass

- [ ] **answers a list_conversations frame with the connecting user's
      conversations, newest first, times as ISO strings** — one `conversation_list`
      carrying the store's three summaries as it holds them, both times ISO strings,
      no `stream_end`; the store was asked for the connection's user with no paging
      options (criteria 3 and 5's "same call")
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **hands the store the limit and the before cursor the frame sent, and
      answers the page older than it** — `listFor` called with
      `{limit, before: {updatedAt, sessionId}}` of ISO strings, verbatim; the page
      comes back through the real store (criterion 5, as amended)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers a frame naming another user with the connection's own list,
      asking the store for the socket's user** — a frame carrying
      `userId: 'u2'` is answered with u1's own three conversations, and the recorded
      `listFor` argument is the socket's `u1`, not the frame's (criterion 4)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers UNSUPPORTED, and never a list, when the feature is off or the
      store cannot answer one** — history absent, and a conforming store with no
      `listFor`, each get exactly one `error` frame coded `UNSUPPORTED` and no
      `conversation_list` (criteria 6 and 7)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when the store refuses to list, as one built on a
      collection without find does** — `MongoSessionStore` over a collection with no
      `find`, which is where the new exported `StoreCannotList` must be thrown for
      this to read as the misconfiguration it is (criterion 8's amendment)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers SERVER_ERROR without store detail, keeps the socket open and
      logs the session id, when the store fails** — a rejecting `listFor` yields one
      `error` frame coded `SERVER_ERROR` carrying none of the store's detail, the
      socket still answers a `ping` afterwards, some error log line carries the
      session id, and no log line carries conversation content (criterion 8)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers a list request while a turn is streaming, without waiting on the
      turn** — the `conversation_list` frame arrives between the running answer's
      delta and its commit, before that turn's `stream_end` (criterion 9)
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **accepts the frame with its paging fields, and refuses a limit or before
      that breaks the rules, naming the field** — bare frame, `limit: 1`, `limit:
200` and a two-half cursor are valid; `limit: 0`, `201`, `1.5`, `'10'`,
      `before: 'not a date'` and each half of a cursor alone are invalid with the
      field named (criterion 2; the frame is accepted whether or not the feature is
      on, because validation is static)
      `src/transport/conversationHistory.acceptance.test.ts`

Every red bar today is the ticket's own absence: `error INVALID_MESSAGE` where
the list or the refusal is owed, and "Unknown message type: list_conversations"
at the validator.

Criteria pinned without a new test, and why:

- **Criterion 1 (additive only, existing literals still compile)** — CI's
  typecheck judges the diff of `src/types/messages.ts`; a fixture test would pin
  prose, not behaviour.
- **Criterion 11 (`ConnectedMessage` unchanged)** — its existing field-level
  suites in `src/transport/sessionResume.test.ts` and
  `src/transport/ws/connectionHandler.test.ts` stay green unedited.
- **Criterion 10, the resume round trip** — taking an id
  from a `conversation_list` and reconnecting with `?sessionId=` is #45's
  existing path, already pinned end to end by
  `src/transport/sessionResume.test.ts` ("rejoins the session a connect names",
  replay included); it needs no new transport code, so no new test.

## Facets

- [ ] Red (this commit): the file above, eight failing tests, each failing on
      the absent answer.
- [ ] `src/types/messages.ts`: `ListConversationsMessage`,
      `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` — the
      four interfaces and their two union members, additive only, no existing line
      touched.
- [ ] `src/transport/ws/validation.ts`: the `list_conversations` case — limit an
      integer 1–200; `before` a `{updatedAt, sessionId}` cursor of ISO strings, both
      halves required; errors name the field.
- [ ] `src/types/session.ts`: `ErrorCodes.UNSUPPORTED`, additive; the new
      exported `StoreCannotList` beside the store port, thrown by
      `MongoSessionStore` where it now throws a plain `Error` for a collection with
      no `find` (its existing test in
      `src/infrastructure/stores/mongo/mongoConversationList.test.ts` asserts the
      old message and will need the new name).
- [ ] `src/transport/ws/messageHandler.ts`: `createMessageHandler` takes the
      session store and the history option beside the orchestrator;
      `src/transport/createServer.ts` threads `history` through its options like
      `resume`, and `src/config.ts` gains `transport.history`.
- [ ] The non-locked answer path: summaries with both times as ISO strings,
      `{limit, before}` passed through as sent, the user id taken from `ws.userId`
      and never from the frame, no push and no `stream_end`.
- [ ] Failure paths: history off → `UNSUPPORTED`; no `listFor` → `UNSUPPORTED`;
      `StoreCannotList` → `UNSUPPORTED`; a rejecting `listFor` → `SERVER_ERROR`,
      socket open, logged with the session id and no user content.
- [ ] Specs: extend `specs/hal-engine-websocket-protocol/spec.md` (the two
      frames, their field tables, the authorisation rule) and
      `specs/hal-engine-conversation-list/spec.md`; the statements these tests
      validate do not exist yet, so they carry no citation from this pod — cite
      these tests in the repo's trailing `([validated by: ...](...#Lnn))` form, then
      run `npm run spec:names:fix` to settle the line numbers (this repo has no
      `reanchor.mjs`), and let `npm run check:spec-links` and
      `npm run check:spec-status` judge the `Status` rows.
- [ ] Docs and release: `example/full-config.ts` + `npm run docs:fix` for the §
      Conversation list block (never hand-edit the markdown), `CHANGELOG.md` under
      `## [Unreleased]`, MINOR version bump, `transport.history` documented as
      default-off and auditable apart from `resume`.

## Out of scope

- A preview or title on the summaries; deleting a conversation from the client;
  paging state held server-side; an operator view of another user's
  conversations; live sync between open tabs (#124).
- A `conversation_list` pushed without a request; any in-band session-switch
  frame — picking a conversation is `?sessionId=` and #45's replay.
- The warning at startup when `transport.history` is on without
  `transport.resume`: the ticket owes it, but it is a log line on the config
  path, not protocol behaviour — cover it in the config round with the docs
  change, not in this file's contract.