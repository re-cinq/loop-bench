CI reported 4 ESLint errors on `src/orchestration/orchestratorHelpers.test.ts`:
1. `re-lint/max-expects`: Test `returns the defined side when one operand is undefined` contained two `expect` calls.
2. `re-lint/require-spec-link`: The three `accumulateUsage` unit tests were not linked from any specification statement.

### Changes
- Updated `src/orchestration/orchestratorHelpers.test.ts` to assert an object structure within a single `expect(...).toEqual(...)` call.
- Added `[validated by: ...]` spec citations in `specs/hal-engine-config-hooks/spec.md` pointing to the `accumulateUsage` unit tests in `src/orchestration/orchestratorHelpers.test.ts`.
- Verified citations and anchors with `node scripts/check-spec-anchor-names.mjs`, `node scripts/check-spec-links.mjs`, and `node scripts/check-spec-status.mjs`.
- Verified tests with Jest (`src/orchestration/orchestratorHelpers.test.ts` and `src/orchestration/chatOrchestrator.acceptance.test.ts`).
- Formatted modified files with Prettier, committed, and pushed to `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Missing spec links and multiple expect calls in orchestratorHelpers.test.ts"}}