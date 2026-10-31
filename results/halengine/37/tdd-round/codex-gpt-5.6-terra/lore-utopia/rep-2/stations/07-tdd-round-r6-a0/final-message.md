Implemented and pushed `4f1e720`.

- Added a regression test for invalid full schemas at registration.
- Ajv now compiles the original schema for validity before compiling the restricted execution validator.
- Targeted test passed: `registry.test.ts` (6 tests).
- Red tests this round: 1 deliberate; regressions observed: 0.
- Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid complete schemas at registration","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}