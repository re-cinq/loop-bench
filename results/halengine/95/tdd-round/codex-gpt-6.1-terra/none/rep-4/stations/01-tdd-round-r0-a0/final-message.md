Implemented and pushed the `onError` conversion. Non-`Error` rejections are wrapped with the original value as `cause`; existing `Error` instances and caller-facing rejections retain their identity. The spec and changelog are updated.

The new test passed after first failing on the skipped hook. It was the only red test observed locally; no regressions were reported. The Lore coverage graph and prior CI verdict were unavailable, so CI must confirm the existing and acceptance tests. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError with an Error for non-Error rejections","tdd_next":"Confirm existing Error-instance tests remain green"}}