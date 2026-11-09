Branch is in sync with its upstream and up to date with `origin/main`. Done.

## Summary

The red build was the **eslint** check failing on `src/orchestration/orchestratorHelpers.test.ts` — four errors on the `accumulateUsage` tests the previous round added: three `re-lint/require-spec-link` (tests with no spec citation) and one `re-lint/max-expects` (two `expect` calls in one test).

**How the rule works:** `require-spec-link` reads the spec corpus, not the test file — a test is linked when a `specs/**/*.md` statement carries `([validated by: <name>](test.ts#L<line>))` pointing into the test's line span. The sibling `shouldContinueToolLoop` tests pass because `specs/hal-engine-architecture/spec.md:340-343` cites them.

**Fixes (both findings, in one pass):**
- `src/orchestration/orchestratorHelpers.test.ts` — split the two-expect test into one test per operand (`returns the accumulated total when the round that follows reports none`, `starts the total from the first round that reports usage`), preserving both assertions rather than dropping one.
- `specs/hal-engine-architecture/spec.md` — added four statements to the "Across rounds" section citing all four `accumulateUsage` tests at their final lines (29, 35, 40, 45), mirroring the existing citation format exactly.

**Verified locally, scoped to what I changed (no eslint, no build, no typecheck in this pod):**
- Jest on just the edited file: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts` — 8/8 passed
- `node scripts/repoint-spec-anchors.mjs --check origin/main` — exit 0, 0 stale/unresolved/mislabelled
- `node scripts/check-spec-anchor-names.mjs` — 594 citations name their test, exit 0
- `node scripts/check-spec-links.mjs` — 0 misplaced across 1643 statements
- `npx prettier --write` on the changed `.ts` file — already conformant (the `prettier:check` glob covers only `{src,scripts,smoke}/**/*.ts`, so the spec edit is outside it)

Committed as `7222bc9`, pushed, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"accumulateUsage tests had no spec citations and one had two expects — split the test and cited all four from specs/hal-engine-architecture/spec.md"}}