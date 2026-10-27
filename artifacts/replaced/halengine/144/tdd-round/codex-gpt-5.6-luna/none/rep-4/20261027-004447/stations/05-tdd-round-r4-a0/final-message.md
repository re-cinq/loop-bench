Implemented and pushed commit `b47236a`.

- Added opt-in `transport.history.enabled`, defaulting off.
- Threaded history config through server and handler.
- Added focused regression test; 57 tests pass.
- Repaired reported type/spec-anchor CI issues.
- Merged latest `origin/main`; branch is synchronized.

One red test was mine; no regressions observed. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"history listing opt-in gating","tdd_next":"remaining acceptance facets"}}