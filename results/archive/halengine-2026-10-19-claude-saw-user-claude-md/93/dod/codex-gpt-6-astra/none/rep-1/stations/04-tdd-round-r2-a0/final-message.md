Branch is up to date and pushed. The fix adds the missing `([validated by: sums usage from every provider call in the turn](../../src/orchestration/chatOrchestrator.test.ts#L539))` link to the spec statement, resolving the `re-lint/require-spec-link` eslint error.

No regressions were introduced — this was a docs-only change to a markdown spec file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint: add spec link for usage sum unit test in chatOrchestrator.test.ts","tdd_next":"Make the public hook parameter type explicitly represent turn-total usage, without `any`"}}