Implemented and pushed `4d0b998`.

- Moved `beforeSession` inside the orchestrator’s `try`.
- Added a focused regression test; it passes (the narrowed Jest invocation still prints global coverage-threshold warnings).
- Updated traceability and checked off the implementation facet.
- Red tests: 1 mine, 0 regressions. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}