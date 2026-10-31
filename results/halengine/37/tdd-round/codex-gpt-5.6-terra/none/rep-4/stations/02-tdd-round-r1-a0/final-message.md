Completed and pushed `849758d`.

- Static schemas compile at registration; dynamic schemas use a `WeakMap` cache.
- Repaired CI-reported type compatibility, lint, and spec-link issues.
- New focused test passed (isolated run reports only global coverage warnings).
- Red tests: 1 written this round; 2 pre-existing acceptance regressions reported by CI.
- Next facet: remaining unit/docs/changelog work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time and cache function-source validators by schema object reference","tdd_next":"Add remaining unit tests and documentation/changelog updates"}}