Committed and pushed `3025b8e` (`refactor conversation list validation`).

- Added a focused red–green regression test ensuring unknown cursor fields are stripped.
- Refactored validation and shared duplicated test fixtures to address all 14 reported lint findings.
- Re-anchored affected spec citations.
- Ran only `src/transport/ws/validation.test.ts` (5 passing); no lint, acceptance suite, typecheck, or full build run locally.
- Intentional red tests: 1. Regression tests: 0.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sanitize list_sessions cursors while refactoring the CI-reported lint violations","tdd_next":"acceptance green"}}