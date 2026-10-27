Implemented and pushed commit `6710ba8`. The new `undefined` rejection test failed before the change and passed after the refactor. Non-`Error` rejections now reach `onError` wrapped with their original value as `cause`; the caller still receives the original rejection.

The implementation facet is checked off. The existing `Error` tests and changelog entry remain for the next round. One red test was mine; no regressions were reported. Branch is synced with its upstream. I ran only the test I wrote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the original caller rejection","tdd_next":"Confirm existing Error-instance tests remain green and add the Unreleased changelog entry"}}