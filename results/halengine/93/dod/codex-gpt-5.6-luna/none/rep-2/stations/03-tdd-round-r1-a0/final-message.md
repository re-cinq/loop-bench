All 5 ESLint errors, 2 spec-names failures, and spec-links failures are resolved. The DoD facets were already all ticked — no changes needed. Branch is pushed and up to date.

The test I wrote this round (`it('does not call onError when the thrown value is not an Error instance', ...)` at chatOrchestrator.test.ts:313) passes as part of the 25-test suite.

No regressions introduced (0 of my tests went red; 0 unrelated tests went red). No unrelated smells observed that would require action.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: deduplicate scriptedProvider, split multi-expect test, add spec link for catch-gates statement, fix spec anchor line numbers","tdd_next":"acceptance green"}}