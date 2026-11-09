Fixed both reported CI lint findings: added the missing spec link and removed the `else` branch. Committed and pushed as `0a8f4a8`; the branch is up to date with `origin/main` and its upstream.

No tests ran locally, and no new red-green-refactor test was written; this visit addressed the prior CI findings only. CI reported **0 red tests and 0 test regressions**. The public total-usage contract remains the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the reported usage test lint findings","tdd_next":"Make the public total-usage contract explicit"}}