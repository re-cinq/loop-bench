Pushed `866b314` fixing the three CI lint findings by deduplicating hook-rejection setup and using one composite assertion. Updated shifted spec links and the DoD checklist; branch is merged with `origin/main` and fully pushed.

No tests ran locally: no new behavior test was warranted, and the instruction prohibits running existing/acceptance tests. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the focused hook tests so each test has one composite assertion and their shared rejection setup is not duplicated","tdd_next":"acceptance green"}}