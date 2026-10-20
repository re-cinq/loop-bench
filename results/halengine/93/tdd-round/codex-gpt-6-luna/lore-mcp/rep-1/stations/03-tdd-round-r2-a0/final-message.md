Closed the no-tool usage facet and pushed commit `3a1169b`. The new real-orchestrator regression test failed with the deliberately wrong expectation, then passed after correction; both tests in its file are green. The previous CI type and lint findings were addressed. I did not run acceptance tests or rerun CI checks; CI will judge the push. There were **1 red test of mine and 0 regressions**.

The hooks spec and changelog update remain for the next round. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the no-tool usage behavior with a real orchestrator regression test","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers"}}