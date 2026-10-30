Implemented and pushed commit `4a9f89d`.

- Wrapped non-`Error` rejections with readable messages and preserved originals as `cause`.
- Caller still receives the original rejection.
- Added and passed one focused regression test.
- Updated spec traceability and checked the implementation facet.
- Red tests: 1 ours, 0 regressions.
- Next facet: confirm existing `Error`-instance behavior remains unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections before calling onError","tdd_next":"confirm existing Error-instance tests remain green without modification"}}