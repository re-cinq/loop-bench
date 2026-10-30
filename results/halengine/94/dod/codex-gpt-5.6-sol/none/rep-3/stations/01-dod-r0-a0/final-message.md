Defined and pushed one direct acceptance test plus the linked spec guarantee and `.lore/dod.md`.

Test command:

`npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts --runInBand`

Expected red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
- Expected  - 29
+ Received  +  0
...
- "hook": "onError"
- "hook": "afterSession"

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The rejection already preserves the original error; the test fails specifically because `onError` and `afterSession` never run.

Commit: `04d596a test(orchestrator): define failed setup lifecycle`

Branch is pushed, current with `origin/main`, and aligned with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}