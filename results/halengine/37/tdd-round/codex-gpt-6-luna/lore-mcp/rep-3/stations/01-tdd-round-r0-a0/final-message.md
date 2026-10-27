Implemented the required-property rejection path in `ToolRegistry.execute` and added a focused test. The test was red before the implementation and green after formatting; it was the only test file run.

Committed and pushed as `df879bc`. The branch is up to date with `origin/main` and its upstream. CI lookup returned a Lore API 404, so I couldn’t retrieve a verdict. **Red tests:** 1 written this round; **regressions:** 0 identified. Acceptance tests remain for CI. The next facet is completing the dependency/version work and testing schema compilation and caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"required-property rejection path in execute with a focused regression test","tdd_next":"complete dependency/version facet and test schema compilation and caching"}}