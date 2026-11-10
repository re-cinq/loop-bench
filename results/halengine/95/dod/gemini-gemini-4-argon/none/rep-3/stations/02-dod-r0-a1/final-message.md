Defined the acceptance test for #95 in `src/orchestration/onErrorNonError.acceptance.test.ts`, linked it in `specs/hal-engine-config-hooks/spec.md`, and recorded the Definition of Done in `.lore/dod.md`.

### Failure Output

```
FAIL src/orchestration/onErrorNonError.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a non-Error rejection in an Error with cause for onError while rethrowing the original value unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  +  9

      Object {
        "errorSameInstance": true,
    -   "objectCalled": 1,
    -   "objectCause": Object {
    -     "code": "UPSTREAM_ABORT",
    -     "retryable": false,
    -   },
    -   "objectIsError": true,
    +   "objectCalled": 0,
    +   "objectCause": undefined,
    +   "objectIsError": false,
        "objectRejected": Object {
          "code": "UPSTREAM_ABORT",
          "retryable": false,
        },
    -   "stringCalled": 1,
    -   "stringCause": "provider rejected with a string",
    -   "stringIsError": true,
    +   "stringCalled": 0,
    +   "stringCause": undefined,
    +   "stringIsError": false,
        "stringRejected": "provider rejected with a string",
    -   "undefinedCalled": 1,
    +   "undefinedCalled": 0,
        "undefinedCause": undefined,
    -   "undefinedHasCause": true,
    -   "undefinedIsError": true,
    +   "undefinedHasCause": false,
    +   "undefinedIsError": false,
        "undefinedRejected": undefined,
      }

      64 |       undefinedRejected: undefinedTurn.rejected,
      65 |       errorSameInstance: errorTurn.seen[0] === originalError,
    > 66 |     }).toEqual({
         |        ^
      67 |       stringCalled: 1,
      68 |       stringIsError: true,
      69 |       stringCause: 'provider rejected with a string',

      at Object.<anonymous> (src/orchestration/onErrorNonError.acceptance.test.ts:66:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}