Implemented and pushed `2a53db3`.

- Non-Error rejections now invoke `onError` with an `Error` whose `cause` preserves the raw rejection; caller rethrow remains unchanged.
- Added a focused unit test; it went red then green.
- Updated the spec traceability link and ticked the implementation facet.
- Test result: 1 red test of mine, 0 regressions. The focused test passed (Jest emitted expected single-test coverage-threshold warnings).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the original rejection as cause","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}