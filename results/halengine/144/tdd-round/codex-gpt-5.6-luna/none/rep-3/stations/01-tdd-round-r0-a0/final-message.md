Implemented and pushed commit `ba1b172`.

- Added `list_sessions`/`session_list` types and exports.
- Added pagination validation with field-specific errors.
- Added focused regression test and updated spec traceability.
- Updated `.lore/dod.md`.
- Test: `src/transport/ws/validation.test.ts` passed.
- One red test was ours; no regressions observed. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions message types and validation","tdd_next":"thread sessionStore and dispatch list_sessions"}}