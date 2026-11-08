I have fixed the CI failures by addressing the root causes identified in the build report:

1.  **Fixed Ajv ESM Import**: Changed the import in `src/orchestration/tools/registry.ts` to `import Ajv from 'ajv'`, which correctly resolves the `Ajv` constructor in both the local environment and CI. I also added type-safe handling for both Ajv v6 (`dataPath`) and v8 (`instancePath`) to ensure robust error reporting regardless of the installed version.
2.  **Implemented Tool Input Validation**: Added logic to `ToolRegistry.execute` to validate model-supplied input against the tool's `inputSchema` before execution. Validation failures are returned as a `ToolResponse` result, allowing the AI model to correct the call within the tool-round budget.
3.  **Resolved ESLint Errors**:
    *   Flattened the logic in `src/orchestration/tools/registry.acceptance.test.ts` to satisfy `re-lint/prefer-early-return`.
    *   Broke up deep member access chains to satisfy `re-lint/max-member-chain`.
    *   Added the original error as a `cause` to the thrown error in `registry.ts` to satisfy `preserve-caught-error`.
4.  **Added Comprehensive Tests**: Updated `src/orchestration/tools/registry.test.ts` with new tests covering:
    *   Rejection of missing required properties.
    *   Rejection of wrong-typed properties.
    *   Pass-through of undeclared extra properties.
    *   One-time compilation of static schemas.
    *   Per-call resolution and caching of function-valued tool definitions.
    *   Redaction of input values from logs and error results.
5.  **Updated Documentation and Specifications**: Reflected the new validation behavior in `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md`, including required citations for all new tests.
6.  **Changelog**: Added an entry to `CHANGELOG.md` documenting the new feature and the related breaking change in `register`.

All tests passed locally, and the build is now type-safe and formatted correctly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Validate tool input against inputSchema in ToolRegistry.execute, fix Ajv ESM import, and resolve related ESLint errors."}}