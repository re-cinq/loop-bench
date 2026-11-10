Acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` and the Definition of Done in `.lore/dod.md` (with spec citation links in `specs/hal-engine-config-hooks/spec.md`) are committed and pushed.

### Failure Output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejections › calls onError once with a wrapping Error carrying the cause when a provider rejects with a string, while rethrowing the original string

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "calls": 1,
    +   "calls": 0,
        "caughtSame": true,
    -   "cause": "vendor string failure",
    -   "isErrorInstance": true,
    +   "cause": undefined,
    +   "isErrorInstance": false,
      }

      52 |     const outcome = await runRejectionTurn('vendor string failure');
      53 |
    > 54 |     expect(outcome).toEqual({
         |                     ^
      55 |       calls: 1,
      56 |       isErrorInstance: true,
      57 |       cause: 'vendor string failure',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:54:21)

  ● ChatOrchestrator non-Error rejections › calls onError once with a wrapping Error carrying the cause when a provider rejects with a plain object or undefined, while rethrowing the original value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 8
    + Received  + 5

      Object {
        "fromObject": Object {
    -     "calls": 1,
    +     "calls": 0,
          "caughtSame": true,
    -     "cause": Object {
    -       "code": "UPSTREAM_DOWN",
    -       "status": 503,
    -     },
    -     "isErrorInstance": true,
    +     "cause": undefined,
    +     "isErrorInstance": false,
        },
        "fromUndefined": Object {
    -     "calls": 1,
    +     "calls": 0,
          "caughtSame": true,
          "cause": undefined,
    -     "isErrorInstance": true,
    +     "isErrorInstance": false,
        },
      }

      65 |     const fromUndefined = await runRejectionTurn(undefined);
      66 |
    > 67 |     expect({fromObject, fromUndefined}).toEqual({
         |                                         ^
      68 |       fromObject: {
      69 |         calls: 1,
      70 |         isErrorInstance: true,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:67:41)

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}