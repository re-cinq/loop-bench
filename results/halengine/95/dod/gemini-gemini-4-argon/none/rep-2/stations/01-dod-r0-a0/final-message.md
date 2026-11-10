Added the acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked the statement in `specs/hal-engine-config-hooks/spec.md`, and recorded the Definition of Done in `.lore/dod.md`.

### Red bar output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "string",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "object",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    +     "causeIsOriginal": false,
    +     "isError": false,
          "label": "undefined",
    -     "onErrorCallCount": 1,
    +     "onErrorCallCount": 0,
        },
      ]

      64 |     }
      65 |
    > 66 |     expect(results).toEqual([
         |                     ^
      67 |       {label: 'string', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      68 |       {label: 'object', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      69 |       {label: 'undefined', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:66:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}