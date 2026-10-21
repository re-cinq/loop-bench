Moved `beforeSession` inside the existing `try` and updated the spec to state that cleanup runs before any provider call. The focused test failed before the change and passed afterward. Updated the DoD checklist and committed/pushed as `8928bec`; the branch is even with its upstream, and `origin/main` merged cleanly.

The CHANGELOG facet remains for the next round. One test was red in my RED phase; no regressions are known because CI has not reported a verdict. `lore-query-trace` was unavailable in the pod, and the repository’s test descriptor script exposes no `spec` field to stamp.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try and record cleanup timing in the spec","tdd_next":"Document the consumer-visible change in CHANGELOG"}}