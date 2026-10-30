Completed and pushed commit `746d8b5`.

- Added a focused regression test for AJV legacy `dataPath` errors.
- Preserved wrong-typed field names without leaking values.
- Fixed all reported TypeScript compatibility errors.
- Updated spec traceability and `.lore/dod.md`.
- Test file passed: 2 tests.
- Red tests this round: 1 ours, 0 regressions.
- Branch is synchronized with `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve validation field paths across AJV error shapes","tdd_next":"Add remaining unit tests, traceability links, and documentation updates"}}