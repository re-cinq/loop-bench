I have completed the TDD round for ticket #95.

### Accomplishments:
1.  **Fixed CI Failures:** I addressed the `spec-names` failures reported by CI by repointing the anchor links in `specs/hal-engine-config-hooks/spec.md` to the correct lines in `src/orchestration/onErrorNonError.round.test.ts`.
2.  **Implemented Improved Message Extraction:** I updated the error handling in `src/orchestration/chatOrchestrator.ts` to intelligently extract a `message` property from plain object rejections. This ensures that the `onError` hook receives a readable message (e.g., `'internal error'`) instead of the generic `[object Object]` when an object with a `message` property is thrown.
3.  **Expanded Test Coverage:** I added a new test case for `null` rejections and enhanced the existing tests in `src/orchestration/onErrorNonError.round.test.ts` to verify both the `cause` and the extracted `message` content.
4.  **Updated Documentation:** I updated `specs/hal-engine-config-hooks/spec.md` with a new validation link for the `null` case and kept `.lore/dod.md` current with the newly completed facets.

### Verification:
I successfully ran the updated test suite using `jest`, confirming that all 4 test cases in `src/orchestration/onErrorNonError.round.test.ts` (including the new `null` case and the improved object message extraction) pass. CI will judge the acceptance tests and the final build status.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Improve onError message for plain object rejections by extracting a message property if available","tdd_next":"acceptance green"}}