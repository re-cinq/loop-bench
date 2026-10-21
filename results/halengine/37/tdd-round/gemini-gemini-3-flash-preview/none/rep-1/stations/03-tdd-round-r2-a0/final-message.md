I have fixed the CI failures (type errors, lint violations, and missing test coverage) and finalized the implementation of tool input validation.

### Changes:
- **`src/orchestration/tools/registry.ts`**:
  - Corrected `Ajv` import for ESM compatibility.
  - Fixed type errors related to potential `undefined` validators and `ErrorObject` property access.
  - Ensured `instancePath` is used correctly for error reporting.
- **`src/orchestration/chatOrchestrator.test.ts`**:
  - Imported missing `ToolResultContent` and `Message` types.
  - Resolved lint errors: merged multiple `expect` calls into `toMatchObject`, replaced `any` with proper types, and refactored `sendMessage` to use early returns.
- **`src/orchestration/tools/registry.test.ts`**:
  - Imported `jest` from `@jest/globals` to fix `ReferenceError`.
  - Added new tests for `Unknown tool` errors, static schema compilation reuse, and function-valued tool definition validation/caching.
  - Resolved lint errors by merging `expect` calls and removing `any`.
- **`specs/hal-engine-tool-input-validation/spec.md`**:
  - Updated all 8 testable statements with `([validated by ...])` links to their corresponding unit and acceptance tests.
  - Verified and manually updated all line number anchors after formatting.
- **Formatting**: Ran Prettier on all modified files to ensure compliance with project standards.

All 30 unit tests across the modified files are passing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md","tdd_next":"acceptance green"}}