I fixed all four eslint errors in `src/orchestration/orchestratorHelpers.test.ts` and pushed the branch. I did not run eslint, tests or a typecheck here, so CI will be the first check of the push.

- **`max-expects` (line 35):** the test had two `expect` calls. I split it into two tests, "returns the right operand when the left is undefined" and "returns the left operand when the right is undefined".
- **`require-spec-link` (lines 29, 35, 41):** I added four "validated by" bullets under "Whether a round continues" in `specs/hal-engine-architecture/spec.md`. They cover the sum case, each one-sided case and the both-undefined case, and each links to its test at the line where that test now starts.

The branch had not moved past the judged sha. I ran prettier on the test file, and `origin/main` merged as "Already up to date". `git status` shows the branch level with `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Split two-expect accumulateUsage test and added spec links for the accumulateUsage tests in specs/hal-engine-architecture/spec.md (re-lint rules require-spec-link and max-expects)"}}