Implemented and pushed `cf5ac84`.

- Added a focused red–green unit test; it now passes.
- Moved `beforeSession` into the `try`, ensuring `onError` then `afterSession` run on failure.
- Marked the corresponding DoD facet complete.
- Ran only the new test file/test; acceptance tests were not run.
- Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}