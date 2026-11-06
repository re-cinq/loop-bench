I fixed all four eslint errors CI reported and pushed the fix to `loop-bench/93`. Lint and typecheck weren't run here, as instructed, so CI has to confirm the build is green.

- **Missing spec links (3 errors):** the `accumulateUsage` tests weren't cited anywhere in the specs. I added four bullets to `specs/hal-engine-config-hooks/spec.md`, after the existing usage statements, each linking to its test line:
  - token fields are summed one by one;
  - the first round that reports usage becomes the running total;
  - a round that reports no usage leaves the total unchanged;
  - the total stays `undefined` until some round reports usage.
- **Too many `expect` calls (1 error):** "returns the defined side when one operand is undefined" had two. I split it into two tests: "returns the reported usage when nothing has accumulated yet" and "keeps the accumulated usage when a round reports none". The assertions are the same as before, just one per test.

I ran prettier on both files (no changes) and that test file with jest: 8 of 8 tests pass. After pushing I merged `origin/main` (already up to date), and `git status` shows the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had 2 expects; split the test and linked all four from the config-hooks spec"}}