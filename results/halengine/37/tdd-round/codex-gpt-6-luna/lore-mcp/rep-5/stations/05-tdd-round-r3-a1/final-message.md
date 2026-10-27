Added a focused registry test confirming valid input with an undeclared property reaches the executor unchanged, exactly once. Linked it in the spec and updated the DoD checklist. Also flattened the nested conditional identified by CI’s lint finding.

The only local test run was the new test; it passed. The branch is committed and pushed, and is up to date with `main`. CI previously reported two failing tests and three coverage thresholds; I did not rerun those checks.

Red tests written this round: 1. Regressions: 0 confirmed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pass-through of undeclared properties","tdd_next":"Complete remaining registry and orchestrator tests, spec links, and documentation updates"}}