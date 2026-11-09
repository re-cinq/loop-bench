All four eslint findings are fixed, committed, and pushed.

**What CI reported** (eslint on `19eaa4df`, `src/orchestration/orchestratorHelpers.test.ts`):
- 3 × `re-lint/require-spec-link` — the `accumulateUsage` tests at lines 29, 35, 41 cite no spec statement (the previous round's feature work added these tests without spec citations).
- 1 × `re-lint/max-expects` — the test at line 35 asserted two calls in one test.

**The fix** (no prior failures recorded on the file per `lore-query-trace`):
- Split the two-expect test into two single-expect tests: *adopts the next round when nothing is accumulated yet* and *keeps the running total when the next round reports nothing* — same assertions, one per test.
- Added three statements with four citations under "Across rounds" in `specs/hal-engine-architecture/spec.md` (beside the existing `orchestratorHelpers` citations), naming each test and anchoring exactly on its `it(` line (`#L29`, `#L35`, `#L40`, `#L45`).

**What I ran to verify the fix (no linter, no build):** the repo's own lightweight gates that mirror the failing rules — `node scripts/repoint-spec-anchors.mjs --check origin/main` (0 stale, 0 mislabelled), `npm run spec:names` (594 citations name the test they point at, 0 findings — confirms the anchors land on the right declarations), `npm run check:spec-links` (0 misplaced), `npm run check:spec-status` (0 findings — the added statements all carry citations, so the spec's `In Progress` status still matches its coverage tier). Jest on the one edited file: 8 passed. `prettier --check` on it: clean.

Pushed as `1cab798` (`test(orchestrator): cite accumulateUsage tests in spec`); branch is even with `origin/loop-bench/93` and already up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests had no spec citations and one test had 2 expects — split the test and cited all four tests from specs/hal-engine-architecture/spec.md"}}