Implemented and pushed `e2a3143`.

- Added one focused regression test; it failed, then passed after the control-flow move.
- Moved `beforeSession` inside `try`, so errors invoke `onError`, then `afterSession`, while propagating unchanged.
- Ran only the new test file/test: passed.
- Red tests: 1 mine, 0 regressions.
- Remaining facets: finalize the spec guarantee and CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}