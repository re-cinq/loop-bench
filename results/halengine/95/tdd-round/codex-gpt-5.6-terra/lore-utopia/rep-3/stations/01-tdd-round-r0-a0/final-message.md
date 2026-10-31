Implemented and pushed `05d09a4`.

- Non-`Error` rejections now invoke `onError` with an `Error` retaining the raw rejection as `cause`; callers still receive the original rejection.
- Added and ran only the new targeted regression test (red then green).
- Closed the coercion facet and updated the spec traceability link.
- 1 red test was mine; 0 regressions observed. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}