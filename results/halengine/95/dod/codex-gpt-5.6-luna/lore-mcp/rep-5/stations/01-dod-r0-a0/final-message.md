Added and pushed the direct acceptance test and `.lore/dod.md`.

Test command:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/nonErrorRejection.acceptance.test.ts --runInBand
```

Failure confirms the intended gap:

```text
onErrorCallCount: 0
onErrorCauseIsOriginal: false
onErrorReceivedError: false
callerReceivedOriginal: true
```

Commit `5e7820d`; branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}