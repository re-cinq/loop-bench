I have completed the round by refactoring the tests in `src/orchestration/chatOrchestrator.test.ts` to resolve several ESLint violations (`re-lint/max-expects` and `re-lint/no-duplicate-code`) that were introduced in the previous round and were blocking the CI. 

Specifically, I:
- Introduced a `rejectingProvider` helper to consolidate duplicate mock provider definitions.
- Created a `captureOnError` helper within the `onError` test suite to handle orchestrator setup and error capture, reducing code duplication.
- Refactored the `it` blocks to use a single `expect` call with an object literal, complying with the project's linting rules and improving test readability.
- Ran `scripts/repoint-spec-anchors.mjs` to update the spec links in the markdown documentation, which had shifted due to the test refactoring.
- Verified that all tests in `src/orchestration/chatOrchestrator.test.ts` pass and that the project is now ESLint-clean.

The previous round's implementation of non-`Error` rejection coercion in `src/orchestration/chatOrchestrator.ts` remains intact and is now supported by clean, passing tests that adhere to the project's engineering standards.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm existing Error-instance tests in src/orchestration/chatOrchestrator.test.ts remain green","tdd_next":"acceptance green"}}