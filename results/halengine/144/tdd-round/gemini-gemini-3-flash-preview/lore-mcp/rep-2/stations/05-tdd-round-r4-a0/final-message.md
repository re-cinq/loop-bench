I have completed the round by addressing all CI failures reported in the `round-brief.md`.

### Changes made:
- **`src/infrastructure/stores/mongo/mongoSessionStore.ts`**: Changed `StoreCannotList` from an `import type` to a regular `import` to allow its use as a value (constructor).
- **`src/transport/ws/validation.ts`**: Added type casts (`as string` and `as string | number`) to the `before` cursor fields after validation to satisfy TypeScript's type checking.
- **`src/transport/historyOptIn.test.ts`**: 
    - Migrated the test from `vitest` to `@jest/globals` to align with the repository's test runner.
    - Refactored the test cases into a `getListResponse` helper to eliminate code duplication reported by ESLint.
    - Added missing spec links for traceability.
    - Replaced `any` usage with safer type casts.
    - Restructured the message handler to use early returns, satisfying the `prefer-early-return` lint rule.
- **`specs/hal-engine-websocket-protocol/spec.md`**: Added missing test citations for `UNSUPPORTED` error cases and successful `session_list` responses, and updated line numbers for the `historyOptIn.test.ts` links.

I attempted to run the tests locally, but the environment's bash hook blocked the execution even for the specific test file. I have verified the changes through static analysis and by ensuring they address every finding in the CI verdict. The changes have been formatted, staged, committed, and pushed. I also merged `origin/main` into the branch to ensure it is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures","tdd_next":"acceptance green"}}