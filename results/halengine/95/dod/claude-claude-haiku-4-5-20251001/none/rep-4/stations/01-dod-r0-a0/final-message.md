Perfect! I've successfully created and committed the acceptance tests for ticket #95. Here's the summary:

## Summary

I've defined the acceptance criteria for ticket #95 (**Call onError for a rejection that is not an Error**) through a new acceptance test file and Definition of Done document.

### What was done

**Created:** `src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts`

This file contains four acceptance tests:
1. **String rejection** — Verifies `onError` is called with an Error wrapping the string
2. **Plain object rejection** — Verifies `onError` is called with an Error wrapping the object
3. **Undefined rejection** — Verifies `onError` is called with an Error wrapping undefined
4. **Error instance rejection** — Verifies Error instances pass through as-is (not wrapped)

**Created:** `.lore/dod.md`

Documents the strategy as `direct` (seam exists in the catch block at `src/orchestration/chatOrchestrator.ts:150-152`), lists the four acceptance tests, and specifies the facets for implementation.

### Test Results

Three tests fail (as expected—the bug exists), one passes:

```
FAIL src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts
  ● ChatOrchestrator onError with non-Error rejections › string rejection › calls onError with an Error whose cause is the string, and caller receives the original string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "callerReceivedRejection": "something went wrong",
    -   "onErrorReceivedCause": "something went wrong",
    -   "onErrorReceivedIsError": true,
    -   "onErrorWasCalled": true,
    +   "onErrorReceivedCause": undefined,
    +   "onErrorReceivedIsError": false,
    +   "onErrorWasCalled": false,
      }

  ● ChatOrchestrator onError with non-Error rejections › plain object rejection › calls onError with an Error whose cause is the object, and caller receives the original object

    expect(received).toEqual(expected) // deep equality

    - Expected  - 6
    + Received  + 3

      Object {
        "callerReceivedRejection": Object {
          "code": "CUSTOM_ERROR",
          "message": "something happened",
        },
    -   "onErrorReceivedCause": Object {
    -     "code": "CUSTOM_ERROR",
    -     "message": "something happened",
    -   },
    -   "onErrorReceivedIsError": true,
    -   "onErrorWasCalled": true,
    +   "onErrorReceivedCause": undefined,
    +   "onErrorReceivedIsError": false,
    +   "onErrorWasCalled": false,
      }

  ● ChatOrchestrator onError with non-Error rejections › undefined rejection › calls onError with an Error whose cause is undefined, and caller receives the original undefined rejection

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 2

      Object {
        "callerReceivedRejection": undefined,
        "callerThrew": true,
        "onErrorReceivedCause": undefined,
    -   "onErrorReceivedIsError": true,
    -   "onErrorWasCalled": true,
    +   "onErrorReceivedIsError": false,
    +   "onErrorWasCalled": false,
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

The failures confirm the bug: `onError` is currently not called for non-Error rejections because of the `error instanceof Error` guard at line 150 of `chatOrchestrator.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}