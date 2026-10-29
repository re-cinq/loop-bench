Fixed both CI findings in the acceptance test: it now uses a valid prompt config and one assertion that checks the original rejection and both hooks. Updated its spec anchor and line link, then formatted, committed, and pushed the repair. The branch is up to date with `origin/main` and its upstream.

No tests ran here; CI will judge the acceptance test. Red tests: 0 written this round, 0 regressions identified. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair the acceptance test's prompt config and assertion shape reported by CI","tdd_next":"acceptance green"}}