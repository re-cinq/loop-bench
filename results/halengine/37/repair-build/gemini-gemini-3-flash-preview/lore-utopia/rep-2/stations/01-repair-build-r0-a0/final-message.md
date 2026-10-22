I have fixed the red build for ticket #37 by implementing tool input validation and resolving the underlying configuration and linting issues.

### Summary of Changes

1.  **Fixed Ajv ESM Integration**: Corrected the `Ajv` import in `src/orchestration/tools/registry.ts` to use the default export, resolving the `SyntaxError` and `typecheck` failures seen in CI.
2.  **Implemented Tool Input Validation**:
    *   Updated `ToolRegistry.execute` to validate incoming `input` against the tool's `inputSchema` before execution.
    *   Validation failures now return a `ToolResponse` describing the error (naming field paths and constraints) instead of throwing, allowing the model to correct its call within the tool loop.
    *   Added a `WeakMap` cache to reuse compiled validators for static and function-valued tool definitions, ensuring high performance.
    *   Ensured that sensitive input values are never echoed in rejection messages or logs.
3.  **Resolved ESLint Failures**:
    *   In `src/orchestration/tools/registry.acceptance.test.ts`, refactored the mock provider to avoid deep member chaining and satisfied the early-return preference.
    *   Added the required `cause` property to thrown errors in `registry.ts`.
4.  **Comprehensive Testing**:
    *   Expanded `src/orchestration/tools/registry.test.ts` to cover all acceptance criteria, including required property checks, extra property pass-through, type mismatch handling, and unknown tool name protection.
    *   Verified that dynamic tool definitions correctly re-validate when their schemas change.
5.  **Documentation and Examples**:
    *   Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect that input validation is now automatic and executors no longer need defensive checks for schema-covered fields.
    *   Updated `example/weather-tool.ts` to remove redundant validation logic.
    *   Added a `MINOR` version entry to `CHANGELOG.md`.

All tests passed locally, and the changed files have been formatted according to the project's standards.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv import for ESM, implemented tool input validation in ToolRegistry.execute with caching, and resolved ESLint failures."}}