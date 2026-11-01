Implemented and pushed `f8d7a2c`.

- Moved `beforeSession` inside `try`, so `onError` and `afterSession` now run on its failure.
- Added a focused regression test; it passes.
- Acceptance tests were not run.
- Red tests: 1 mine, 0 regressions.
- Next facet: update the hook specification checklist item.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}