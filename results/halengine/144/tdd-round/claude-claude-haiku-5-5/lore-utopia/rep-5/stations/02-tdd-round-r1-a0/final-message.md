This round closed the "keep well-formed `limit` and `before`" facet, but the CI findings from the last push are mostly still open.

**What I did**
- **Red:** added one unit test in `src/transport/ws/validation.test.ts` that a `list_sessions` frame with `limit: 10` and a `before` cursor keeps both. It failed because the validator dropped them.
- **Green:** `validation.ts` now routes `list_sessions` to a new `validateListSessionsMessage`, which passes `limit` and `before` through. This is deliberately unvalidated; rejecting malformed values is the next facet.
- **Refactor:** nothing beyond the green step; the bar stayed green.
- **Tests run here:** only `src/transport/ws/validation.test.ts` (5 of 5 green). The acceptance tests were not run here; CI judges them.
- Ticked the closed facet in `.lore/dod.md` and split the remaining facet into "keep" (done) and "reject malformed" (next).
- Formatted with prettier, committed and pushed to `loop-bench/144`, and merged `origin/main`. The branch is not ahead of its upstream.

**CI findings from the last push, not addressed this round**
- **eslint:** five findings in `src/transport/conversationList.acceptance.test.ts` (duplicated code, prefer-early-return, a missing spec link at line 163) and one in `src/transport/sessionResume.test.ts`. Fixing them means editing the acceptance test, which I may not do. The duplication also spans the existing `sessionResume.test.ts`, so it needs a decision from whoever owns the tests.
- **test, spec-names, changelog:** I could not read the full failure list. `lore_get_ci_failures` returned 404 for both the branch name and the SHA, and the brief truncates after the eslint section. The changelog gate fails because `src/` changed without `CHANGELOG.md`. I left that for the ticket's final round, because the `list_sessions` entry would describe a frame that does not answer yet. I did not run `spec:names`.

**Discrepancies to resolve**
- The ticket says `list_conversations` / `conversation_list` with `limit` 1–200. The dod, the acceptance tests and the spec use `list_sessions` / `session_list` with a non-negative `limit`. I followed the dod and the acceptance tests.
- The dod allows `updatedAt` as a string or number. The `ConversationCursor` type and the ticket say string. I am planning string-only for the next facet.

**Regressions:** none known. I did not check the graph's `tests_covering` list before editing `validation.ts`, so that is a gap in the process for this round.

Tests were run here for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"keep well-formed limit and before on list_sessions","tdd_next":"reject malformed list_sessions limit or before with INVALID_MESSAGE"}}