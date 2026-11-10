Defined the Definition of Done in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md`, and added the failing acceptance test in `src/orchestration/beforeSessionThrow.acceptance.test.ts`.

### Failure Output

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● a beforeSession hook that throws › runs onError and afterSession and rethrows when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 27
    + Received  +  1

      Object {
        "order": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "rejected: rate limit token unavailable",
    -   "seen": Object {
    -     "afterSession": Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s-before-throw",
    -       "userId": "u1",
    -     },
    -     "errorMessage": "rate limit token unavailable",
    -     "errorSession": Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s-before-throw",
    -       "userId": "u1",
    -     },
    -   },
    +   "seen": Object {},
      }

      41 |       .catch((error: Error) => `rejected: ${error.message}`);
      42 |
    > 43 |     expect({outcome, order, seen}).toEqual({
         |                                    ^
      44 |       outcome: 'rejected: rate limit token unavailable',
      45 |       order: ['beforeSession', 'onError', 'afterSession'],
      46 |       seen: {

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:43:36)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}