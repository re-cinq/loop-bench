This round's work is committed and pushed: the hook now gets the summed usage of every provider call in a turn, not just the last one. The branch already had everything from `origin/main`, and `git status` shows nothing left unpushed.

- **Failing test first:** I added `addRoundUsage` cases to `src/orchestration/orchestratorHelpers.test.ts`. They cover:
  - two rounds that both report usage;
  - a round that reports nothing;
  - a first round that reports nothing;
  - a turn where no round reports.

  The test first failed because the export didn't exist yet.
- **The fix:** `addRoundUsage` in `orchestratorHelpers.ts` adds up each token field only for rounds that report usage. `chatOrchestrator.ts` now keeps a running `turnUsage` total and passes it to `afterModelResponse`.
- **Test result:** My test file passes, 8 of 8. I didn't run the acceptance tests (CI does that), but the change is exactly the code path they check.
- **Spec:** I added a "validated by" line for the rounds-without-usage rule. My new import line moved the `onError` link down by one, so I updated it from `#L150` to `#L151`.
- **`.lore/dod.md`:** I ticked the summing facet and added a new one: the hook's signature still says `usage?: UsageMetadata`, so it doesn't yet show that this is a turn total.
- **Red tests:** 1 was mine (the new test) and 0 were regressions. There was no round brief with a CI verdict yet.
- **Spec anchor not stamped:** `.lore/test-commands.yml` and `scripts/lore-list-tests.mjs` only output id, name and file, so this repo has no way to attach a spec anchor to a test.

Things I noticed but didn't change:
- `extractUsage` exists in both `orchestratorHelpers.ts` and `vertexProvider.ts`, with different meanings. Renaming one would avoid confusion.
- The spec cites `chatOrchestrator.ts` by line number, so any edit above line 151 breaks the link. Pointing it at a test, or using a `reanchor` script (the repo has none), would make it stable.

Still open for later rounds: the hook's type facet, the CHANGELOG entry, and ticking the no-tool regression-guard facet once CI confirms it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Make afterModelResponse's usage type name it as the turn total, then CHANGELOG entry"}}