Implemented and pushed `9588da0` (`feat(tools): compile registered input schemas`).

- Static schemas now compile during registration; errors name the tool.
- Validators cache by schema object reference, including dynamic definitions.
- Added one focused unit test and its spec trace link.
- Fixed CI-reported type compatibility and acceptance-test lint issues.
- Ran only the new test selector; it passed (coverage-threshold noise is emitted by Jest).
- Merged `origin/main`; branch is pushed and current.

Red tests: 1 written this round, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap).","tdd_next":"Add remaining unit/documentation/changelog facet"}}