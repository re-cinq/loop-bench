Defined DONE for `re-cinq/HALEngine#95` (`direct` strategy) in `.lore/dod.md`, added the three red acceptance tests in `src/orchestration/onErrorNonError.acceptance.test.ts`, linked them in `specs/hal-engine-config-hooks/spec.md`, and pushed `cf4946c` to `origin/loop-bench/95`.

### Failure output (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/onErrorNonError.acceptance.test.ts`)

```text
FAIL src/orchestration/onErrorNonError.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a rejected string in an Error with cause for onError while rethrowing the string unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 8
    + Received  + 1

      Object {
        "callerReason": "provider gateway timeout",
        "callerThrew": true,
    -   "onErrorCalls": Array [
    -     Object {
    -       "cause": "provider gateway timeout",
    -       "hasCause": true,
    -       "isError": true,
    -       "sessionId": "s-non-error",
    -     },
    -   ],
    +   "onErrorCalls": Array [],
      }

  ● ChatOrchestrator onError for non-Error rejections › wraps a rejected plain object in an Error with cause for onError while rethrowing the object unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

      Object {
    -   "callCount": 1,
    +   "callCount": 0,
        "callerThrew": true,
    -   "firstHasCause": true,
    -   "firstIsError": true,
    +   "firstHasCause": undefined,
    +   "firstIsError": undefined,
        "sameCallerObject": true,
    -   "sameCauseObject": true,
    -   "sessionId": "s-non-error",
    +   "sameCauseObject": false,
    +   "sessionId": undefined,
      }

  ● ChatOrchestrator onError for non-Error rejections › wraps a rejected undefined in an Error with cause for onError while rethrowing undefined unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 8
    + Received  + 1

      Object {
        "callerReason": undefined,
        "callerThrew": true,
    -   "onErrorCalls": Array [
    -     Object {
    -       "cause": undefined,
    -       "hasCause": true,
    -       "isError": true,
    -       "sessionId": "s-non-error",
    -     },
    -   ],
    +   "onErrorCalls": Array [],
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}