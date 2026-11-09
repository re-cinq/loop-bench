Implemented and pushed the non-`Error` rejection facet in commit `9aeb79d`. The hook now receives an `Error` with the original rejection as its `cause`, while the caller receives the original value.

The new focused test failed before the change and passed afterward. That was one red test written this round and zero identified regressions. The branch is up to date with `origin/main` and its upstream.

The coverage graph tool was unavailable. The test carries a spec anchor, but the repository’s test-list script does not expose a `spec` field. The existing `Error`-instance checks and changelog entry remain on the checklist for a later round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError with a wrapped non-Error rejection and preserve its cause","tdd_next":"Add the changelog entry and confirm existing Error-instance tests through CI"}}