Defined DONE for `re-cinq/HALEngine#95` under the `direct` strategy (`25b5572` on `loop-bench/95`):

- Added three red acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` exercising `createChatOrchestrator(...).processMessage(...)` when a provider rejects with a string, a plain object, and `undefined` (leaving `src/orchestration/chatOrchestrator.test.ts` untouched).
- Replaced the out-of-scope recorded flaw in `specs/hal-engine-config-hooks/spec.md` with the new `onError` guarantee and trailing `([validated by: ...])` citations.
- Recorded the Definition of Done in `.lore/dod.md`.

Failure output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`):

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a string rejection in an Error with cause for onError and rethrows the string unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 6
    + Received  + 6

      Object {
        "callerReceivedSame": true,
    -   "causeIsOriginal": true,
    -   "hasCauseProperty": true,
    -   "onErrorCalls": 1,
    -   "receivedCause": "upstream rate limit",
    -   "receivedIsError": true,
    +   "causeIsOriginal": false,
    +   "hasCauseProperty": false,
    +   "onErrorCalls": 0,
    +   "receivedCause": undefined,
    +   "receivedIsError": false,
        "rejectedToCaller": true,
    -   "sessionIdSeen": "s-non-error",
    +   "sessionIdSeen": undefined,
      }

  ● ChatOrchestrator onError for non-Error rejections › wraps a plain-object rejection in an Error with cause for onError and rethrows the object unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 6

      Object {
        "callerReceivedSame": true,
    -   "causeIsOriginal": true,
    -   "hasCauseProperty": true,
    -   "onErrorCalls": 1,
    -   "receivedCause": Object {
    -     "code": 503,
    -     "detail": "upstream unavailable",
    -   },
    -   "receivedIsError": true,
    +   "causeIsOriginal": false,
    +   "hasCauseProperty": false,
    +   "onErrorCalls": 0,
    +   "receivedCause": undefined,
    +   "receivedIsError": false,
        "rejectedToCaller": true,
    -   "sessionIdSeen": "s-non-error",
    +   "sessionIdSeen": undefined,
      }

  ● ChatOrchestrator onError for non-Error rejections › wraps an undefined rejection in an Error with cause for onError and rethrows undefined unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 5
    + Received  + 5

      Object {
        "callerReceivedSame": true,
    -   "causeIsOriginal": true,
    -   "hasCauseProperty": true,
    -   "onErrorCalls": 1,
    +   "causeIsOriginal": false,
    +   "hasCauseProperty": false,
    +   "onErrorCalls": 0,
        "receivedCause": undefined,
    -   "receivedIsError": true,
    +   "receivedIsError": false,
        "rejectedToCaller": true,
    -   "sessionIdSeen": "s-non-error",
    +   "sessionIdSeen": undefined,
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}