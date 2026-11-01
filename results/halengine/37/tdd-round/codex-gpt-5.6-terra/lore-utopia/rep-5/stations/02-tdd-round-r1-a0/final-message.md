Implemented and pushed `2ced45b`.

- Static schemas now compile at registration; errors name the tool.
- Validators are cached for static and function-resolved schemas.
- Wrong-type rejections name the field path and expected type without values.
- Repaired reported lint issues and updated traceability/DOD.
- Ran only the new focused registry test; it passed. Acceptance tests were not run locally.
- Prior CI had 0 red tests written this round and 2 pre-existing acceptance-test regressions; both were addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at registration time and cache validators by schema object reference","tdd_next":"Validate input in ToolRegistry.execute before executor invocation and complete the remaining documented/tested facets"}}