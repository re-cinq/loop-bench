The four lint findings from CI's verdict are fixed and pushed to `loop-bench/93` as `55333fa`. The branch is in sync with its upstream, and `origin/main` was already an ancestor, so no merge was needed.

What I changed:
- **`src/orchestration/orchestratorHelpers.test.ts`**: the one-side-undefined test asserted twice, so I split it into two tests with one `expect` each. This clears the `max-expects` error.
- **`specs/hal-engine-config-hooks/spec.md`**: added three statements, one per `accumulateUsage` rule (both defined sums; one undefined returns the other; both undefined gives `undefined`). Each carries a `validated by` link to its test at the line the lint checks: lines 29, 35, 40 and 45.

Checks:
- `npx prettier --check` passes on both changed files.
- The file's suite passes under the repo's Jest command: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestratorHelpers.test.ts` gives 8 of 8. My first attempt used `vitest`, which is the wrong runner for this repo; it failed with `describe is not defined`.
- I did not run eslint in this pod, per the rules. The lint result comes from the next CI run.

Two things I could not check:
- `lore-query-trace` returned 403 (the token lacks `read` scope), so I could not look up prior failures on this file.
- The round brief named only the four findings, and I fixed only those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: test lacked spec links and had two expects in orchestratorHelpers.test.ts; linked to spec statements and split the test"}}