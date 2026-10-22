Fixed all CI failures reported in the round brief, including type errors, linting violations, and broken tests in `chatOrchestrator.test.ts`.

Key changes:
- In `src/orchestration/tools/registry.ts`, fixed a TypeScript error where `instancePath` was reported as missing on `ErrorObject` by using a safer access pattern that accounts for version variations.
- In `src/orchestration/chatOrchestrator.test.ts`, resolved multiple ESLint errors (unused imports, deep member chains, excessive expectations per test, and long comments) and fixed type mismatches in `OutgoingMessage` and `SessionEntry`.
- Fixed the failing tests in `chatOrchestrator.test.ts` by:
    - Aligning tool names between registration and usage.
    - Switching to `scriptedProvider` for more realistic tool-loop simulation.
    - Adjusting test expectations to account for the division of responsibility between the orchestrator and the message handler regarding session mutations.
- Updated spec links in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` to point to the correct test lines after the refactoring.

Verified that `src/orchestration/chatOrchestrator.test.ts` now passes all 24 tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}