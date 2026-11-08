I have completed the round for ticket #37, "Validate tool input against the registered inputSchema". I have implemented the missing unit tests, updated the documentation, and established traceability links in the specification.

### Changes Made:
- **Registry Configuration:** Updated `Ajv` in `ToolRegistry` to include `validateFormats: false`, aligning with the project's strictness guidelines.
- **Unit Testing:**
    - Added tests in `src/orchestration/tools/registry.test.ts` to verify:
        - Unlisted extra properties are passed to the executor unchanged.
        - Static tool schemas are compiled exactly once.
        - Dynamic tools (function-valued definitions) correctly re-validate when their schemas change.
        - Executing an unregistered tool name throws an "Unknown tool" error.
    - Added a comprehensive loop test in `src/orchestration/chatOrchestrator.test.ts` demonstrating a model receiving a validation rejection and successfully retrying with corrected input.
- **Documentation & Examples:**
    - Refactored `example/weather-tool.ts` to remove redundant defensive casting and defaulting, as the engine now guarantees schema-valid input.
    - Updated `README.md`, `docs/adding-a-tool.md`, and `.specify/spec.md` to reflect that `inputSchema` is now automatically enforced.
    - Added a new entry for version `0.4.0` in `CHANGELOG.md`.
    - Updated `adrs/ADR-002-response-validation.md` to mark tool input validation as implemented.
- **Traceability:**
    - Linked all new tests to their corresponding requirements in `specs/hal-engine-tool-input-validation/spec.md` and updated its status to **Implemented**.
    - Updated `.lore/dod.md` to mark all remaining facets as completed.

### Verification:
- Ran all unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`, all 30 tests passed.
- Verified that the `repoint-spec-anchors.mjs` logic correctly identifies test declarations.
- Formatted all modified files using Prettier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md.","tdd_next":"acceptance green"}}