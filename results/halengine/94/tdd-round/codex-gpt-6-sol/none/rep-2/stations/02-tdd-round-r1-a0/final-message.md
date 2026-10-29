Committed and pushed the three CI fixes in `fa08b32`. The branch is up to date with `main` and its upstream.

The round ran no tests here because the only test changed was the acceptance test, which the ticket prohibits running locally. The previous CI report named **0 failing tests of mine and 0 regressions**; its failures were typecheck and lint findings. CI will judge the new push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the acceptance fixture, assertion shape, and spec status reported by CI","tdd_next":"acceptance green"}}