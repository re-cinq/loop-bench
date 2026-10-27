Added the orchestrator recovery test and its spec link. Fixed the CI lint findings and corrected the missing `/` in type-error paths. The focused test passed; acceptance tests and the rest of the suite were not run.

One red test was mine; zero were regressions. Commit `e04d02d` is pushed, and the branch is even with its upstream. The remaining DoD facet is listed in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Orchestrator tool-loop recovery test and rejection path fix","tdd_next":"Remaining registry tests and documentation updates"}}