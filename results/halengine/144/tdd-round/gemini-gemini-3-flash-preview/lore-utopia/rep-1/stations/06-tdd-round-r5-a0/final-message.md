Fixed CI failures reported in the previous round brief:
- Resolved a typecheck error in `src/transport/ws/messageHandler.test.ts` by explicitly typing the `listFor` mock and importing `SessionSummary` and `SessionListOptions`.
- Fixed `re-lint/no-nested-if` violations in `src/transport/ws/validation.ts` by flattening `validateListSessionsMessage`.
- Added missing spec links for traceability in `src/transport/ws/subprotocol.test.ts`, `src/transport/ws/validation.test.ts`, and `src/types/messages.test.ts` to satisfy `re-lint/require-spec-link`.
- Formatted modified files with Prettier.
- Verified that all modified test suites pass with Jest (80 tests total).

No new tests were added this round, and no regressions were found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures (typecheck, eslint, spec-links)","tdd_next":"acceptance green"}}