# Definition of Done

> #143 gives a consumer `store.listFor(userId)`. It does not give a **client** anything: the browser
> holding the socket cannot reach the store, so every consumer that wants a history sidebar has to
> stand up its own authenticated HTTP route over the same data the engine already authenticated on
> the upgrade.

**Strategy: `direct`** — the seam is the engine's real entry point: `createServer` upgraded by a real
`ws` client, and the pure `validateMessage`. Both exist today, so every test below drives the real
path and fails on the absent behaviour (today a `list_conversations` frame is answered
`INVALID_MESSAGE`, the store's `listFor` is never called). One wrinkle: `history` is not yet a field
of `HalServerOptions`, so the suite hands it to `createServer` through the spread of a plain object
(`...wired` in `startEngine`) instead of an options literal — a literal would be a type error and the
tests would fail on a compile error instead of on the missing behaviour. No doubles stand in for the
server; the only test doubles are the stores a consumer could write (a recording `listFor`, one
lacking `listFor`, one that rejects).

The red bar is CI's to show as much as ours: the acceptance tests were run here and are red (7/7),
and the CI job that re-runs them on every push is the **Test (with coverage floor)** step
(`npm run test:coverage`) of the **Verify** job in `.github/workflows/ci.yml`.

## Done when these pass

- [ ] **answers list_conversations with exactly one conversation_list carrying the conversations of the connecting user, newest first, times as ISO strings, and no stream_end** — the happy path over a real socket: one frame, store order, ISO times, no `stream_end`
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **asks the store for the user on the socket with the paging fields the frame sent, never for a userId the frame names** — the authorisation rule: `listFor` called with `ws.userId` (recorded argument), the frame's `userId` ignored, `limit`/`before` passed through as the ISO-string cursor
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **accepts the frame whatever history is set to, refusing a bad limit or a partial cursor with a message naming the field** — `validateMessage` knows the frame with no config; `limit` 0/201/1.5/'10' and a one-half or unusable cursor are refused naming the field
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history that cannot be honoured with one UNSUPPORTED error and no list, with the feature off or a store without listFor** — the opt-in and the not-an-empty-list decision, one error frame each
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations sent during a streaming turn before that turn ends in stream_end** — answered off the per-session lock, beside `ping`
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a listFor that rejects with one SERVER_ERROR naming no store detail, keeps the socket open, and logs the failure with the session id** — the failure path, including the log's session id and its silence about the store's detail
    `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists the conversation the connection is in among the rows, and answers a reconnect naming a row id with resumed and the replay** — the whole sidebar journey: own row in the list, pick a row, `?sessionId=<id>` answers `resumed: true` and the replay through the existing resume path
    `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] `src/types/messages.ts`, additive only: `ListConversationsMessage`, `ConversationListMessage`, `ConversationCursor`, `ConversationSummary` (four interfaces, per the amendment) and their two union members; no existing line changes
- [ ] The compile fixture the ticket owes — a typed literal per existing message still assigning to `IncomingMessage`/`OutgoingMessage` — is a green-today regression guard, not a red acceptance test; the build round adds it beside the round's own tests (the `git diff`-touches-no-existing-line clause is judged on the diff, as is `ConnectedMessage` unchanged)
- [ ] `validation.ts` gains the `list_conversations` case to make the second test green
- [ ] `createMessageHandler` takes the session store and the history options; `createServer` threads them and answers `list_conversations` off the lock
- [ ] `ErrorCodes.UNSUPPORTED` plus the exported `StoreCannotList` (a store throwing it is answered `UNSUPPORTED`, per the amendment — that case is the build round's own test, since the acceptance suite cannot import an export that does not exist without failing for the wrong reason)
- [ ] `HalEngineConfig.transport.history` threaded through `createHalEngine`, plus the startup warning when `history` is on without `resume`
- [ ] Both specs carry the new statements with the citations above (`spec:names`, `check:spec-links`, `check:spec-status` and `repoint-spec-anchors --check origin/main` are green on this branch)
- [ ] GDPR prose in the protocol spec (metadata only, id from the connection, `transport.history` the deployer's decision, retention note pointing at #41) — the testable halves are the second and first tests; the retention-note-on-the-options-type half is a doc-comment claim, left uncited
- [ ] `CHANGELOG.md` under `## [Unreleased]`; `docs/getting-started.md` via `example/full-config.ts` + `npm run docs:fix`; MINOR version bump — all gated by the existing CI steps (Changelog entry, Documented code blocks, check:version), not by new tests
- [ ] `npm run verify` passes and coverage floors hold or rise — CI judges this

## Out of scope

- A preview or title on the summaries (its own issue)
- Deleting a conversation from the client, which would put an erasure primitive on the wire
- Paging state held server-side; the client pages with `before`
- An operator view of another user's conversations
- Live sync between open tabs (#124 ruled it out)