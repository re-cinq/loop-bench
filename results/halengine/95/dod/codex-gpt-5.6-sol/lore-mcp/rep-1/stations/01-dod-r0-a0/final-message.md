Defined and pushed the `direct` acceptance contract in commit `4e5a5f8`.

Added:

- One acceptance test covering string, object, `undefined`, and existing `Error` rejections.
- `.lore/dod.md` with implementation facets and scope.
- Spec guarantee linked to the acceptance test.

Command run:

`npm test -- --runTestsByPath src/orchestration/chatOrchestratorNonErrorRejection.acceptance.test.ts --runInBand`

Expected failure confirmed:

```text
FAIL src/orchestration/chatOrchestratorNonErrorRejection.acceptance.test.ts

- "hookCalls": 1,
- "hookReceivedError": true,
+ "hookCalls": 0,
+ "hookReceivedError": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The caller still received each original rejection, confirming the failure is specifically the missing `onError` calls. The branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}