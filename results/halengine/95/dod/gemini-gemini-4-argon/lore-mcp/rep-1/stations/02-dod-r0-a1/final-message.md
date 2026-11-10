Defined the Definition of Done for ticket #95 (`Call onError for a rejection that is not an Error`) using the `direct` strategy in `.lore/dod.md`, linked the normative statement in `specs/hal-engine-config-hooks/spec.md`, and verified the failing acceptance test in `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`.

### Failure Output

```
FAIL src/orchestration/onErrorNonErrorRejection.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeMatches": true,
    -     "isError": true,
    -     "onErrorCount": 1,
    +     "causeMatches": false,
    +     "isError": false,
    +     "onErrorCount": 0,
        },
      ]

      21 |     const results = await Promise.all(rejections.map(observeRejection));
      22 |
    > 23 |     expect(results).toEqual([
         |                     ^
      24 |       {onErrorCount: 1, isError: true, causeMatches: true, callerReceivedOriginal: true},
      25 |       {onErrorCount: 1, isError: true, causeMatches: true, callerReceivedOriginal: true},
      26 |       {onErrorCount: 1, isError: true, causeMatches: true, callerReceivedOriginal: true},

      at Object.<anonymous> (src/orchestration/onErrorNonErrorRejection.acceptance.test.ts:23:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}