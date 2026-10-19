Branch is up to date and clean. 0 regressions, 0 new tests were mine that didn't pass.

Unrelated smell noticed: the `// Bounded by the budget gate below...` comment in `chatOrchestrator.ts` could be phrased more clearly, but I left it alone per the single-facet rule.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate per-round usage into sumUsage pure function and wire into chatOrchestrator","tdd_next":"Make the hook signature name it a turn total (parameter name/doc on afterModelResponse, or named type alias)"}}