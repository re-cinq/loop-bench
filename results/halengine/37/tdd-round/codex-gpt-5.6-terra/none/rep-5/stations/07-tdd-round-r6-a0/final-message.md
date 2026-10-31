Implemented and pushed `251a696` (`Fix legacy enum validation paths`).

- Added a focused regression test for legacy dotted enum paths; it failed first, then passed.
- Fixed prior CI type and spec-link findings.
- Ran only `src/orchestration/tools/registry.test.ts` (6 passing).
- Red tests: 1 mine during RED phase; regressions: 0.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve enum property paths when validator errors expose legacy dotted dataPath fields","tdd_next":"Add remaining unit tests and documentation updates"}}