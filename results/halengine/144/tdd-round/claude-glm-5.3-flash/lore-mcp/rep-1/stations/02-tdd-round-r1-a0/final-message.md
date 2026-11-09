Round complete. Branch `loop-bench/144` at `eafd128`, pushed, merged with origin/main (already up to date), tree clean.

## Round report

**CI findings fixed (all 4 checks' causes):**
- `typecheck` TS2459 — `validation.ts` now imports `SessionCursor` from `types/sessionStore.js`, where it is exported
- `eslint` — the three clone families (teardown/eventually/delegatingTo, malformed-frames fixtures) deduplicated into `src/transport/wsTestSupport.ts`; `validation.ts` flattened to a validator lookup table with early returns
- `test` — the branch's red acceptance tests demand the list behaviour; implemented it (below)
- `changelog` — `CHANGELOG.md` bullet added under Unreleased › Added

**Red → green unit (facets 3+4):** `sessionStore` threaded through `createMessageHandler` into `createServer`; `list_sessions` answered off the per-session lock — `listFor` called with the socket's `session.userId` and `{limit, before}`, rows serialised to ISO strings, empty list for a store without `listFor`, one `SERVER_ERROR` + `ws` log on throw. Facets 1, 3, 4, 5 ticked in `.lore/dod.md`; `session_list` documented as §5.9 in the protocol spec (status rows re-evaluated, unchanged).

**Red tests: mine 3, regressions 0.** The 3 new runtime tests in `messageHandler.test.ts` (own-list answer, no-`listFor`/throwing-store answer, off-lock answer mid-stream) were red then green. `messages.test.ts` is a compile-pin fixture — green on arrival, since ts-jest does not typecheck; CI's `tsc --noEmit` enforces it. Pre-existing suites I touched (validation, sessionResume) stayed green throughout. The 10 rotten spec anchors from my line shifts are repointed; `repoint-spec-anchors.mjs --check origin/main` exits 0 (721 current, 0 stale).

**Tests run:** only this round's four files — 88/88 green. Acceptance tests and full suite never run, per pod rules.

**Smells noticed, not fixed:** `handlePing` hand-rolls `ws.send(JSON.stringify(...))` instead of the `sendJson` helper (`src/transport/ws/messageHandler.ts:371`); `logChunk`'s text-chunk counter threads diagnostics state through the stream loop and reads convoluted (`src/transport/ws/messageHandler.ts:208`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facets 1,3,4,5 of ticket #144 — sessionStore threaded into createMessageHandler/createServer, list_sessions answered off the lock with ISO-string session_list rows, INVALID_MESSAGE naming fields, empty list for a store without listFor, SERVER_ERROR+ws log on throw; both specs document the frames; anchor check exits 0; 88/88 green on the round's files","tdd_next":"run the 3 acceptance tests in src/transport/conversationList.acceptance.test.ts in CI — the behaviour they demand is implemented, so green closes ticket #144"}}