Implemented and pushed commit `cb78d14`.

- Moved `beforeSession` inside the lifecycle `try`.
- Added a focused regression test confirming rejection propagation and `beforeSession → onError → afterSession` order.
- Updated the spec traceability link and checked the implementation facet.
- Test file: 24 passed. Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}