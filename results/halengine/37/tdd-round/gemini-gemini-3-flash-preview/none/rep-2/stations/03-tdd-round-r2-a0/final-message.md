I have completed the red-green-refactor round by implementing the remaining unit tests, fixing CI findings (lint errors and missing spec links), and updating all related documentation and metadata.

### Summary of Changes
- **Tests**: 
  - Fixed lint errors in `src/orchestration/tools/registry.test.ts` (missing spec links, unused variables, multi-line comments).
  - Added unit tests for static tool schema compilation count, extra property pass-through, and identifying data redaction on validation failure.
  - Added a test in `src/orchestration/chatOrchestrator.test.ts` verifying the orchestrator correctly handles tool rejection and allows for model recovery in the next round.
- **Traceability**: 
  - Updated `specs/hal-engine-tool-input-validation/spec.md` with new statements for registry metadata and added `([validated by ...])` links for all statements to their corresponding tests.
  - Successfully ran `scripts/repoint-spec-anchors.mjs` to verify all links.
- **Documentation**: 
  - Updated `example/weather-tool.ts` and `docs/adding-a-tool.md` to remove instructions for manual input validation and reflect the engine's new automatic enforcement.
  - Updated `README.md`, `.specify/spec.md`, and `adrs/ADR-002-response-validation.md` to document the new validation layer and its recovery mechanism.
- **Metadata**: 
  - Updated `CHANGELOG.md` for version `0.4.0` documenting the tool input validation features and metadata retrieval methods.
- **Maintenance**: 
  - Ran Prettier over all modified files.
  - Ticked the final facet in `.lore/dod.md`.

All 31 tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` are passing. The acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts` remain as they were, cited by the spec and passing in the baseline.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in registry.test.ts and chatOrchestrator.test.ts, link the remaining statements in spec.md, and update documentation/metadata files","tdd_next":"acceptance green"}}