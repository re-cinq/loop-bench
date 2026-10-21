Added and pushed commit `152e771`, covering unchanged passthrough of valid input with an extra property. The focused registry test passed (4 tests). Also fixed the reported registry type error and lint findings; `origin/main` was already merged, and the branch is up to date.

The prior CI brief reported a test job failure but its log was truncated before identifying the failing test, so I can’t classify that failure as ours or a regression. The Lore trace tool was unavailable. No unrelated smells were found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Valid input with undeclared extra properties passes through unchanged","tdd_next":"Complete remaining registry and orchestrator tests, documentation, and changelog work"}}