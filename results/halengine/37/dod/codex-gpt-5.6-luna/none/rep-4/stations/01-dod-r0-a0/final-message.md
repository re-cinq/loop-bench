Added and pushed commit `32e3460`.

- Strategy: `direct`
- Added `.lore/dod.md`
- Added `src/orchestration/tools/registry.acceptance.test.ts`
- Formatted with Prettier
- Branch is synchronized with upstream

Acceptance command:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Red result: 1 passed, 3 failed. Key failures:

```text
Expected pattern: /location.*required/i
Received string:  "executor ran"

Expected pattern: /location.*required/i
Received: "executor ran"

Expected pattern: /weather/i
Received function did not throw
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}