Implemented and pushed `47c006c`.

- Static schemas now undergo Ajv schema validation, then compile exactly once for reuse.
- Added a focused regression test and repaired the stale spec anchor.
- Focused test passed after the change; red tests: 1 mine during RED, 0 regressions.
- Formatter ran; branch is pushed and merged with current `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static schemas once and reuse the validator across executions","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}