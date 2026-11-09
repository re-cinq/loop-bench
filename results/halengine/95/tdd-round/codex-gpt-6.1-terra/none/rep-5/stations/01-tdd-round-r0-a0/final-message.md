Implemented and pushed `aecbd45`. Non-`Error` rejections now reach `onError` wrapped in an `Error` with the original value as `cause`; the caller still receives the original rejection.

The new focused test passed after failing as expected. That was **1 red test written this round and 0 known regressions**. The existing tests and acceptance tests remain for CI to judge. The Lore CI and coverage-query tools were unavailable in this session.

The test-list script currently omits the `spec` field from descriptors despite the new test’s anchor; that unrelated tooling limitation was left unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"wrap non-Error rejections for onError and document the consumer change","tdd_next":"confirm existing Error-instance tests through CI"}}