Defined and pushed the direct acceptance contract in commit `167f8f4`.

Added:

- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- `.lore/dod.md`
- Updated the hook spec with the intended guarantee and partial-initialization assumption.

Test command:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Actual failure:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
- Expected hook calls: onError, afterSession
+ Received hook calls: []

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original error already reaches the caller unchanged; the test fails specifically because neither required hook runs. The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}