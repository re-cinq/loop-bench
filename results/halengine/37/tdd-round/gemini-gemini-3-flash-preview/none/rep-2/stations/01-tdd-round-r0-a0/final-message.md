I have completed one TDD round for Ticket #37: "Validate tool input against the registered inputSchema".

### Summary of Changes
- **Dependency Management**: Added `ajv` version 8 to `package.json` and bumped the package version to `0.4.0` (MINOR bump).
- **ToolRegistry Implementation**:
  - Initialized `Ajv` with `strict: false` and `validateFormats: false` as required.
  - Implemented static schema compilation at `register` time, throwing a descriptive error naming the tool if the schema is invalid.
  - Implemented input validation in `execute` before calling the tool executor.
  - Added a `WeakMap` cache for compiled validators of dynamic tools (function-valued sources).
  - Formatted validation error messages to name failing field paths and constraints without leaking offending values.
- **Verification**:
  - Created `src/orchestration/tools/registry.test.ts` with unit tests covering schema compilation errors, missing required properties, and wrong-typed properties.
  - Verified that all new unit tests pass.
- **Traceability**: Updated `specs/hal-engine-tool-input-validation/spec.md` with links to the new unit tests and updated `.lore/dod.md` to track completed facets.

The implementation ensures that tools receive only schema-valid input, while validation failures are returned as `ToolResponse` results rather than exceptions, enabling future work on model-driven recovery in the orchestrator loop.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"input validation in ToolRegistry","tdd_next":"orchestrator tool-loop recovery"}}