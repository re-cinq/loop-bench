Committed and pushed `bf4e1ec`. Non-`Error` rejections now reach `onError` with their original value as `cause`; caller rejections stay unchanged.

One new test failed as expected, then passed. No regressions were reported; acceptance and existing tests remain for CI. Next: the changelog entry. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize non-Error rejections before calling onError","tdd_next":"Add the consumer-facing CHANGELOG entry"}}