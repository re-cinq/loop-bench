In this round, I have addressed the CI failures and completed the final facet for ticket #37, "Validate tool input against the registered inputSchema."

### Changes Made:
- **Registry Fixes:** Fixed several typecheck and ESLint errors in `src/orchestration/tools/registry.ts`, including improper `Ajv` usage, nested `if` statements, and missing `instancePath` types.
- **Unit Testing:** 
    - Added unit tests in `src/orchestration/tools/registry.test.ts` to verify `enum` validation and ensure no sensitive property values are leaked in error messages.
    - Added a unit test in `src/orchestration/chatOrchestrator.test.ts` to verify the feedback loop: when a tool call fails validation, the error is fed back to the model as a `tool_result`, allowing it to retry with corrected input.
- **Traceability:** Updated `specs/hal-engine-tool-input-validation/spec.md` to link the new tests and marked the status as **Implemented**.
- **Documentation & Examples:**
    - Updated `example/weather-tool.ts` and `docs/adding-a-tool.md` to reflect that input validation is now enforced by the engine, removing outdated warnings about untrusted input.
    - Updated `README.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to document the new validation behavior.
- **Maintenance:** Formatted all changed files with Prettier and updated `.lore/dod.md` to mark the final facet as complete.

All 29 unit tests passed locally. The changes have been committed and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}