Branch is up to date. The push is confirmed.

**What this round did:**
- Fixed all three CI failures from the previous push: extracted `scriptedProvider` into a shared `scriptedProviderTestSupport.ts` file (eliminating the `re-lint/no-duplicate-code` violation), added `{}` braces to two lambda bodies in the acceptance test to fix the `Promise<void>` type errors, and added the CHANGELOG entry for the usage aggregation behavior change.

No regressions introduced — 0 pre-existing tests were touched, 0 were written this round (round was purely repair). Unrelated smell noted: the `lookupTool()` helper in the acceptance test and `registryReturning` in `chatOrchestrator.test.ts` both register the same `lookup` tool with the same schema but weren't flagged as duplicates — no action taken.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix typecheck/eslint/changelog CI failures from previous round","tdd_next":"Preserve the existing no-tool behavior pinned by `receives collected response text and usage` in chatOrchestrator.test.ts"}}