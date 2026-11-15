Branch `loop-bench/95` already holds commit `65b5d06` (`.lore/dod.md`, `specs/hal-engine-config-hooks/spec.md`, and `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`), pushed to `origin/loop-bench/95` and up to date with `origin/main`.

Verified `src/orchestration/chatOrchestrator.onError.acceptance.test.ts` fails for the ticket's stated reason (`error instanceof Error` gates `onError` in `src/orchestration/chatOrchestrator.ts`):

```text
$ NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts
FAIL src/orchestration/chatOrchestrator.onError.acceptance.test.ts
  ● ChatOrchestrator onError non-Error rejections › calls onError once with an Error wrapping non-Error rejections as cause and rethrows original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
          "callerRejected": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "callerRejected": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
          "callerRejected": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
      ]

      at Object.<anonymous> (src/orchestration/chatOrchestrator.onError.acceptance.test.ts:58:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

`check-spec-anchor-names.mjs`, `check-spec-links.mjs`, `check-spec-status.mjs`, `repoint-spec-anchors.mjs --check origin/main`, and `prettier --check src/orchestration/chatOrchestrator.onError.acceptance.test.ts` all pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}