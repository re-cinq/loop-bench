Implemented and pushed the direct acceptance-test contract in commit `72bb273`.

- Added `src/orchestration/nonErrorRejection.acceptance.test.ts`
- Added `.lore/dod.md`
- Updated the spec with test traceability
- Branch is synchronized with `origin/loop-bench/95`

Command run:

```text
npm test -- --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts
```

Expected red-bar output:

```text
FAIL src/orchestration/nonErrorRejection.acceptance.test.ts
● reports every non-Error rejection to onError without changing the caller rejection

Expected: "hookCalls": 1, "hookErrorIsError": true
Received: "hookCalls": 0, "hookErrorIsError": false

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The failure confirms string, object, and `undefined` rejections still reach callers unchanged but currently bypass `onError`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}