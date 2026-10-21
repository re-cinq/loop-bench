Implemented and pushed commit `92df3e3`. Non-`Error` rejections now reach `onError` as wrapped errors with their original value in `cause`; the caller still receives the original rejection. Added a focused test for `undefined` and updated the spec links and DoD.

The test I wrote failed before the change and passed after refactoring. **Red tests: 1 mine, 0 regressions.** I did not run acceptance tests or the full suite. Lore trace tools were unavailable.

The branch is up to date with `origin/main` and has no unpushed commits. Next round: confirm the existing `Error` tests and add the changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original rejection","tdd_next":"Confirm existing Error-instance tests and add the Unreleased changelog entry"}}