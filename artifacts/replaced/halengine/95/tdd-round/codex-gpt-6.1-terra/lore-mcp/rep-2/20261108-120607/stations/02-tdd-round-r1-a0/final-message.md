Made the acceptance fixture’s timestamp deterministic to address CI’s lint finding, without changing its assertions. Committed and pushed as `ec57eac`; the branch is up to date with `origin/main` and its upstream.

No tests ran locally: this was a CI lint repair, and the specified test is an acceptance test reserved for CI. The previous CI verdict reported **0 red tests written in this round and 0 test regressions**. CI still needs to confirm the existing Error-instance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"make the acceptance fixture timestamp deterministic for CI lint","tdd_next":"confirm existing Error-instance tests remain green in CI"}}