Added and pushed commit `6f3c635`.

- New failing acceptance tests: `src/orchestration/tools/registry.acceptance.test.ts`
- Added spec traceability and `.lore/dod.md`
- No production code changed
- Formatted changed files
- Branch is clean and synced with upstream

Actual failures include:

- `Received string: "forecast"` instead of a validation error
- `Received string: "unreachable"` for wrong-typed input
- `Expected: 1, Received: 0` schema reads
- `function did not throw` for the invalid schema

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}