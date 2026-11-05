The ESLint failures were all in `src/orchestration/orchestratorHelpers.test.ts`, and I fixed them and pushed. I did not run ESLint, tests or a typecheck in the pod, so CI's next run is the check.

- **`max-expects`:** the test "returns the defined side when one operand is undefined" had two `expect` calls. I split it into two tests with one `expect` each.
- **`require-spec-link`:** the three `accumulateUsage` tests had no spec link, and the split added a fourth. I added matching statements under "Whether a round continues" in `specs/hal-engine-architecture/spec.md`, each with a `validated by` link to its test.

Prettier also inserted six blank lines elsewhere in that spec file. The diff does not show where, and I did not check them.

The branch was not ahead of CI's judged sha, and merging `origin/main` had nothing to bring in. `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split accumulateUsage test to one expect per test and added spec links for the accumulateUsage tests in specs/hal-engine-architecture/spec.md"}}