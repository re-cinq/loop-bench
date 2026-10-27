Implemented and pushed commit `bb73aae`.

- Added non-object input `TypeError` validation and test.
- Fixed Ajv typing, helper ordering, and diagnostic path normalization.
- Updated spec traceability and `.lore/dod.md`.
- Test: registry suite passed (7/7).
- CI regressions addressed: 1 failing test, plus typecheck/eslint findings.
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject non-object tool input as a caller TypeError","tdd_next":"acceptance green"}}