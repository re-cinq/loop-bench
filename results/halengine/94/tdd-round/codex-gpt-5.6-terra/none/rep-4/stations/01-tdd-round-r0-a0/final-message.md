Implemented and pushed `2f4d465`.

- Moved `beforeSession` into the guarded `try`.
- Added and passed one focused regression test.
- Updated traceability and checked the code facet in `.lore/dod.md`.
- Acceptance tests were not run locally.
- Red tests: 1 mine; regressions: 0.

Next: update the hook spec wording, then CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.","tdd_next":"Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`."}}