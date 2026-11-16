Branch is up to date. The fix moves `isInvalidLimit` below `validateListSessionsMessage` to satisfy the `re-lint/callee-below-caller` ESLint rule — no logic changed, just declaration order.

0 regressions caused by me; the CI failure was a pre-existing lint ordering issue from the previous round's implementation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint callee-below-caller violation in validation.ts","tdd_next":"acceptance green"}}