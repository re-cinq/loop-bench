Added a registry test pinning the unchanged `Unknown tool: <name>` error. The focused test passed. I repaired the six shifted spec links and linked the new test, then committed and pushed as `bdd434f`; the branch is up to date with `origin/main` and its upstream.

This round added one test and had no regressions reported. The implementation was already present, so the test did not have a failing red phase. The broader registry, orchestrator, and documentation facet remains open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin the unchanged unknown-tool exception contract","tdd_next":"Complete the remaining registry and chat orchestrator tests, documentation, and changelog facets"}}