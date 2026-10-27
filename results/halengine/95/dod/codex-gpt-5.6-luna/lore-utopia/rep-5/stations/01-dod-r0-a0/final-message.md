Added and committed the direct acceptance test and DoD.

Test command:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/onErrorNonError.acceptance.test.ts --runInBand
```

Failure confirms the current gate skips all non-`Error` rejections:

```text
Expected onErrorCallCount: 1, isError: true
Received onErrorCallCount: 0, isError: false
```

Committed and pushed as `a91a56b`. Branch is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}