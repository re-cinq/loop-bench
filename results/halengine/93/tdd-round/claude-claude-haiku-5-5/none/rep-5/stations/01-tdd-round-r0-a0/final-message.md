This round added the summing behaviour and pushed it. Facet 2 is closed; the public type naming (facet 1), the spec and CHANGELOG (facet 4), and the acceptance tests are still open.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: the turn's usage is now accumulated across every provider call via a new `addUsage` helper, instead of keeping only the last round's usage. Field-wise sums are used, a round that reports nothing adds nothing, and a turn where no round reports stays `undefined`. A no-tool turn returns the provider's own usage object unchanged.
- `src/orchestration/chatOrchestrator.test.ts`: one new test, "adds the usage of every round that reports it, not only the last", placed beside the existing guard. It was red before the change (got `{7,4,11}`, expected `{9,5,14}`) and is green after.
- `.lore/dod.md`: ticked facet 2 (summing) and facet 3 (the no-tool guard, unedited and passing). Facet 1, facet 4 and the two acceptance tests stay unchecked.
- Committed as `ba5a64e` and pushed; the branch matches `origin/loop-bench/93`. The merge with `origin/main` was already up to date.

**Test results**
- I ran only the new test plus the existing `receives collected response text and usage`, `keeps the usage an earlier round reported…` and `joins the text of every round` by name, from `chatOrchestrator.test.ts`. The 4 selected tests pass.
- I did not run the acceptance file `chatOrchestratorUsage.acceptance.test.ts`, per the round rules. CI will judge it.
- No `round-brief.md` existed, so this was the first round with no CI verdict to work from.
- Test count: this round's red test was mine and there were no regressions observed locally. I did not run the full suite.
- I did not run lint or the typechecker, per the brief. Prettier ran on the two changed files.

**Not done / open**
- Facet 1: the `lastUsage` local is renamed to `turnUsage`, but the public type is still plain `UsageMetadata`. A named total-usage contract is still to be written.
- Facet 4: `specs/hal-engine-config-hooks/spec.md` already states the summed behaviour at line 28, so it may need only a status check. The CHANGELOG entry (with the consumer-impact note the ticket asks for) is still missing.
- The `lore_*` tools (including `lore-query-trace`) were not available in this session, so I could not check the coverage graph before editing. I checked coverage by reading the test file directly.
- Unrelated items I noticed and did not touch: the `afterModelResponse` JSDoc-style comment in `CLAUDE.md` still shows the old signature shape only in prose, and the spec header row status was not reviewed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum usage across every provider call in a turn","tdd_next":"name the total-usage public type (facet 1)"}}