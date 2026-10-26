Implemented and pushed commit `40f42cc`.

- `onError` now receives wrapped non-`Error` rejections with `cause`.
- Original rejection remains unchanged for callers.
- Added focused test for `undefined`.
- Updated spec, changelog, and DoD.
- Focused test passed; no acceptance/full suite run.
- Regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError with preserved cause","tdd_next":"confirm existing Error-instance tests remain green"}}