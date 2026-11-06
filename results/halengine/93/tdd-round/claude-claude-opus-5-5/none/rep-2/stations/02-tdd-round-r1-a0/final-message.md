I fixed everything CI flagged on the last push (eslint, spec-links, changelog). The round is pushed, `origin/main` merged in cleanly (it was already up to date), and the branch is level with its upstream.

**What was wrong and what changed:**
- **Two `expect` calls in one test** (`orchestratorHelpers.test.ts:39`): I split it into "adopts the round usage when no earlier round reported any" and "keeps the running total when the round reported nothing". That file's tests pass locally (8 of 8). The acceptance tests were not run here; CI runs them.
- **Tests with no spec link** (acceptance test at line 67, helper tests at lines 31 and 39): I rewrote the usage bullets in `specs/hal-engine-config-hooks/spec.md` so each statement ends with exactly one `([validated by: …](…#Lnn))` link. Every `addUsage` test and both acceptance tests are now cited. The repo's spec-link checker reports 0 misplaced links in that spec.
- **Missing CHANGELOG entry**: added one under `[Unreleased] → Fixed`. It says what an existing consumer will see: tool-calling turns now report bigger totals, no-tool turns report the same as before. The changelog check passes now that the commit exists.

I ticked the "spec + CHANGELOG" facet in `.lore/dod.md`, and also added and ticked one for the lint findings.

**Red tests:** 0 failing tests of mine and 0 regressions. CI's findings were 4 lint errors on tests I wrote plus the two doc checks; none named a test that existed before this branch.

**Not checked here:** I didn't run eslint in this pod (CI runs it). Its 10-minute timeout in the last run is a separate problem with CI itself, not with this branch.

**Next round:** make the hook's parameter type say it is a whole-turn total. `afterModelResponse(..., usage?: UsageMetadata)` still reads like one provider call's usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior (plus CI spec-link/max-expects findings)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}