I have completed the requested changes for ticket #95.

### Summary of changes
- **Tests**: I added a new test case to `src/orchestration/onErrorNonError.acceptance.test.ts` to verify that `onError` is correctly called when a provider rejects with `undefined`. I also updated all test cases in that file to explicitly assert that the `cause` property of the `Error` instance passed to `onError` captures the original rejection value (string, plain object, or `undefined`).
- **Documentation**: I updated `specs/hal-engine-config-hooks/spec.md` to include `undefined` in the list of handled rejection types and corrected the line number links to the corresponding tests in `src/orchestration/onErrorNonError.acceptance.test.ts`.
- **Definition of Done**: I ticked the existing acceptance tests in `.lore/dod.md` and added a new facet recording the verification of `undefined` rejections and the `cause` property assertion.

The implementation in `src/orchestration/chatOrchestrator.ts` and the `CHANGELOG.md` entry were already present from a previous round, and my tests confirmed their correctness. All 3 tests in the acceptance suite passed successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify onError is called with undefined rejection and assert cause","tdd_next":"acceptance green"}}