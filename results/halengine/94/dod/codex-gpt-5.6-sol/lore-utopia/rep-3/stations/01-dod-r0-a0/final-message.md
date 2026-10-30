Implemented and pushed the direct acceptance-test DoD in commit `8d91db1`.

Added:

- `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- `.lore/dod.md`
- Spec traceability link

Focused test result:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
● reports and cleans up a beforeSession failure before rejecting with the same error

Expected calls included:
  onError
  afterSession

Received calls included only:
  beforeSession

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original error still reaches the caller; the test fails specifically because `onError` and `afterSession` do not run. The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}