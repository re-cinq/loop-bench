No drift from main. The push landed successfully.

Fixed all 5 ESLint failures from CI:
- `validation.ts:24,26` — added `eslint-disable-next-line camelcase` for the snake_case protocol type keys (`user_message`, `list_sessions`)
- `validation.ts:83,87` — moved `isValidLimit` and `validateBeforeCursor` to below their caller `validateListSessionsMessage` (satisfying `re-lint/callee-below-caller`; function declarations hoist so runtime is unaffected)
- `messageHandler.test.ts:874` — moved the `session` declaration down past `orchestrator`, `sent`, and `ws` so it's only 1 statement before its first use (satisfying `re-lint/declare-near-use` max of 5)

No new tests written (this was a lint-fix round). 0 red tests mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint camelcase/callee-below-caller/declare-near-use failures","tdd_next":"acceptance green"}}