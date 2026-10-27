Implemented and pushed commit `19aa448`.

- `onError` now receives wrapped non-`Error` rejections with preserved `cause`.
- Original rejection remains unchanged for callers.
- Added focused regression test and updated spec/DoD.
- Focused test passed; no regressions observed.
- Acceptance/CI checks were not run per instructions.
- Branch is pushed and up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError with original cause","tdd_next":"confirm existing Error-instance tests and add the CHANGELOG entry"}}