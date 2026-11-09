Committed and pushed static schema compilation. Invalid static schemas now fail at registration with the tool name; the compiled validator is retained for the execution facet.

The one new test failed before the change and passed afterward. That was **1 red test written this round and 0 known regressions**; CI’s previous verdict was unavailable. No unrelated smells were acted on.

The branch is up to date with `origin/main` and its upstream. The next facet is caching validators for dynamic schemas.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool schemas at registration","tdd_next":"Cache validators for function-valued tool definitions"}}