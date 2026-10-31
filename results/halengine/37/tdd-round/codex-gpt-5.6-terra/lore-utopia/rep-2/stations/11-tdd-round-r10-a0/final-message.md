Committed and pushed `654cd74` (`fix(tools): validate local schema references`).

Added `$ref`/`$defs` preservation, a linked regression test, and updated DoD. The selected test passed; its command exited nonzero only on repository-wide coverage thresholds. Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve local JSON Schema references while filtering to the registry validation contract","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}