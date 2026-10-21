I have completed the TDD round for ticket #37, focusing on validating tool input against the registered `inputSchema`.

### Changes Summary

1.  **CI Failures Fixed**:
    *   Resolved the `typecheck` error in `src/orchestration/tools/registry.ts` by switching the `Ajv` import to a named export, which correctly exposes the `Options` type.
    *   Fixed the `eslint` `preserve-caught-error` finding by adding the `cause` property to the error thrown during schema compilation.
    *   Fixed `eslint` findings in `src/orchestration/tools/registry.acceptance.test.ts` regarding `prefer-early-return` and `max-member-chain`.

2.  **Implementation**:
    *   Updated `ToolRegistry.execute` to validate incoming `input` against the tool's `inputSchema` before execution.
    *   Validation failures now return a `ToolResponse` with a descriptive `result` (e.g., `Tool input validation failed: /path: message`), allowing AI models to catch and correct errors within the tool loop.
    *   Ensured that offending property values are never echoed in return messages or logged, as per security requirements.

3.  **Testing & Traceability**:
    *   Added comprehensive unit tests in `src/orchestration/tools/registry.test.ts` covering missing required fields, type mismatches, and preservation of extra properties.
    *   Added an orchestrator-level test in `src/orchestration/chatOrchestrator.test.ts` to verify the recovery loop when a validation error occurs.
    *   Updated `specs/hal-engine-tool-input-validation/spec.md` with inline traceability links to the new tests and marked the status as **Implemented**.

4.  **Documentation & Examples**:
    *   Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect that tool input is now automatically validated.
    *   Refactored `example/weather-tool.ts` to remove defensive input checks, demonstrating the cleaner executor pattern enabled by this change.
    *   Noted the adopted validation strategy in `adrs/ADR-002-response-validation.md` and added a record of the change to `CHANGELOG.md`.

All unit and acceptance tests passed in the local environment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor, returning a ToolResponse ({result}) that names failing field paths and expected types/required fields without echoing or logging offending values, and add the one-line doc comment pointing at specs/hal-engine-tool-input-validation/spec.md","tdd_next":"acceptance green"}}