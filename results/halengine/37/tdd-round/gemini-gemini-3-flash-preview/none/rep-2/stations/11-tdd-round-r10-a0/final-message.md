I have fixed the CI failures and completed the requested facets for the tool input validation task.

### Changes Made:

*   **Fixed Type Errors in `ToolRegistry`**: Addressed `tsc` failures in `src/orchestration/tools/registry.ts` caused by incorrect `ajv` type resolution. Switched to named imports for `Ajv` and used type assertions to bypass missing property errors on `Options` and `ErrorObject`.
*   **Resolved ESLint Violations**: Fixed errors in `src/orchestration/tools/registry.test.ts` by combining multiple `expect` calls into single assertions using `toEqual` and added the missing spec link.
*   **Fixed Test Regression**: Resolved a failure in `src/providers/providerFactory.test.ts` where the `VertexAI` constructor threw an error during instantiation. I mocked the `@google-cloud/vertexai` package to ensure the factory arm remains testable without requiring real credentials.
*   **Updated Traceability**: Added a statement to `specs/hal-engine-tool-input-validation/spec.md` regarding nested property path formatting in validation errors and linked it to the corresponding test case.
*   **Verified Documentation**: Confirmed that `README.md`, `docs/adding-a-tool.md`, `.specify/spec.md`, `ADR-002`, and `CHANGELOG.md` correctly reflect the new validation behavior.

All 405 tests are now passing, and `typecheck` is green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests, update documentation and traceability","tdd_next":"acceptance green"}}