The eslint failure is fixed and pushed as `b5c7cbd` on `loop-bench/93`. The branch is level with its upstream and already contains `origin/main`, so the merge was a no-op. CI has not judged the new head yet.

The verdict named four findings in `src/orchestration/orchestratorHelpers.test.ts`, and I fixed each:

- **Lines 29, 35, 41 (`require-spec-link`):** the three `accumulateUsage` unit tests had no spec link. I added a `validated by` link for each to the matching statements in `specs/hal-engine-config-hooks/spec.md` (lines 18 and 19). The sum test attaches to the summing statement, and the two undefined-operand tests and the both-undefined test attach to the "some rounds omit usage" statement.
- **Line 35 (`max-expects`):** the test asserting both undefined-operand cases had two `expect` calls. I split it into one test per operand, so each has one assertion and its own link. No assertion was removed or weakened.

Verification:
- `npx prettier --check` on the two changed files passes.
- I ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts`: 8 of 8 tests pass. This is the repo's own `test` script, scoped to the one file.
- I did not run eslint, typecheck, or the build in this pod, per the brief.

I did not run the `lore-query-trace` lookup from the brief, because no lore tools are available in this session. The fix followed directly from the annotations, so I don't think it was needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: added spec links for three accumulateUsage tests and split the two-expect undefined-operand test"}}