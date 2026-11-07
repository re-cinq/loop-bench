I have completed the first TDD round for ticket #37. 

**Summary of changes:**
- Added `ajv` (v8.17.1+) to `dependencies` and bumped the package version to `0.4.0` (MINOR bump).
- Implemented `inputSchema` compilation in `ToolRegistry.register` for static tool definitions, ensuring that invalid schemas cause an error naming the offending tool during registration.
- Added a `WeakMap` cache for compiled validators of function-valued `ToolDefinitionSource` schemas, resolving and compiling them per call as required.
- Created `src/orchestration/tools/registry.test.ts` with a unit test verifying that `register` throws for uncompilable schemas, citing the corresponding statement in `specs/hal-engine-tool-input-validation/spec.md`.
- Updated `CHANGELOG.md` with an entry for version `0.4.0` and updated the `[Unreleased]` and versioned links.
- Ticked the completed facets in `.lore/dod.md`.

**Next steps:**
The next round should focus on implementing the validation logic within `ToolRegistry.execute` before invoking the executor, including returning a `ToolResponse` with the rejection details and ensuring no identifying values are leaked in logs or results.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor"}}