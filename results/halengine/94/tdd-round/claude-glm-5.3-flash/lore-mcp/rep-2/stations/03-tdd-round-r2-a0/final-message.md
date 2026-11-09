Done. The push landed (`1286ae6` tip, upstream in sync, main merged clean), so CI will judge it.

## Round report

**What CI owed this round** (from the round brief): one eslint error on 3bafdba — `re-lint/callee-below-caller` at `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:19`, `createMockProvider` declared above its caller `createThrowingOrchestrator`.

**What I did:**
- Moved `createMockProvider` below `createThrowingOrchestrator` — exactly the reorder the rule prescribes. Function declarations hoist, so runtime behaviour is identical, and the permutation is line-count-neutral above the `describe` block: the tests still sit at lines 45/52/66, so the spec's `#L45`/`#L52`/`#L66` citations remain anchored (verified, no reanchor needed). Prettier reports the file unchanged.
- All four facets in `.lore/dod.md` were already ticked; appended the repair facet I closed as a fifth, ticked.
- Committed and pushed `a36bf6b` (the fix) and `1286ae6` (dod update); fetched and merged `origin/main` — already up to date, no conflicts.

**Tests:** this round ran no tests here — the only test this ticket owns is the acceptance test, and the Bash hook correctly refuses it locally (CI runs it). Its verdict, plus build/typecheck/eslint/prettier, comes back as the next round's brief. I checked `lore_get_ci_failures` twice over ~7 minutes after the push; the API has not ingested a verdict yet (404), so the green/red read is CI's, not mine.

**Red tests:** 0 mine, 0 regressions — CI's only reported failure was a lint error in this ticket's own test file, not a test failure.

**Unrelated smells:** none noticed this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair eslint finding on 3bafdba (createMockProvider moved below its caller)","tdd_next":"acceptance green"}}