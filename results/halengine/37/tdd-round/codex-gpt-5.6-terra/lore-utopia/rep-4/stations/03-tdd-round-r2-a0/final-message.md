Implemented and pushed `bf9bb6e`.

- Added a red-then-green unit test for nested required-field paths.
- Preserved AJV parent paths in rejection messages.
- Fixed CI-reported AJV typing and test lint issues.
- Focused registry test passed; no acceptance/full-suite runs.
- Red tests: 1 authored; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse that names full failing field paths","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}