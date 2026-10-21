Implemented the first facet: `onError` receives an `Error` for non-`Error` rejections, with the original value in `cause`; the caller still receives the original rejection. Added one focused test and updated the spec and checklist.

The authored test failed before the change and passed afterward. One red test was mine; no regressions were reported. I couldn’t query Lore’s trace or CI tools because they weren’t available in this environment.

Committed and pushed as `1018482`. The branch is clean and even with its upstream. Remaining facets are confirming the existing `Error` tests and adding the changelog entry. No unrelated issues acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError while preserving the original rejection","tdd_next":"confirm existing Error-instance tests and add the changelog entry"}}