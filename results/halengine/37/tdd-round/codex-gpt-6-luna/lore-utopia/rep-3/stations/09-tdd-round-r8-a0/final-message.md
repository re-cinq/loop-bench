Implemented and pushed commit `21a8a07` (`Clarify enum tool input rejections`). Enum failures now identify the constraint without exposing the supplied value. I also repaired the reported registry lint issues and updated the affected spec links and status.

The single test I wrote passed. Its isolated run reported unmet suite coverage thresholds, which are expected when running only one test. CI’s test failure details weren’t available from Lore for this branch, so I couldn’t verify whether that verdict is resolved.

- Red tests written this round: 1; regressions: 0.
- `origin/main` was already merged; the branch is clean and not ahead of upstream.
- Next facet: finish the remaining tests and documentation updates in `.lore/dod.md`.
- Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Identify enum as the failed constraint in safe input rejections without returning the supplied value","tdd_next":"Complete remaining unit tests, orchestrator retry coverage, and documentation updates"}}