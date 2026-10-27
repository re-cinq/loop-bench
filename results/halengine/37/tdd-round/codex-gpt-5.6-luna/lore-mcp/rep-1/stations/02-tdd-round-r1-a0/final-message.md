Implemented and pushed one TDD round for dynamic tool-schema validation.

- Added per-call resolution and `WeakMap` validator caching.
- Fixed prior CI type/lint/changelog issues.
- Updated spec traceability and DoD.
- Test: `src/orchestration/tools/registry.test.ts` passed.
- Red tests: 1 authored; regressions: 0 observed.
- Branch is pushed and up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache and validate function-valued tool definitions per resolved schema","tdd_next":"Remaining static validator reuse and input-validation acceptance facets"}}