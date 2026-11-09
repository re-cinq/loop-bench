Committed and pushed static schema compilation (`558aed5`). Invalid static schemas now fail at registration with the tool name; Ajv is a runtime dependency and the package version is bumped to 0.4.0.

The new test failed before the change and passed afterward. That was **1 red test written this round and 0 identified regressions**. The Lore coverage graph was unavailable, and no prior CI verdict was present. Acceptance tests remain for CI to judge.

The next facet is reusing static validators and caching dynamic schemas. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static input schemas at registration","tdd_next":"reuse static validators and cache dynamic schemas"}}