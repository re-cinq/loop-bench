The eslint findings are fixed and pushed as `494fef5` on `loop-bench/93`. The branch is not ahead of its upstream, and `origin/main` is already merged in, so nothing further was needed there.

**What was broken:** `orchestratorHelpers.test.ts` had three `accumulateUsage` tests with no spec link, and the undefined-operand test had two `expect` calls against a max of one.

**What I changed:**
- **`src/orchestration/orchestratorHelpers.test.ts`:** split the undefined-operand test into two tests, one per side, each with a single `expect`.
- **`specs/hal-engine-config-hooks/spec.md`:** added inline `validated by` links from the two existing usage statements to the four `accumulateUsage` tests (lines 29, 35, 40, 45). Both statements already described this behaviour.
- Ran `prettier --write` on the test file; it was already formatted.

**What I did not run:** eslint, as the verdict asked, and the test suite. The link format copies the spec's existing convention, so whether the linter accepts multiple links per statement is unverified until CI judges the push.

**Tooling gap:** the `lore-query-trace` and `lore_*` tools were not available in this session. I could not check prior failures on these paths, and I worked from the verdict and the file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split two-expect accumulateUsage test and add spec links for the three accumulateUsage tests (lint not run locally; CI re-judges)"}}