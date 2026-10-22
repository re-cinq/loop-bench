I have completed the implementation of tool input validation for ticket #37.

Key changes include:
- **Dependency Update**: Added `ajv` to `package.json` and bumped the package version to `0.4.0`.
- **Schema Compilation**: Updated `ToolRegistry.register` to compile static `inputSchema` definitions at registration time. Invalid schemas now cause a synchronous error.
- **Input Validation**: Implemented validation in `ToolRegistry.execute`. Malformed tool calls are now rejected with a `ToolResponse` detailing the missing fields or type mismatches, without leaking sensitive values.
- **Tool-Loop Recovery**: Rejections are fed back to the orchestrator loop as `tool_result` messages, allowing the model to correct its call and retry within the `maxToolRounds` budget.
- **Caching**: Implemented a `WeakMap` in `ToolRegistry` to cache compiled validators for both static and function-valued tool definitions.
- **Tests**: Added 7 new unit tests in `src/orchestration/tools/registry.test.ts` and 2 new tool-loop integration tests in `src/orchestration/chatOrchestrator.test.ts`. Verified that all 31 tests in these files pass.
- **Documentation**: Updated `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to reflect that the engine now enforces tool schemas.
- **Traceability**: Added traceability links to `specs/hal-engine-tool-input-validation/spec.md` and synchronized them using the project's `spec:names` script.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}