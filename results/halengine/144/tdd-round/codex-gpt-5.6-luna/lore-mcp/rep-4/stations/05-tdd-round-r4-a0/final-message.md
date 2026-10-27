Implemented and pushed commit `598efea`.

- Safe `SERVER_ERROR` handling with non-sensitive logging.
- `StoreCannotList` maps to `UNSUPPORTED`.
- Fixed listed type/lint issues.
- Added traceable regression test; focused test passes.
- Merged `origin/main`; branch is synchronized.
- Acceptance mismatch remains untouched because it conflicts with the ticket contract.

Red tests: 1 transient test failure during refactor, fixed; 0 regressions introduced this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"safe conversation-list failure handling","tdd_next":"remaining acceptance/spec facets"}}