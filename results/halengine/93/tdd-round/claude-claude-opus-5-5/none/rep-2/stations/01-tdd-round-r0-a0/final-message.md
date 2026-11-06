I closed the "sum only the rounds that reported usage" facet, and the commit is pushed.

- **Change:** I added an `addUsage(total, round)` helper in `src/orchestration/orchestratorHelpers.ts`. It adds up each token count across provider calls. A call that reported no usage adds nothing, and a turn where no call reported usage stays `undefined`. In `chatOrchestrator.ts`, the old `lastUsage` (final round only) is now a `turnUsage` running total that `afterModelResponse` receives. A turn with no tool calls makes one provider call, so it reports exactly what it did before.
- **Test:** I added three cases to `src/orchestration/orchestratorHelpers.test.ts`. They failed first because the helper didn't exist, and all 7 tests in that file now pass. I did not run the acceptance tests, the full suite, lint or the typechecker; CI judges those. There was no round brief, so I have no CI verdict on an earlier push, and I know of no regressions.
- **Red tests:** one was mine (the new `addUsage` test, now green) and zero were regressions.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` has a new statement on rounds with no reported usage, linked to the new tests. My extra import line moved the `catch` down a line, so I updated that spec link from `#L150` to `#L151`.
- **Checklist:** I ticked the facet in `.lore/dod.md`. Merging `origin/main` brought in nothing, and the branch matches its upstream.

**Next round:** the public type still says `usage?: UsageMetadata`, so a reader can't tell it's a sum. That facet is next, followed by the CHANGELOG entry saying tool-heavy turns now report larger numbers. I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}