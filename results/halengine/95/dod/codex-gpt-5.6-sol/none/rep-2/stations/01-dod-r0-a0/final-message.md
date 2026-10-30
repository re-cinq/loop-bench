Defined and pushed the `direct` acceptance contract in commit `30ceefe`.

Added:

- One acceptance test covering string, plain-object, and `undefined` rejections.
- Updated spec guarantee with test traceability.
- `.lore/dod.md` with implementation facets and scope.
- Confirmed branch is synchronized with upstream and `origin/main`.

Test command:

`npm test -- --runTestsByPath src/orchestration/chatOrchestratorNonError.acceptance.test.ts`

Expected failure observed:

```text
FAIL src/orchestration/chatOrchestratorNonError.acceptance.test.ts

"callerReceivedOriginal": true,
"hookCalls": 0,
"hookCauseIsOriginal": false,
"hookReceivedError": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}