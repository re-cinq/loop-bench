I have completed the round for ticket #37, "Validate tool input against the registered inputSchema".

### Summary of Changes

1.  **Fixed CI Failures**:
    *   Resolved type errors in `src/orchestration/tools/registry.ts` related to `ajv` options and error object properties.
    *   Addressed ESLint `max-member-chain` violation in `registry.ts` by refactoring the error mapping logic.
    *   Fixed ESLint `max-expects` violation in `src/orchestration/tools/registry.test.ts` by consolidating expectations.
2.  **Expanded Test Coverage**:
    *   Added unit tests to `src/orchestration/tools/registry.test.ts` for:
        *   Extra property pass-through.
        *   Rejection of wrong-typed fields without leaking values.
        *   Validation of dynamic (function-valued) tool definitions.
        *   Caching of compiled static schemas.
        *   Handling of unknown tool names.
    *   Added a unit test to `src/orchestration/chatOrchestrator.test.ts` to verify that tool validation failures are correctly fed back to the AI provider as a `tool_result`, enabling recovery.
3.  **Updated Documentation and Examples**:
    *   Updated `example/weather-tool.ts` to remove redundant manual validation.
    *   Revised `docs/adding-a-tool.md`, `README.md`, and `.specify/spec.md` to state that tool inputs are now automatically validated against their schemas.
    *   Updated `adrs/ADR-002-response-validation.md` to record the adoption of tool input validation.
    *   Updated the technical specification `specs/hal-engine-tool-input-validation/spec.md` to set its status to `Implemented` and added links to the new unit tests.
4.  **Finalized Definition of Done**:
    *   Ticked off all remaining facets in `.lore/dod.md`.

All changed files have been formatted with Prettier, committed, and pushed to the branch. The branch is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests and update docs","tdd_next":"acceptance green"}}