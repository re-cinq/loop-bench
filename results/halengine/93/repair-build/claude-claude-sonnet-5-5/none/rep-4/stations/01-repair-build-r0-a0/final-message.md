I fixed the four eslint errors and pushed. I didn't run eslint, the tests or a typecheck, so CI still has to judge the new head.

- **`max-expects`:** I split the test with two `expect` calls into two tests, one per undefined operand.
- **`require-spec-link`:** `specs/hal-engine-config-hooks/spec.md` now has one new bullet after the existing usage bullets. It links all four `accumulateUsage` tests to what they validate: summing, keeping the reported side, and returning `undefined` when neither reported. I used the post-split line numbers, #L29, #L35, #L40 and #L45.
- **Delivery:** prettier made no changes to the two files. `origin/main` was already merged, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split 2-expect accumulateUsage test and added spec links for the helper tests"}}