Implemented and pushed one TDD round (`8787e90`).

- Added Ajv-backed execute-time input validation with safe rejection responses.
- Added and passed the new focused registry test.
- Updated spec traceability and DoD.
- Red tests: 1 written by this round; regressions: 0.
- Next facet: compile static schemas at registration and cache dynamic-schema validators.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor","tdd_next":"Compile static ToolDefinition.inputSchema at register time and cache function-valued schema validators"}}