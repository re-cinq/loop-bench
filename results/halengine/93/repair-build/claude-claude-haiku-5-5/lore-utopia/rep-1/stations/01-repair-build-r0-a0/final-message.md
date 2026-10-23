The fix is pushed and the branch is level with its upstream. `origin/main` added nothing new, so the merge was a no-op.

The CI verdict named four lint errors, all in `src/orchestration/orchestratorHelpers.test.ts`, and I fixed all four:

- **`max-expects` at line 35:** the "defined side" test had two `expect` calls. I split it into two tests, one per operand.
- **`require-spec-link` at lines 29, 35, 41:** the rule needs a spec statement whose `#L` line falls inside each test's span. I linked the sum test from the "summed across every provider call" statement in `specs/hal-engine-config-hooks/spec.md`. I linked the three undefined-operand tests from the "rounds that reported usage" statement. The line numbers in those links are now 29, 35, 40 and 45, matching the split.

Verification:
- `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts` passes, 8 of 8 tests.
- Prettier reports the test file unchanged.
- I did not run eslint, typecheck or the build here, per the pod rules. CI will judge the new head.

I did not run `lore_get_ci_failures` or the trace query. The trace call returned HTTP 403, so I had no record of earlier failures on these files. The round brief's annotations were specific enough to act on.

Commit `a757e02` on `loop-bench/93`, pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"lint: split two-expect accumulateUsage test and add spec-link annotations for the four orchestratorHelpers tests"}}