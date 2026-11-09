Implemented and pushed the non-`Error` hook handling in commit `f154cfe`. The hook receives an `Error` with the original rejection as its cause; the caller still receives the original value.

The new test failed before the change and passed afterward. One red test was mine; no regressions were reported. Acceptance tests were left to CI, and the branch is up to date with its upstream.

The Lore graph was unavailable, and the repository’s test descriptor script does not expose a `spec` field. The test is stamped and linked from the spec. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Call onError with a wrapped non-Error rejection","tdd_next":"Verify object and undefined rejection causes and propagation"}}