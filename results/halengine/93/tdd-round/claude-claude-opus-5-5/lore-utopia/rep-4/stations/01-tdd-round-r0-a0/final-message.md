I closed one facet this round: usage is now summed across every provider round in a turn. The commit is pushed, the branch already contains the latest `origin/main`, and it is not ahead of its upstream.

- **Red:** I added the `addUsage` test in `src/orchestration/orchestratorHelpers.test.ts`. It sums each token field, skips rounds that report no usage, and expects `undefined` when no round reports any. It failed first because `addUsage` didn't exist yet.
- **Green:** I added `addUsage` to `src/orchestration/orchestratorHelpers.ts` and used it in the round loop of `chatOrchestrator.ts`. The local that held only the final round's usage (`lastUsage`) is now `turnUsage`, which `afterModelResponse` receives. A turn with no tool calls makes one provider call, so it reports the same number as before.
- **Bar:** I ran only my test file, and all 5 tests in it pass. I did not run the acceptance tests; CI judges those on this push. Red tests: 1 was mine (now green) and 0 were regressions, but there was no earlier CI verdict to check against.
- **Traceability:** In `specs/hal-engine-config-hooks/spec.md` I added a statement linked to the new test. I also corrected the `onError` link, which my extra import line moved from `#L150` to `#L151`. There is no reanchor script in this repo, so I checked the links by hand.
- **dod.md:** I ticked the "Sum each token field" facet.

Two things I didn't do:
- I didn't stamp a spec anchor on the test for `tests.list` to pick up. `scripts/lore-list-tests.mjs` has no spec field to carry one, so I only added a comment pointing at the spec.
- I noticed no unrelated smells to report.

Next round: the hook's public type still says `usage?: UsageMetadata`. It needs a deliberately named total-usage type so a reader can tell it is a sum. After that come the CHANGELOG entry and the remaining spec wording.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}