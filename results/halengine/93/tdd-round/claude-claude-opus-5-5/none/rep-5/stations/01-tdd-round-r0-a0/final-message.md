This round added the per-round usage summing as a pure helper. It's committed and pushed; the branch was already up to date with `origin/main` and isn't ahead of its upstream.

- **RED:** I added one test, `sums the rounds that reported usage and skips a round that reported none`, to `src/orchestration/orchestratorHelpers.test.ts`. It failed for the expected reason: `addRoundUsage` didn't exist yet.
- **GREEN:** I added `addRoundUsage(total, round)` to `src/orchestration/orchestratorHelpers.ts`. It adds each token field, a round with no usage leaves the total unchanged, and if no round reports usage the result stays `undefined`. That test file now passes, 5 of 5.
- **REFACTOR:** nothing to collapse yet.
- **Traceability:** I added a statement to `specs/hal-engine-config-hooks/spec.md` saying a call that reports no usage adds nothing to the total, linked to the new test at line 29. `check-spec-links` reports 0 misplaced links. This repo has no `reanchor.mjs`, and `scripts/lore-list-tests.mjs` doesn't read spec anchors, so there was nothing to stamp in the test itself.
- **dod.md:** I ticked the summing facet.

**Tests:** I ran only the new test's file; I didn't run the acceptance tests. They are still expected to fail, because the orchestrator doesn't call `addRoundUsage` yet. There is no round brief and no CI verdict for this push yet, so I can't count regressions. Of the red tests I know of, none is mine (my test is green) and none is a regression; that's for CI to confirm.

**Next round:** switch `lastUsage` in `chatOrchestrator.ts` to a running total built with `addRoundUsage`, and make the hook's type say it receives a sum (for example a `turnUsage` parameter name with a doc comment). That should turn both acceptance tests green. The CHANGELOG line is still owed too.

**Unrelated smell, not acted on:**
- `src/orchestration/orchestratorHelpers.test.ts` uses `{} as ToolRegistry` as a stand-in registry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}