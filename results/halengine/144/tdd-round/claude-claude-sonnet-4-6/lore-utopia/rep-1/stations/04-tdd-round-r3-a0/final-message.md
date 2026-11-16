Branch is up to date. This round fixed all 6 ESLint errors from CI:

1. **`camelcase` on `user_message`/`list_sessions`** — switched the `validators` object literal to a `Map`, so the message-type strings are array elements, not object property identifiers.
2. **`re-lint/callee-below-caller`** — moved `validateLimitField` and `validateBeforeField` to below their caller `validateListSessionsMessage` (they were already written that way in my new file; prettier left them in place).
3. **`re-lint/no-vague-names` on `obj`** — renamed to `cursor`.
4. **`re-lint/max-member-chain` on `hal.wss.clients.size`** — destructured `const {wss} = hal` so the chain is `wss.clients.size` (2 hops).

Regressions this round: 0. Tests written this round: 0 (this was a repair-only round per the CI failures brief).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all 6 eslint CI failures from prior push","tdd_next":"acceptance green"}}