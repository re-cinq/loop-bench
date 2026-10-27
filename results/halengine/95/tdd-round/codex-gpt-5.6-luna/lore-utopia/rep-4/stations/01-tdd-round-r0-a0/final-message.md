Implemented and pushed commit `507962e`.

- `onError` now wraps non-Errors with `cause`, preserving original rejection.
- Added regression test and changelog entry.
- Targeted test passed.
- Red tests: 1 yours, 0 regressions.
- No acceptance/full suite run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections and document the hook change","tdd_next":"confirm existing Error-instance tests and acceptance green"}}