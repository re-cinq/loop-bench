Committed and pushed `dd12b7f`. The new unknown-tool test passed; since the behavior already existed, this was not a red-to-green code change. I also removed duplicated test setup and repaired the validation spec links. The remaining docs and orchestrator-test facet is unchecked.

Only the new test ran; no acceptance tests or CI checks were run. Red tests written this round: 0. Regressions confirmed: 0; the prior CI brief’s test failure did not identify a specific failing test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin the unchanged Unknown tool error for unregistered names","tdd_next":"Remaining unit/orchestrator tests and documentation"}}