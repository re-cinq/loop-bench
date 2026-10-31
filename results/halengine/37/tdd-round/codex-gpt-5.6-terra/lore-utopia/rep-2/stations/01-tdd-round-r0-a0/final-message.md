Implemented and pushed `5919f87`.

- Added Ajv validation for missing required tool input before executor invocation.
- Added focused registry unit test; it passes.
- Added Ajv dependency and bumped version to 0.4.0.
- Updated spec trace link and checklist.
- Red tests: 1 authored; regressions: 0.
- Next facet: compile/cache schemas at registration and for dynamic definitions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv dependency with validation defaults and minor version bump","tdd_next":"Compile static ToolDefinition.inputSchema at register time and cache function-valued schemas by reference"}}