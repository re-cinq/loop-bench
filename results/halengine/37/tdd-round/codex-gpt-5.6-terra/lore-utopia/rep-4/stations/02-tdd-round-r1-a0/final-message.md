Implemented and pushed `ca27176` (`cache dynamic tool schema validators`).

- Added a focused red–green test for dynamic schema-object caching; it now passes.
- Cached function-sourced validators with `WeakMap`.
- Repaired reported type/lint issues and updated traceability/DoD.
- Focused registry test passed; acceptance/full CI tests were not run locally.
- Red tests: 1 mine (intentional red phase), 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap).","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse that names failing paths and constraints without leaking values."}}