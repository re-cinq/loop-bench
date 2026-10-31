Implemented and pushed `c05f099` (`feat(tools): validate required tool input`).

- Added Ajv-backed rejection before executor invocation.
- Added a focused missing-required-field unit test; it passes.
- Marked the execute-time validation facet complete.
- CI status lookup was unavailable (branch not yet known to Lore).
- Red tests: 1 written by this round; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor","tdd_next":"Compile static ToolDefinition.inputSchema at register time and cache function-valued validators"}}