### Definition of Done and Triage

The ticket defines a bug where non-`Error` rejections bypass the orchestrator's `onError` lifecycle hook because of an `error instanceof Error` guard. We triaged this with the **`direct`** strategy because `createChatOrchestrator` provides the direct entry point (`processMessage`), and a rejecting provider directly triggers the catch block at `src/orchestration/chatOrchestrator.ts:150`.

The acceptance test has been placed in a dedicated acceptance test file beside the code: `src/orchestration/chatOrchestrator.acceptance.test.ts`.

Traceability was established in `specs/hal-engine-config-hooks/spec.md`, replacing the out-of-scope recorded flaw with the new normative guarantee referencing the test:
```markdown
- Every rejection reaches `onError`: a value that is not already an `Error` is wrapped in one whose `cause` is that original value, so a hook typed against `Error` still fires and a hook that wants the raw value can still reach it, while the caller receives the original rejection unchanged ([validated by: wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original](../../src/orchestration/chatOrchestrator.acceptance.test.ts#L35)).
```

### Acceptance Test Execution & Failure Output

Command run:
```bash
npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts
```

Actual failure output:
```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejection handling › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

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

      62 |     }
      63 |
    > 64 |     expect(results).toEqual([
         |                     ^
      65 |       {label: 'string', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      66 |       {label: 'object', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},
      67 |       {label: 'undefined', onErrorCallCount: 1, isError: true, causeIsOriginal: true, callerReceivedOriginal: true},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:64:21)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.203 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails specifically because `onErrorCallCount` is `0` (and consequently `isError` and `causeIsOriginal` are `false`) when rejecting with a string, plain object, or `undefined`.

The branch is up to date with `origin/main` and pushed to `origin/HEAD`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}