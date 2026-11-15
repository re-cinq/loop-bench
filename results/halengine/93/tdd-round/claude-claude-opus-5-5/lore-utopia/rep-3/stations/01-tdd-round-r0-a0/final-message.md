I closed the summing facet: `afterModelResponse` now gets the total usage from every provider call in a turn, not just the last one. The change is committed and pushed, and the branch is up to date with `origin/main` and not ahead of its upstream.

**What changed**
- **Red:** I added a test to `src/orchestration/orchestratorHelpers.test.ts`, "sums every token field over the rounds that reported usage and stays undefined when none did". It folds rounds that report usage, with one that doesn't in between, into a single total. It failed because the helper didn't exist yet.
- **Green:** I added `addUsage(total, round)` to `orchestratorHelpers.ts`. A round with no usage leaves the total unchanged, and a turn where nothing reported stays `undefined`. In `chatOrchestrator.ts`, `lastUsage = outcome.usage ?? lastUsage` became `turnUsage = addUsage(turnUsage, outcome.usage)`, and that total is what the hook receives.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` has a new statement about rounds that report no usage, linked to the new test at `#L33`. The new import moved the orchestrator's `catch` line down by one, so I updated that citation from `#L150` to `#L151`.
- **`.lore/dod.md`:** I ticked the summing facet. I also added a new unchecked one: `CLAUDE.md`'s `OrchestratorHooks` block is generated from the declaration, so it needs regenerating once the hook's usage parameter is renamed or retyped.

**Tests:** I ran only my test file with Jest: 5 of 5 passed. There was no round brief and no previous CI verdict, so this round had no regressions to fix: 1 red test was mine, 0 were regressions. With this change both acceptance tests should now pass, but CI hasn't confirmed that yet. I didn't run lint, the typechecker or the build here.

**Still open:**
- The hook's public type still reads `usage?: UsageMetadata`, so nothing in the signature says it's a sum.
- The CHANGELOG entry is still missing. The ticket asks it to say that existing consumers will now record larger numbers for turns that use tools.
- The spec's `catch` citation is a hard-coded line number, so any edit above it in the orchestrator will make it stale again.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}