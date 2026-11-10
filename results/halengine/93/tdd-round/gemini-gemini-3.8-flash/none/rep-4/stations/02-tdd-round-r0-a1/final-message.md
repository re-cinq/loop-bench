Completed the red-green-refactor round for the facet: "Sum each token field only for provider rounds that report usage, preserving `undefined` when none do."

- Added unit test `sums usage only from rounds that report it, leaving an unreported turn undefined` in `src/orchestration/chatOrchestrator.test.ts` to assert that missing usage in intermediate tool rounds does not poison totals with `undefined` or `NaN` and that entirely unreported turns leave `totalUsage` as `undefined`.
- Verified the test passes with Jest (`0` red tests, `0` regressions).
- Formatted changed files with Prettier, updated `.lore/dod.md`, committed, and pushed to `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving `undefined` when none do.","tdd_next":"Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`."}}