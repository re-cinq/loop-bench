Implemented and pushed commit `bd09d17`.

- Added enabled `list_conversations` WebSocket dispatch and history configuration.
- Added ISO summary serialization and `UNSUPPORTED` error code.
- Fixed CI teardown race.
- Focused test passed; no full suite/typecheck/lint run.
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enabled list_conversations dispatch with authenticated-user ISO summaries","tdd_next":"disabled or unsupported listing and store error handling"}}