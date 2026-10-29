Committed and pushed the round as `4207a84`. The new test failed before the fix and passed afterward; it verifies that a `beforeSession` error reaches the caller while `onError` and `afterSession` run in order. The spec, changelog, and facet checklist are updated. The branch is up to date with `main` and fully pushed.

Red tests this round: 1 written here, 0 reported regressions. Acceptance tests remain for CI to judge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block and document the cleanup guarantee","tdd_next":"acceptance green"}}