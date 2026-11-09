Moved `beforeSession` into the orchestrator’s existing error-handling block. The new focused test passed after first failing because neither hook ran. The round was committed and pushed; the branch is up to date with `origin/main` and its upstream.

The CI verdict and coverage graph were unavailable in this environment. Locally, one test was red during the red phase and no regressions were observed. The test descriptor script does not expose a `spec` field, so the test’s spec anchor is recorded in a comment instead.

The spec’s surrounding description is stale; updating it and the changelog are the remaining facets. The out-of-scope `instanceof Error` gate and tool-round usage accounting remain untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update the hooks spec with the new guarantee"}}