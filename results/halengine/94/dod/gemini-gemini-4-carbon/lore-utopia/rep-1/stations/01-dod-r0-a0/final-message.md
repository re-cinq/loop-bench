Defined DONE for `re-cinq/HALEngine#94` using strategy `direct` (`6ebb1ba` pushed to `origin/loop-bench/94`, up to date with `origin/main`):

- Added `src/orchestration/chatOrchestrator.acceptance.test.ts` pinning that when `beforeSession` throws an `Error`, no downstream input/model/provider steps run, `onError` fires with `(session, error)` followed by `afterSession` with `session`, and `processMessage` still rejects to the caller with the thrown `Error`.
- Replaced the recorded out-of-scope flaw bullet in `specs/hal-engine-config-hooks/spec.md` with the normative guarantee and cleanup assumption, linked to the acceptance test.
- Recorded the Definition of Done and implementation facets in `.lore/dod.md`.

### Red bar output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › runs onError then afterSession and rethrows when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  +  2

      Object {
    -   "afterSessionCalls": Array [
    -     Object {
    -       "entries": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "sessionId": "s-before-session-throw",
    -       "userId": "u1",
    -     },
    -   ],
    +   "afterSessionCalls": Array [],
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorCalls": Array [
    -     Array [
    -       Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-session-throw",
    -         "userId": "u1",
    -       },
    -       [Error: span allocation failed],
    -     ],
    -   ],
    +   "onErrorCalls": Array [],
        "rejection": [Error: span allocation failed],
      }

      52 |       onErrorCalls,
      53 |       afterSessionCalls,
    > 54 |     }).toEqual({
         |        ^
      55 |       rejection: thrownError,
      56 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      57 |       onErrorCalls: [[session, thrownError]],

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:54:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}