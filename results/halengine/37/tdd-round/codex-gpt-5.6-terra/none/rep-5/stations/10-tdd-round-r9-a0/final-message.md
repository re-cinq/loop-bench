Committed and pushed `113c9df` (`test tool input pass-through`); branch is synced with `origin/loop-bench/37`.

- Added a focused pass-through test, linked to the spec, and marked that facet complete.
- Fixed prior CI’s AJV resolver and lint findings.
- Test run: the new registry test passes.
- Prior CI showed 0 red tests written this round and 4 existing suites blocked by the resolver regression; repaired here.
- Remaining: docs, remaining tests, version bump/migration note.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pass schema-valid input with undeclared properties through to the executor unchanged, exactly once","tdd_next":"Add the remaining registry/orchestrator tests and documentation updates"}}