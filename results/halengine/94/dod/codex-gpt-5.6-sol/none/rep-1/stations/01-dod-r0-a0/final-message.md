Defined and pushed the ticket’s acceptance contract using the `direct` strategy.

- Added one behavioral acceptance test covering rejection identity, `onError`, `afterSession`, hook arguments, ordering, and no later turn stage.
- Updated the linked spec with the intended failure semantics.
- Added `.lore/dod.md`.
- Commit: `17f7a44`
- Branch is synchronized with `origin/loop-bench/94`.

Test command:

```text
npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts --runInBand
```

Expected red-bar output:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
● reports and cleans up a beforeSession failure before rejecting with it

Expected calls included:
  onError
  afterSession

Received calls included only:
  beforeSession

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The original `beforeSession` error already reaches the caller unchanged; the test fails specifically because `onError` and `afterSession` never run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}