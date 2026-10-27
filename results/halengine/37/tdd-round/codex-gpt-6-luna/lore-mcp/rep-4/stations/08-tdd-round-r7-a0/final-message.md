Added a focused registry test proving valid undeclared properties reach the executor unchanged and exactly once. Fixed the two CI-reported member-chain lint issues and added the spec citation. The registry test file passed; the implementation already supported this behavior, so the new test did not produce a red phase. Broader documentation and orchestrator coverage remain unchecked in the DoD.

Committed as `8dc6db1` and pushed. The branch is up to date with its upstream; `origin/main` had no new changes. No regression tests were reported in this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Valid undeclared properties pass through unchanged","tdd_next":"remaining registry and orchestrator tests and documentation updates"}}