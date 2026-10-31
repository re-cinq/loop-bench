Repaired the reported lint/spec-link failures and pushed `b7a0dfd`.

- Consolidated hook-failure assertions to one atomic expectation.
- Re-anchored 24 shifted spec citations.
- Focused unit assertion passed; the single-test command exited nonzero only on global coverage thresholds.
- Acceptance test was not run locally, as required.
- Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported hook failure test contracts and spec anchors","tdd_next":"acceptance green"}}