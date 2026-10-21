Committed and pushed the round. Moving `beforeSession` inside the `try` makes the new focused test pass: a throw reaches `onError` and `afterSession`, then rejects with the original error.

One test written this round was red, then green; no regressions were observed. Lore returned 403, so I could not read CI’s verdict. The next facet is updating the spec’s stale scope text.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}