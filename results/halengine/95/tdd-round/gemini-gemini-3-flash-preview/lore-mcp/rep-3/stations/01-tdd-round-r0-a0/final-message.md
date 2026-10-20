I have completed the task.

**Changes made:**
-   Modified `src/orchestration/chatOrchestrator.ts` to ensure `onError` is called for every rejection inside the turn, not only for `Error` instances.
-   Non-`Error` rejections (strings, plain objects, or `undefined`) are wrapped in an `Error` instance with the original rejection set as the `cause`.
-   Added a new unit test file `src/orchestration/onErrorNonError.test.ts` reproducing the issue with string, plain object, and `undefined` rejections.
-   Updated `CHANGELOG.md` to describe the behavior change for consumers.
-   Repointed spec anchors in `specs/hal-engine-config-hooks/spec.md` using `npm run spec:names -- --fix`.
-   Updated `.lore/dod.md` to reflect that all facets are complete.
-   Formatted all modified files using `prettier`.

**Verification:**
-   All three new test cases in `src/orchestration/onErrorNonError.test.ts` pass.
-   All 26 existing tests in `src/orchestration/chatOrchestrator.test.ts` pass, confirming no regressions for `Error` instances.
-   Spec link validation passed after repair.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"In src/orchestration/chatOrchestrator.ts, coerce a caught non-Error rejection to an Error with a readable message (while passing an Error instance through unchanged) so hooks.onError always fires on any rejection inside the try block.","tdd_next":"acceptance green"}}