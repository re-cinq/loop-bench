Added and pushed commit `39844c0`.

- Strategy: `direct`
- Added `src/orchestration/onError.acceptance.test.ts`
- Added `.lore/dod.md`
- Updated spec traceability
- Branch is up to date with upstream; `origin/main` was already merged

Ran:

```text
npm test -- --runInBand src/orchestration/onError.acceptance.test.ts
```

Failure:

```text
Expected length: 1
Received length: 0
```

All three acceptance cases fail at the missing `onError` call.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}