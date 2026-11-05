This round repaired the CI findings I could see and added no new facet. The handler for `list_sessions` is still not written. I pushed the commit and the branch is not ahead of its upstream. The only test I ran was `validation.test.ts`, which passes (13 tests).

The CI brief was truncated, so I fixed only what it showed:
- **eslint:** I split the two-`expect` validator test into two tests. I also rewrote the helpers in `sessionResume.test.ts` (`eventually`, the `afterEach` teardown and `delegatingTo`), so they no longer duplicate the acceptance file.
- **spec-names:** I repointed the stale line citations with `check-spec-anchor-names.mjs --fix`. The check now reports all 795 citations matching their tests.
- **changelog:** I added an entry under `[Unreleased]` for the `list_sessions` and `session_list` frames.

**Left for CI:**
- The `test` failure should be the acceptance tests, which stay red until the handler exists.
- I can't confirm eslint is clean. Two findings point at the acceptance file itself (`prefer-early-return` at line 67, and duplicate code against `sessionResume.test.ts`), which I can't edit. I rewrote the `sessionResume.test.ts` side, so the duplicate-code finding may now be gone.
- The changelog entry describes behaviour the handler hasn't implemented yet.

**Red tests:** 0 of mine and 0 regressions that I know of; CI hasn't run on this push.

**Spec drift, left alone:** `.lore/dod.md` and the acceptance tests use `list_sessions`, `session_list`, `ListSessionsMessage` and a non-negative `limit`. The ticket says `list_conversations`, `conversation_list`, a 1–200 `limit`, a `history` opt-in flag and an `UNSUPPORTED` error code. I followed `dod.md` and did not reconcile the two.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI findings (validator test split, resume test dedup, spec citations, changelog)","tdd_next":"add SessionSummaryFrame/SessionListMessage types, thread sessionStore into createMessageHandler/createServer, handle list_sessions in messageHandler"}}