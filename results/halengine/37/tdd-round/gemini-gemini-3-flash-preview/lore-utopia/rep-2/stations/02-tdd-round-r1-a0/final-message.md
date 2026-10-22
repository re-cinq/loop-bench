I have implemented tool input validation in `ToolRegistry.execute`, ensuring that all tool calls are verified against their registered `inputSchema` before execution.

Key changes:
- **Input Validation:** `ToolRegistry.execute` now uses `ajv` to validate input. If validation fails, it returns a `ToolResponse` with a descriptive `result` instead of calling the executor or throwing an error. This allows the model to receive feedback and potentially correct its call in subsequent rounds.
- **CI Fixes:**
    - Resolved the TypeScript error regarding the `strict` property in `Ajv` options by using proper type imports.
    - Fixed `preserve-caught-error` in `registry.ts` by attaching the original error as the `cause`.
    - Corrected ESLint violations in `registry.acceptance.test.ts` (`prefer-early-return` and `max-member-chain`).
    - Removed `any` cast in `registry.test.ts` to satisfy `@typescript-eslint/no-explicit-any`.
- **Traceability & Documentation:**
    - Added a new unit test in `src/orchestration/tools/registry.test.ts` verifying the validation logic.
    - Updated `specs/hal-engine-tool-input-validation/spec.md` with a traceability link to the new test.
    - Added a mandatory doc comment to the `execute` method pointing at its specification.
    - Added a user-facing entry to `CHANGELOG.md` under the `[Unreleased]` section.
- **Verification:** All 6 relevant tests (2 unit, 4 acceptance) pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before invoking the executor","tdd_next":"Add unit tests in src/orchestration/chatOrchestrator.test.ts and update docs/example files"}}