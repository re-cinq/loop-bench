Defined and pushed the direct acceptance contract in commit `a83b800`.

- Added `nonErrorRejection.acceptance.test.ts`, covering string, plain-object, and `undefined` rejections.
- Added `.lore/dod.md`.
- Replaced the spec’s recorded flaw with the linked guarantee.
- Branch is synchronized with `origin/main` and its upstream.

Targeted command:

```text
npm test -- --runTestsByPath src/orchestration/nonErrorRejection.acceptance.test.ts --runInBand
```

Actual failure:

```text
Expected:
  hookCallCount: 1
  hookCauseIsOriginal: true
  hookReceivedError: true

Received:
  hookCallCount: 0
  hookCauseIsOriginal: false
  hookReceivedError: false

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The caller-rejection assertions remained true, confirming failure is specifically the missing `onError` behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}