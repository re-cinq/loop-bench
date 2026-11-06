The eslint failures are fixed and pushed to `loop-bench/93`. CI hasn't run on the new commit yet.

CI flagged four errors in `src/orchestration/orchestratorHelpers.test.ts`:
- **No spec links:** the three `accumulateUsage` tests at lines 29, 35 and 41 weren't cited by any spec statement. I added four statements under "Across rounds" in `specs/hal-engine-architecture/spec.md`, one citing each test at its current line.
- **Too many `expect` calls:** "returns the defined side when one operand is undefined" had two. I split it into two tests: "returns the next usage when nothing has accumulated yet" and "keeps the accumulated usage when the next round reports none". Both still check what the original did; no check was dropped or weakened.

What I ran locally:
- **Tests:** the Jest suite for that one file, 8 of 8 passing.
- **Spec checks:** `npm run check:spec-links` reported 0 misplaced and `npm run spec:names` reported every citation names its test.
- **Formatting:** prettier left the test file unchanged. I didn't use prettier's output on the spec: this repo only formats `.ts` files with it, and it had added unrelated blank lines, so I reverted that.
- **Not run here:** eslint, per the pod rules. CI will confirm that check.

Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had 2 expects; linked them in the architecture spec and split the test"}}