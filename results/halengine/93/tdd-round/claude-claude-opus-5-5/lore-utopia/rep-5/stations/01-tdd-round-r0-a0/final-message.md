This round adds an `addUsage` helper and uses it so `afterModelResponse` now gets the usage of every provider call in a turn, not just the last one. The commit is pushed and the branch is up to date with `origin/main` and not ahead of its upstream.

- **Red:** I added the test `sums each token field, skipping a round that reported no usage` to `src/orchestration/orchestratorHelpers.test.ts`. It failed because `addUsage` didn't exist yet.
- **Green:** `addUsage(total, round)` in `src/orchestration/orchestratorHelpers.ts` adds up the three token counts. A round with no usage is skipped, and a turn where no round reported anything still gives `undefined`. In `chatOrchestrator.ts`, `lastUsage = outcome.usage ?? lastUsage` became `turnUsage = addUsage(turnUsage, outcome.usage)`, and the hook now receives `turnUsage`. A turn with no tool calls sums a single round, so it reports exactly what it did before.
- **Refactor:** nothing needed changing.
- **Spec:** I added a statement on the skip-missing-usage rule to `specs/hal-engine-config-hooks/spec.md`, linked to the new test. Adding an import moved the `onError` check in `chatOrchestrator.ts` down a line, so I moved the spec's link from `#L150` to `#L151`. This repo has no `reanchor.mjs`, so I checked that link by hand.
- **`.lore/dod.md`:** ticked the "sum each token field" facet.

**Tests:** I ran only `orchestratorHelpers.test.ts`, which passes 5/5. I didn't run the acceptance tests, and there is no round brief, so there's no CI verdict to report on. That means 1 red test this round, written by me, and 0 regressions known.

**For the next round:**
- The hook's parameter is still typed `usage?: UsageMetadata`. The facet that makes the type say it's a turn total is open.
- The CHANGELOG entry is not written yet.
- `CLAUDE.md` copies the hook signature, so it will need updating when that type changes. I left it alone.

No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}