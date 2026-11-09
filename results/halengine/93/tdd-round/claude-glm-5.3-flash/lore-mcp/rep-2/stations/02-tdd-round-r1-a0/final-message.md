Done. Summary of this round:

**Round type: CI-repair.** The round brief named two eslint findings on `f72a4c9`; both are fixed, nothing else touched.

**What I fixed:**
1. **`require-spec-link` on `chatOrchestratorUsage.acceptance.test.ts:67`** — the acceptance test `counts reported rounds while leaving a turn with no reported usage undefined` had no spec statement citing it. Added that statement to `specs/hal-engine-config-hooks/spec.md` with the trailing `([validated by: …](…#L67))` link (the test file itself is untouched, so its span is stable).
2. **`max-expects` on `orchestratorHelpers.test.ts:29`** — split the two-assertion `turnUsage` test into `totals the rounds that reported usage` and `stays undefined when no round reported`, one assertion each, and split the spec statement that cited the old combined title into two statements citing `#L29` and `#L39`.

**Verification:** ran only the test file I edited — `npx jest --runTestsByPath src/orchestration/orchestratorHelpers.test.ts` (needs `NODE_OPTIONS=--experimental-vm-modules`, as the suite is ESM): 6/6 green. The acceptance tests were not run here; the last CI verdict failed **only** eslint, so the jest suite covering them was already green, and I ticked both "Done when these pass" boxes in `.lore/dod.md` plus a new facet for this traceability repair. Prettier reports both changed files unchanged; link anchors hand-verified (29/39/67) and `check:spec-links` reports 0 misplaced over the spec's 16 statements. Note: `scripts/spec-links/reanchor.mjs` does not exist in this repo — `scripts/check-spec-links.mjs` is its counterpart here.

**Red tests:** 0 mine, 0 regressions — CI named lint errors, not test failures. Branch pushed (`e00c932`), merged with `origin/main` (already up to date), `git status` shows it in sync with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"traceability repair: spec link for the gap-counting acceptance test and the max-expects split of the turnUsage test","tdd_next":"acceptance green"}}