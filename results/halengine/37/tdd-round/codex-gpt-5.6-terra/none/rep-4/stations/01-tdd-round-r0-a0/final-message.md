Implemented and pushed `cb4c3bc`.

- Added Ajv-backed input rejection before executor invocation.
- Added focused registry unit test; it passes.
- Updated spec citation and DoD facet.
- Red tests: 1 written; regressions: 0 observed.
- Did not run acceptance tests, lint, typecheck, or build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor","tdd_next":"Compile static schemas at register time and cache function-source validators"}}