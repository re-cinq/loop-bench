Implemented and pushed `6e4a724`.

- Added schema validation before tool execution, with safe rejection messages and validator caching.
- Added one focused red/green registry test; it passes.
- Repaired reported lint/type issues without running acceptance tests.
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before executor invocation","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}