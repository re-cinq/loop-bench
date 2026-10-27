Added and pushed commit `38c3a46`.

- New acceptance test: `src/orchestration/onError.acceptance.test.ts`
- Updated spec traceability and `.lore/dod.md`
- Strategy: `direct`
- Branch is synchronized with upstream.

Ran:

```text
npm test -- --runTestsByPath src/orchestration/onError.acceptance.test.ts
```

Expected red failure:

```text
Expected: 1
Received: 0
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}