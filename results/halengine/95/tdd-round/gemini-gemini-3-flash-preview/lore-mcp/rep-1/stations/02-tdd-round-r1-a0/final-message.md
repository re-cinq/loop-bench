I have completed the round, focusing on resolving the lint failures that blocked the previous push while ensuring the fix for ticket #95 remains verified and correctly documented.

### Changes made:
- **Refactored Test Helpers:** Created `src/orchestration/onErrorNonErrorTestSupport.ts` to house shared session and provider factories. This resolved the `re-lint/no-duplicate-code` errors between the unit and acceptance tests.
- **Resolved Non-Determinism:** Replaced `new Date().toISOString()` with a fixed `SENT_AT` timestamp in the test support file, satisfying the `re-lint/no-nondeterministic-tests` rule.
- **Consolidated Assertions:** Refactored `src/orchestration/onErrorNonError.test.ts` to use a `captureError` helper and combined multiple `expect` calls into single `toMatchObject` assertions, resolving the `re-lint/max-expects` and internal `no-duplicate-code` failures.
- **Cleaned up Variables:** Prefixed unused caught error variables with `_` to satisfy `@typescript-eslint/no-unused-vars`.
- **Updated Traceability:** Synchronized the line number anchors in `specs/hal-engine-config-hooks/spec.md` with the refactored test files to maintain accurate spec-to-test mapping.
- **Verified Core Fix:** Confirmed that `onError` is correctly called with a coerced `Error` when a turn rejects with a string, a plain object, or `undefined`.
- **Regression Testing:** Verified that existing `Error`-instance tests in `chatOrchestrator.test.ts` remain green.

All unit tests passed locally using `jest`. The acceptance tests were refactored for cleanliness but were not run locally, as they are reserved for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix lint errors and update spec links","tdd_next":"acceptance green"}}