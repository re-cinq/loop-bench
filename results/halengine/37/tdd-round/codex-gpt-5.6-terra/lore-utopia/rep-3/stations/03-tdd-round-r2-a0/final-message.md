Committed and pushed `0497648`.

- Added static-schema compilation reuse coverage; focused registry test passes.
- Repaired reported typing, lint, and spec-link issues.
- CI-reported red tests: 1 ours, 0 regressions.
- Next facet: cache validators for dynamic schema sources.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at register time and reuse its compiled validator across executions","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)"}}