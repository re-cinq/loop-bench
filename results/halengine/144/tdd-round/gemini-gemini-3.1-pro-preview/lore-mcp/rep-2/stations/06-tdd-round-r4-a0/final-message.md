I have addressed the linting errors reported by CI on the last push.

The previous round refactored `validateMessage` into a lookup table (`validators`), which caused `eslint` to trigger the `camelcase` rule on the literal properties `'user_message'` and `'list_sessions'`. More importantly, that refactor directly contradicted ADR-006, which states that this trust-boundary type narrowing *must* remain a `switch` statement and provides a specific inline suppression for the `prefer-polymorphism` rule when the `switch` is extended to a third case.

I have restored the `switch` statement for `message.type` and added the `eslint-disable-next-line` directive exactly as prescribed by ADR-006. The code is committed, formatted, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}