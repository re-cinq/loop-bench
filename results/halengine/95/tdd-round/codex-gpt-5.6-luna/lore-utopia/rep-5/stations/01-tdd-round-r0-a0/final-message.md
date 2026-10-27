Implemented and pushed commit `5287804`.

- Added wrapping of non-`Error` rejections with preserved `cause`.
- Added focused regression test and traceability link.
- Updated CHANGELOG and DoD.
- Targeted test passed; acceptance suite, lint, typecheck, and build were not run.
- Red tests: 1 ours, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"onError wraps non-Error rejections with their original cause","tdd_next":"confirm existing Error-instance tests remain green"}}