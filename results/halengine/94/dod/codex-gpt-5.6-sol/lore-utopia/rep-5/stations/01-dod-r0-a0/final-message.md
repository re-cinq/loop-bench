Defined and pushed the `direct` acceptance contract in commit `632501b`.

- Added one focused acceptance test.
- Updated the linked spec with the intended guarantee and cleanup assumption.
- Added `.lore/dod.md`.
- Branch is synchronized with `origin/loop-bench/94`.

Test command:

`npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`

Expected red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
● reports and cleans up a beforeSession failure before rejecting with the original error

- "hook": "onError"
- "hook": "afterSession"

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original `beforeSession failed` rejection was preserved; the failure is specifically that `onError` and `afterSession` never ran.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}