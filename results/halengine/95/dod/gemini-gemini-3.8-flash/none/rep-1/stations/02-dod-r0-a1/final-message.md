### Definition of Done and Acceptance Test

The acceptance test for Ticket #95 is located in `src/orchestration/chatOrchestrator.acceptance.test.ts` with traceability in `specs/hal-engine-config-hooks/spec.md` and triage documented in `.lore/dod.md` using the `direct` strategy.

### Test Execution Output

Running `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts` produces the expected failure where non-Error rejections bypass `onError` (`callCount` is 0):

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError › wraps non-Error rejections in an Error preserving cause for onError and propagates unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 14
    + Received  + 11

      Array [
        Object {
    -     "callCount": 1,
    +     "callCount": 0,
          "callerOutcome": "provider failed",
    -     "cause": "provider failed",
    -     "hasSession": true,
    -     "isError": true,
    +     "cause": undefined,
    +     "hasSession": false,
    +     "isError": false,
          "label": "string",
        },
        Object {
    -     "callCount": 1,
    +     "callCount": 0,
          "callerOutcome": Object {
            "code": "PROVIDER_DOWN",
            "status": 503,
          },
    -     "cause": Object {
    -       "code": "PROVIDER_DOWN",
    -       "status": 503,
    -     },
    -     "hasSession": true,
    -     "isError": true,
    +     "cause": undefined,
    +     "hasSession": false,
    +     "isError": false,
          "label": "plain object",
        },
        Object {
    -     "callCount": 1,
    +     "callCount": 0,
          "callerOutcome": undefined,
          "cause": undefined,
    -     "hasSession": true,
    -     "isError": true,
    +     "hasSession": false,
    +     "isError": false,
          "label": "undefined",
        },
      ]

      71 |     }
      72 |
    > 73 |     expect(results).toEqual([
         |                     ^
      74 |       {
      75 |         label: 'string',
      76 |         callCount: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:73:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.195 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The branch is up to date with `origin/main` and committed and pushed to `origin/loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}