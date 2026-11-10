I resolved the ESLint errors reported by CI on `19eaa4dfdc1d7fee67a77a045b3b6ffe47e754bd`:

1. In `src/orchestration/orchestratorHelpers.test.ts`, consolidated the two `expect` calls in `returns the defined side when one operand is undefined` into a single `expect` asserting on both sides (`[accumulateUsage(undefined, usage), accumulateUsage(usage, undefined)]`), resolving `re-lint/max-expects`.
2. In `specs/hal-engine-config-hooks/spec.md`, added inline spec citations pointing to lines 29, 35, and 40 of `src/orchestration/orchestratorHelpers.test.ts` for the three `accumulateUsage` unit tests, resolving `re-lint/require-spec-link`.
3. Verified that `npm test -- src/orchestration/orchestratorHelpers.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts` passed (33/33 tests green), and verified `npm run spec:names`, `npm run check:spec-links`, and `npm run check:spec-status` passed with 0 findings.
4. Formatted modified files with prettier, committed with conventional commit message `test(orchestrator): link accumulateUsage tests to spec`, pushed to `origin/loop-bench/93`, and verified merge state against `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"added missing spec citations and resolved max-expects violation in orchestratorHelpers.test.ts"}}