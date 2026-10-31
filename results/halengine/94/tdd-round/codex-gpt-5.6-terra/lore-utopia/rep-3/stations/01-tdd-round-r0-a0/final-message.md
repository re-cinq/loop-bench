Implemented and pushed `ac74eae`.

- Added one regression test; it failed first, then passed after moving `beforeSession` inside `try`.
- Re-anchored affected spec links and checked the first DoD facet.
- Ran only the new test (green); 1 red test authored, 0 regressions.
- CI history was unavailable for this branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession."}}