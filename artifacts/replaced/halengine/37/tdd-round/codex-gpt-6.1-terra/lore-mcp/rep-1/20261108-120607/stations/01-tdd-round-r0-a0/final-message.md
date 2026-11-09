Committed and pushed static schema compilation at tool registration. Invalid static schemas now throw an error naming the tool. The new test passed after first failing as expected.

The next facet is dynamic-schema caching and validation during execution. This round had **1 red test written here and 0 known regressions**; Lore could not find a CI record for the branch. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache dynamic schemas and validate tool input during execution"}}