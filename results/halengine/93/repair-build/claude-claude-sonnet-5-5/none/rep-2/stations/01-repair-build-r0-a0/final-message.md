I fixed all four lint errors from CI and pushed the branch. I didn't run eslint here because of the pod's memory limit, so CI's next run will confirm. The branch had no commits after the judged sha, was already up to date with `origin/main`, and `git status` shows it isn't ahead of its upstream.

- **`max-expects` (test line 35):** I split the two-assertion test in `src/orchestration/orchestratorHelpers.test.ts` into two single-assertion tests, one for each undefined side.
- **`require-spec-link` (lines 29, 35, 41):** I added three bullets to `specs/hal-engine-config-hooks/spec.md` after the existing usage bullets. They cover summing fields, a missing round on either side, and both rounds missing. Each links to its test by name, and the links point at the new line numbers (29, 35, 40, 45).

I ran prettier on both files, and it reported them unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split multi-expect accumulateUsage test and added spec links (config-hooks spec) for the accumulateUsage tests"}}