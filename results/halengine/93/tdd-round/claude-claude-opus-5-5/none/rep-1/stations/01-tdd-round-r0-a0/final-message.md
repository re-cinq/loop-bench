This round closed facet 2: usage is now added up across every provider call in a turn instead of keeping only the last one. It's committed and pushed to `loop-bench/93`, which is up to date with `origin/main` and not ahead of its remote.

**What changed**
- **Red:** I added a test, `addUsage › sums each token field, skips an unreported round and stays undefined when none reported`, to `src/orchestration/orchestratorHelpers.test.ts`. It failed for the expected reason: `addUsage` wasn't exported yet.
- **Green:** I added `addUsage` to `src/orchestration/orchestratorHelpers.ts`. It sums input, output and total tokens, skips a round that reported no usage, and returns `undefined` when no round reported any. `chatOrchestrator.ts` now uses it: the `lastUsage` local became `turnUsage = addUsage(turnUsage, outcome.usage)`, and that is what `afterModelResponse` receives. A turn with no tools is a single round, so it reports exactly what it did before.
- **Refactor:** nothing needed changing.
- **Traceability:** I added a statement to `specs/hal-engine-config-hooks/spec.md` saying rounds that report no usage are skipped, linked to the new test at `#L29`. The new import line moved the spec's `chatOrchestrator.ts#L150` link, so I corrected it to `#L151`. There's no reanchor script in this repo, so I checked the other links by hand; none of the ones I touched had moved. The facet is ticked in `.lore/dod.md`.

**Tests:** I ran only my test file; all 5 tests in it pass. I did not run the acceptance tests here — CI judges them on this push. There was no round brief, so there was no earlier CI verdict to fix. Red tests this round: one, mine, now green. Regressions: none known.

**Next round:** facet 1. The hook's parameter is still typed as a plain `usage?: UsageMetadata`, which doesn't tell a reader it's a total for the whole turn. It needs a type name that says so, then the CHANGELOG line (facet 4).

**Smells I noticed but left alone:**
- `scriptedProvider` and the `lookupRegistry` setup are written out separately in the acceptance test and the orchestrator tests.
- The spec cites a source line (`chatOrchestrator.ts#L151`) rather than a test, so it breaks whenever lines shift.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}