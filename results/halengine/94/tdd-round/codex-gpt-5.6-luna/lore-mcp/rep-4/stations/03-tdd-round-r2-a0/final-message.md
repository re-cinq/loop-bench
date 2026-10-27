Added a regression test pinning `beforeSession` → `onError` → `afterSession` order and corrected spec status to `In Progress` per CI.

- Red phase: new test failed with old placement.
- Green phase: 24 tests passed.
- Formatted, committed, pushed, and synchronized with `origin/main`.
- Red tests: 1 yours; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"beforeSession failure hook ordering and CI spec-status repair","tdd_next":"acceptance green"}}