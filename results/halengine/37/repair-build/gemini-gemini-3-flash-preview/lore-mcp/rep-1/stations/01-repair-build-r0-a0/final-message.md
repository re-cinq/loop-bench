I have successfully fixed the RED build and implemented the tool input validation as requested in ticket #37.

### Changes Made:

1.  **ToolRegistry Implementation (`src/orchestration/tools/registry.ts`)**:
    *   Fixed the `Ajv` import to use the default export, ensuring compatibility with the project's ESM configuration and resolving the `SyntaxError`.
    *   Implemented tool input validation in `execute()` using the pre-compiled `validateInput` function.
    *   Refactored the registry to support function-valued `ToolDefinitionSource` objects. Definitions are now resolved and compiled per call, with a `WeakMap` cache to ensure performance and correctness for dynamic schemas.
    *   Ensured that validation failures return a `ToolResponse` instead of throwing, allowing the model to receive and correct its own errors.
    *   Redacted offending property values from both rejection messages and log entries, naming only the field path and the failed constraint.
    *   Added a one-line doc comment to `execute()` pointing to the detailed specification.
    *   Fixed TypeScript errors by correctly casting Ajv's `ErrorObject` and its parameters.

2.  **Testing**:
    *   Added a comprehensive suite of unit tests in `src/orchestration/tools/registry.test.ts` covering:
        *   Required field validation.
        *   Type mismatch validation.
        *   Pass-through of extra properties.
        *   Validation of dynamic schemas for function-valued tools.
        *   Schema compilation caching for static tools.
        *   Redaction of sensitive values in logs and responses.
        *   Handling of unknown tool names.
    *   Fixed ESLint errors in `src/orchestration/tools/registry.acceptance.test.ts` regarding early returns and member chain depth.

3.  **Documentation & Specification**:
    *   Updated `README.md` and `docs/adding-a-tool.md` to reflect that `inputSchema` is now enforced and that executors no longer need defensive validation for schema-defined fields.
    *   Updated `.specify/spec.md` and `specs/hal-engine-tool-input-validation/spec.md` to document the enforced validation contract, recovery loop, and caching behavior.
    *   Added a detailed entry to `CHANGELOG.md` covering the new validation features and the minor version bump.

I verified the fix by running the project's build and test suite, which are now green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv import for ESM, implemented tool input validation in ToolRegistry, and added comprehensive unit tests while fixing ESLint violations."}}