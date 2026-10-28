Moved `beforeSession` into the orchestrator’s `try` block so its rejection reaches `onError` and `afterSession` and still propagates to the caller. Updated the spec and checked off the implementation and spec facets in `.lore/dod.md`.

The authored test failed before the fix and passed after formatting. I did not run the acceptance test or any other tests. One red test was mine; no regressions were reported. The CHANGELOG facet remains for the next round.

Committed and pushed as `3ea3a65`; the branch is synced with `origin/main` and not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try and document its failure guarantee","tdd_next":"Document the consumer-visible change in CHANGELOG.md"}}