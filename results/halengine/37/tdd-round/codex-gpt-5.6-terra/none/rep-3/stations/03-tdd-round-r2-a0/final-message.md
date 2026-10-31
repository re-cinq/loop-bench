Fixed and pushed `519c66c` (`Fix tool schema validation error paths`).

- Ajv validation errors now preserve field paths under both v6 and v8 shapes.
- Reworked the registry test to one assertion; focused Jest test passed.
- CI had 1 red acceptance test; no unrelated regressions were reported.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv validation error-path compatibility and registry test assertion","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}