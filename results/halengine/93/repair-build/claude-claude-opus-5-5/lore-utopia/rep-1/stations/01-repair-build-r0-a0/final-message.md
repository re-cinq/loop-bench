CI's eslint check failed with 4 errors, all in `src/orchestration/orchestratorHelpers.test.ts`, and all 4 are fixed and pushed. Lint wasn't re-run here (it doesn't fit this pod), so CI's next run on the push is the real check.

- **Spec links (`require-spec-link`):** the three `accumulateUsage` tests had no link back to a spec statement. I added four statements, one per test, under "Across rounds" in `specs/hal-engine-architecture/spec.md`. Each has a `validated by` link to its test's line.
- **Two expects in one test (`max-expects`):** I split "returns the defined side when one operand is undefined" into two tests: "returns the reported round when the running total is still undefined" and "keeps the running total when a round reports no usage". Both checks are unchanged; each test now has one `expect`.

I ran the test file with jest, as the repo's `npm test` does: 8 of 8 passed.

Running prettier on the spec added blank lines in unrelated parts of that file, so I reverted that and kept only my four added lines.

The fix is committed and pushed to `loop-bench/93`. `origin/main` was already merged, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had two expects; split it and linked all from the architecture spec"}}