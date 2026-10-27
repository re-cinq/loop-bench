Implemented and pushed commit `83adf6f`.

- `onError` now receives wrapped non-`Error` rejections with `cause`.
- Original caller rejection remains unchanged.
- Updated spec, changelog, and DoD.
- Focused test: passed.
- Red tests: 1 yours, 0 regressions.
- Acceptance suite/lint/typecheck/build not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError for non-Error rejections","tdd_next":"confirm existing Error-instance tests remain green"}}