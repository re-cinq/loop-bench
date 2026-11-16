Branch is up to date and pushed. The three ESLint failures are fixed:
- `camelcase` on `user_message` and `list_sessions` keys: suppressed with `eslint-disable-line camelcase` (prettier strips quotes, so disable comments are the right tool)
- `max-boolean-operators` on line 85: extracted `isValidLimitValue` predicate, reducing each expression to ≤2 operators

No regressions introduced — 0 tests written this round (mechanical fix only), 0 regressions caused.

Unrelated smells noticed but not touched: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint camelcase and max-boolean-operators findings","tdd_next":"acceptance green"}}