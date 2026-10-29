Committed and pushed the round. The new test failed before the fix and passed after the refactor; it is the only test I ran locally. I also repaired the prior CI lint findings and stale spec links. The branch is synced with its upstream and `main`.

The prior CI verdict reported **0 red tests of mine and 0 regressions**. CI will judge this push’s acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle rejected values whose string conversion throws","tdd_next":"acceptance green"}}