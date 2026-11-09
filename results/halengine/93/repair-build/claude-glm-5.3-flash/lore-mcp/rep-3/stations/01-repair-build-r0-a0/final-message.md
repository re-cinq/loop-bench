Done. The branch is green-ready and pushed.

## What CI named and what I did

The red build was **eslint** with 4 errors in `src/orchestration/orchestratorHelpers.test.ts` — three `re-lint/require-spec-link` failures (lines 29, 35, 41: the new `accumulateUsage` unit tests had no spec citations) plus `re-lint/max-expects` at line 35 (two `expect` calls in one test).

**Fixes** (all four, in order):
1. **Spec citations** — added three statements to `specs/hal-engine-config-hooks/spec.md:21-23`, directly under the existing orchestrator-level usage statements, describing the helper semantics they validate: per-field pairwise summation, undefined-operand passthrough, and all-undefined → `undefined`. Anchors point at the `it(` declarations, per AGENTS.md § Spec Test Links.
2. **max-expects** — collapsed the two passthrough expects into a single object assert (`toEqual` over both directions), the shape the lint message itself offers. Splitting the test instead would have shifted line numbers and duplicated fixture lines; this keeps the diff to 7 lines.

**Verified without touching the forbidden tools:**
- `node scripts/check-spec-anchor-names.mjs` — 593 citations name the test they point at (validates my anchor lines)
- `node scripts/check-spec-links.mjs` — 0 misplaced across 1642 statements
- `node scripts/repoint-spec-anchors.mjs --check origin/main` — 0 stale, 0 mislabelled; note it skips the config-hooks spec since this branch authored its new anchors, which is why the names check matters
- `npx prettier --write` on both changed files — both already clean
- The one suite I edited assertions in: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts` — **7 passed**. (My first attempt with bare `npx jest` failed on ESM loading — the repo's runner needs `--experimental-vm-modules`; environment-only, not a finding.)

I did not run eslint, typecheck, or any build, per the pod constraints — CI judges those.

**Delivery:** committed as `test(orchestrator): cite accumulateUsage tests in spec`, pushed to `loop-bench/93`. `origin/main` merged (already up to date, no conflicts), and `git status -sb` confirms the branch is level with its upstream.

Also checked first, per protocol: the branch was still at CI's judged sha `19eaa4d` (no `[skip ci]` commits after it), and `lore-query-trace` reported no prior failures on this test file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec citations and one test held two expects; added spec statements citing each and collapsed to one object assert"}}