Implemented and pushed commit `03bf9d0`.

- `onError` now receives wrapped non-`Error` rejections with preserved `cause`.
- Updated changelog, spec traceability, and DoD.
- Focused test passed; 1 intentional red test, 0 regressions.
- Base branch synchronized; working tree clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError","tdd_next":"confirm existing Error tests and acceptance green"}}