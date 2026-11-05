I closed the "sum each token field" facet and pushed it. I ran only the helper unit test I wrote, and it passes. I did not run the acceptance tests, lint or typecheck, as instructed. The branch is level with its upstream and `origin/main` merged cleanly.

- **Test:** I added `sumUsage` tests to `orchestratorHelpers.test.ts`. They cover adding token fields, a round that reports nothing, and a turn where no round reports. I wrote the tests and the code in the same step rather than running the tests red first, so there was no red phase.
- **Code:** `sumUsage` in `orchestratorHelpers.ts` adds the token counts of every round that reported. `chatOrchestrator.ts` now passes that running total to `afterModelResponse` in place of `lastUsage`. A turn where no round reported still passes `undefined`.
- **Checklist:** I ticked that facet in `.lore/dod.md`.
- **Red tests:** one test of mine was red and none were regressions; that was the first jest attempt, which failed only because I ran jest without the repo's ESM flag.
- **Still open:** the type facet isn't done. The hook's `usage` argument is still the plain `UsageMetadata`, so nothing in the signature says it's a sum. The CHANGELOG entry is also still missing. The hooks spec already describes the summed behaviour.
- **Smell left alone:** the hooks spec links its test at `#L44`; I didn't re-check that anchor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Deliberately named total-usage type for the hook, then CHANGELOG entry"}}