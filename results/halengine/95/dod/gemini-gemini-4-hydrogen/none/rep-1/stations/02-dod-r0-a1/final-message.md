Branch `loop-bench/95` already carries commit `d3a4d83` (`test(orchestrator): pin onError on raw rejections`) pushed to `origin/loop-bench/95` and up to date with `origin/main` (`0\t1`), containing `.lore/dod.md`, `specs/hal-engine-config-hooks/spec.md`, and `src/orchestration/onErrorRejection.acceptance.test.ts`.

Running the acceptance tests directly (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/onErrorRejection.acceptance.test.ts`) fails all three tests because `onError` is never invoked for non-`Error` rejections:

```text
FAIL src/orchestration/onErrorRejection.acceptance.test.ts
  ● ChatOrchestrator onError for rejections that are not Errors › calls onError once with an Error wrapping a string rejection as cause and rethrows the string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
        "callerReason": "upstream rate limit",
        "callerThrew": true,
    -   "calls": 1,
    -   "cause": "upstream rate limit",
    -   "hasCause": true,
    -   "passedError": true,
    +   "calls": 0,
    +   "cause": undefined,
    +   "hasCause": false,
    +   "passedError": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorRejection.acceptance.test.ts:21:78)

  ● ChatOrchestrator onError for rejections that are not Errors › calls onError once with an Error wrapping a plain object rejection as cause and rethrows the object

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "callerMatchesPayload": true,
    -   "calls": 1,
    -   "causeMatchesPayload": true,
    -   "passedError": true,
    +   "calls": 0,
    +   "causeMatchesPayload": false,
    +   "passedError": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorRejection.acceptance.test.ts:40:8)

  ● ChatOrchestrator onError for rejections that are not Errors › calls onError once with an Error wrapping an undefined rejection as cause and rethrows undefined

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

      Object {
        "callerThrewUndefined": true,
    -   "calls": 1,
    -   "causeIsUndefined": true,
    -   "hasCause": true,
    -   "passedError": true,
    +   "calls": 0,
    +   "causeIsUndefined": false,
    +   "hasCause": false,
    +   "passedError": false,
      }

      at Object.<anonymous> (src/orchestration/onErrorRejection.acceptance.test.ts:57:8)

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

Spec link checks (`node scripts/check-spec-links.mjs`, `node scripts/check-spec-anchor-names.mjs`, `node scripts/check-spec-status.mjs`, `node scripts/repoint-spec-anchors.mjs --check origin/main`) and Prettier on `src/orchestration/onErrorRejection.acceptance.test.ts` and `specs/hal-engine-config-hooks/spec.md` pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}