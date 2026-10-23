The red eslint check is fixed and pushed to `loop-bench/93` as `434d6dd`. The branch is level with its upstream.

CI named three `re-lint/require-spec-link` findings and one `re-lint/max-expects` finding in `src/orchestration/orchestratorHelpers.test.ts`, so I made these changes:

- **`max-expects` (line 35):** the test "returns the defined side when one operand is undefined" had two `expect` calls. I merged them into one assertion on an array, `[accumulateUsage(undefined, usage), accumulateUsage(usage, undefined)]`, against `[usage, usage]`. The test name and its `it` line stay at 35.
- **`require-spec-link` (lines 29, 35, 41):** I added three bullets to `specs/hal-engine-config-hooks/spec.md`, after the existing usage statements, each with a `validated by` link to its test's `it` line. The both-undefined test moved from 41 to 40 when I merged the two `expect` lines, so its link points at 40.

I ran `prettier --write` on both files, which left them unchanged. I did not run eslint here, as the brief asked. `origin/main` was already merged into the branch, so there was nothing new to merge. The one local test run was `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts`, which passed 7 of 7.

I did not run `lore-query-trace` before reading the file, as the brief asks. The lore tools were not loaded in this session, and I could not find `lore-query-trace` through ToolSearch. The fix did not depend on the failure history.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: usage helper tests lacked spec links and one test had two expects; split the expects into one assertion and linked the three statements in the hooks spec"}}