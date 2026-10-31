Implemented and pushed `f750c9d`.

- Static schemas now compile at registration; invalid schemas name the tool.
- Dynamic schema validators cache by schema object reference.
- Fixed the CI-reported type-safety and lint issues.
- Focused new unit test passed. Acceptance tests were not run locally as instructed.
- Red tests: 1 newly written red test; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap).","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at specs/hal-engine-tool-input-validation/spec.md."}}