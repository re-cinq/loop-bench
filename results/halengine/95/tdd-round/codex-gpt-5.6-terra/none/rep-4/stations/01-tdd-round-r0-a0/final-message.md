Implemented and pushed `67c280b`.

- Added a focused regression test; red then green.
- `onError` now receives an `Error` for non-Error rejections, preserving the original value as `cause`; callers still receive the original rejection.
- Updated the hook spec traceability and marked the coercion facet complete.
- Ran only the new selected test. No regressions reported locally; acceptance tests were intentionally left to CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Coerce caught non-Error rejections to Errors so onError always fires","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}