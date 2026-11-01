Added and pushed red acceptance coverage in commit `3e2cb16`.

Targeted command run:

`npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`

Actual failure:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
reported: undefined
entriesAtCleanup: []
```

The contract also records that `afterSession` runs with no normal turn work completed. Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}