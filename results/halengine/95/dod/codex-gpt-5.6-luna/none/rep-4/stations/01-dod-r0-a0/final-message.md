Added and pushed commit `b7cddb6`.

- Strategy: `direct`
- Added `src/orchestration/onErrorRejection.acceptance.test.ts`
- Added `.lore/dod.md`
- Updated the spec guarantee and anchor
- Branch synchronized with upstream

Ran:

```text
npm test -- --runTestsByPath src/orchestration/onErrorRejection.acceptance.test.ts
```

Failure confirms current behavior: `onErrorCallCount: 0`, `isError: false`, and `causeIsOriginal: false` for string, object, and `undefined` rejections.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}