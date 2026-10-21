I have completed the TDD round for Ticket #37: "Validate tool input against the registered inputSchema".

### Accomplishments:
1.  **Dependency Management**: Added `ajv` to `package.json` and `package-lock.json`, and bumped the package version to `0.4.0` (MINOR).
2.  **Implementation**:
    *   Updated `ToolRegistry` to compile static `inputSchema` at registration time, throwing an error naming the tool if the schema is invalid.
    *   Implemented a `WeakMap` cache for compiled validators of function-valued `ToolDefinitionSource` schemas, keyed by the schema object reference.
    *   Modified `ToolRegistry.execute` to validate input against the resolved schema before calling the executor.
    *   Formatted validation errors to name the failing fields and types without leaking offending values.
    *   Ensured rejections return a `ToolResponse` instead of throwing, allowing the `chatOrchestrator` to feed the error back to the AI model for recovery.
3.  **Testing**:
    *   Created `src/orchestration/tools/registry.test.ts` with 7 unit tests covering all registry-related acceptance criteria, including required fields, type mismatches, extra property passthrough, static compilation errors, and dynamic schema caching.
    *   Verified that all new tests pass using `jest` with experimental ESM support.
4.  **Documentation & Traceability**:
    *   Updated `specs/hal-engine-tool-input-validation/spec.md` Status to "Shipped" and added traceability links to the new unit tests.
    *   Updated `README.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to reflect that tool input is now enforced.
    *   Updated `docs/adding-a-tool.md` and `example/weather-tool.ts` to remove defensive casting/defaults advice, as the engine now guarantees schema compliance.
    *   Added a `0.4.0` entry to `CHANGELOG.md`.

All changes have been formatted with Prettier, committed, merged with `origin/main`, and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"rejects input missing a required property with a ToolResponse and never calls the executor","tdd_next":"acceptance green"}}