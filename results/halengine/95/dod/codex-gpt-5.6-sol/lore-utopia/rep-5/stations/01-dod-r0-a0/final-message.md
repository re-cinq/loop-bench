Defined and pushed the direct acceptance contract in commit `42c1617`.

Test command:

`npm test -- --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts`

Expected red-bar output:

```text
FAIL src/orchestration/nonErrorRejection.acceptance.test.ts

Expected:
"hookCalls": 1
"hookReceivedError": true
"causeIsOriginal": true

Received:
"hookCalls": 0
"hookReceivedError": false
"causeIsOriginal": false
```

The test confirms string, plain-object, and `undefined` rejections still reach callers unchanged, while exposing the defect that `onError` is never called. The spec citation and [.lore/dod.md](/var/tmp/loop-bench/runs/df11fb3c9047/workspace/target/.lore/dod.md) are included. The branch is synchronized with `origin/main` and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}