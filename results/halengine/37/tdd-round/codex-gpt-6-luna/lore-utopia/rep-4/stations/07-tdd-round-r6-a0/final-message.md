Fixed the nested required-property path reported by CI, moved the helper below its caller, and added a registry test for the unknown-tool error. The registry test file passed: 5 tests. No regressions remain in the prior CI verdict; no acceptance tests were run.

Committed and pushed both changes. The branch is up to date with its upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin the existing Unknown tool: <name> throw with a registry unit test and link its contract statement in the spec","tdd_next":"Add remaining unit tests and validation documentation updates"}}