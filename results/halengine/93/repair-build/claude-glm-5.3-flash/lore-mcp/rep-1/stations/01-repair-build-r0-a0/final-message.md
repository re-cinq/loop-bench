Done. The red build was an eslint-only failure, and the fix is pushed.

**What CI reported** (on `19eaa4df`, which was still the branch head — nothing had moved): 4 errors in `src/orchestration/orchestratorHelpers.test.ts`:
- `re-lint/require-spec-link` on the three `accumulateUsage` tests (lines 29, 35, 41) — no spec citation
- `re-lint/max-expects` on line 35 — one test carrying two `expect` calls

The trace graph had no prior failures on this file, so no earlier fix to crib from.

**What I changed:**
1. `src/orchestration/orchestratorHelpers.test.ts` — split "returns the defined side when one operand is undefined" into two single-expect tests (earlier operand undefined / later operand undefined). The `it(` lines now sit at 29, 35, 40, 45.
2. `specs/hal-engine-architecture/spec.md` — added two statements to the "Across rounds" section (the section that already cites this file's tool-loop tests) linking all four tests with `validated by` pointers at those exact lines, covering the sum, the defined-side-preservation on either side, and the both-undefined case. The spec's `In Progress` status is unaffected — it still has plenty of uncited statements, so computed coverage doesn't move.

**Verified locally:** `prettier --write` on the changed test file reported "unchanged", and `npm test -- src/orchestration/orchestratorHelpers.test.ts` passed (8 tests, up from 7 after the split). I did not run eslint, typecheck, or a build in this pod, per the pod limits. Nothing outside the two named files was touched.

**Delivered:** committed as `test(orchestrator): spec-link usage helper tests`, pushed — `origin/loop-bench/93` is at `71db7da` and `git status` reports the branch up to date with its upstream. `git fetch origin main` + merge reported already up to date, so no merge conflict to resolve.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one had 2 expects — split the test and cited all four in specs/hal-engine-architecture/spec.md"}}