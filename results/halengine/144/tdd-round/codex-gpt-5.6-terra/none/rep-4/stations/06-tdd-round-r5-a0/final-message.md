Implemented and pushed `927c30b` (`Harden WebSocket message validation`).

- Added/fixed prototype-collision validation regression.
- Repaired all 4 reported ESLint findings.
- Focused test passed: `conversationListValidation.test.ts`.
- Red tests: 1 written by this round; regressions: 0.
- Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject unknown WebSocket message types that collide with Object.prototype members","tdd_next":"acceptance green"}}