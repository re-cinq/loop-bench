Fixed the reported nested-path defect: legacy Ajv `dataPath` values now become JSON Pointer paths, with escaping preserved. Added a focused test and linked it in the spec.

The test I wrote failed before the fix and passed after the implementation and refactor. No regressions were reported in the round brief; the failing test was the CI defect this round fixed. The formatter ran, and the commit was pushed. `git status` confirms the branch is synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"normalize legacy nested validation paths","tdd_next":"complete the remaining documentation and unit-test facets, including schema compilation and caching"}}