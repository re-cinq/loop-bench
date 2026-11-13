I fixed all five things CI flagged on the last push and pushed the branch. CI hasn't run on the new push yet, so whether it's green is still open.

**What changed:**
- **eslint, missing spec links:** `specs/hal-engine-config-hooks/spec.md` now links the two tests CI named: "counts reported rounds…" (`chatOrchestratorUsage.acceptance.test.ts#L67`) and "adds each token field…" (`orchestratorHelpers.test.ts#L30`). One existing link pointed at the wrong line, so I moved it from #L46 to #L48. This repo has no reanchor script, so I checked each link on the lines I touched by hand.
- **eslint, too many `expect` calls:** the "keeps the total when a round reported no usage…" test at `orchestratorHelpers.test.ts:36` now makes a single array `toEqual` assertion instead of three separate checks. Its title is unchanged.
- **eslint, comment too long:** the `TurnUsage` comment in `src/types/ai.ts` is now one line.
- **changelog:** under `[Unreleased]` there are two new entries:
  - **Added:** `TurnUsage` is now exported.
  - **Changed:** `afterModelResponse` now receives the usage summed over every provider call in the turn. The migration note says three things: tool-using turns will record larger numbers, turns with no tools report what they did before, and rounds that report no usage add nothing. The entry also explains why I chose a summed total over a per-round breakdown.

**Tests:** this round had no red phase. The facet left was docs and CI fixes, and none of it is behaviour a new test could fail on. I ran only the test file I edited, `orchestratorHelpers.test.ts`, and all 7 tests pass. I didn't run the acceptance tests, per the rules. None of the red tests in the verdict were mine and none were regressions: every failure was a lint or changelog check.

**`.lore/dod.md`:**
- I ticked the spec/CHANGELOG facet and the "record why per-round was rejected" facet. The reasoning is in the CHANGELOG; the GitHub issue itself is outside this pod.
- I added one new facet: the MINOR version bump when the release is cut, since `package.json` is still at 0.3.0.

**Delivery:** formatted with prettier, committed and pushed. Merging `origin/main` brought in nothing new ("Already up to date"), and `git status` shows the branch level with its upstream.

I didn't notice any unrelated code smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior (and fix CI eslint/changelog findings)","tdd_next":"acceptance green"}}