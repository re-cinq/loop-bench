Implemented and pushed commit `ab782f7`.

- Added non-`Error` wrapping with preserved `cause`.
- Added focused unit test; red then green.
- Updated changelog, spec traceability, and DoD.
- 1 red test was ours; 0 regressions observed.
- Branch is up to date with upstream.
- CI status unavailable (Lore returned 404 for branch).

Tests run: only the new focused test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError and document the consumer-facing change","tdd_next":"confirm existing Error-instance tests remain green"}}