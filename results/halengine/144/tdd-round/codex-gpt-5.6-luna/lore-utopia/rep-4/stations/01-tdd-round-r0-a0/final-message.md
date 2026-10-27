Implemented and pushed one red-green-refactor round.

- Added `list_sessions` protocol types and exports.
- Added validation for limits, cursors, and unknown fields.
- Added one focused validator test.
- Updated `.lore/dod.md`.
- Test: `validation.test.ts` passed (4/4).
- No regressions; acceptance tests were not run.
- Branch is pushed and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"list_sessions types and validation","tdd_next":"thread sessionStore into the message handler"}}