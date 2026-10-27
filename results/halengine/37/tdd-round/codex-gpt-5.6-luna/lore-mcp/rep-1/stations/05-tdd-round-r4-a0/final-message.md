Implemented one red–green–refactor round:

- Added safe validation diagnostics with paths/constraints, never values.
- Removed invalid Ajv option causing typecheck failure.
- Added traceable regression test.
- Ran only `registry.test.ts`: 4 passed.
- Formatted, committed, pushed, and merged `origin/main`.
- Red tests: 1 intentional, regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"safe validation diagnostics and CI repairs","tdd_next":"remaining acceptance facets"}}