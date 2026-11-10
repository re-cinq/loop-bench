The Definition of Done in `.lore/dod.md`, the spec citation in `specs/hal-engine-config-hooks/spec.md`, and the acceptance test in `src/orchestration/beforeSession.acceptance.test.ts` are committed and pushed on `origin/loop-bench/94` (up to date with `origin/main`).

Actual failure output from running `node scripts/lore-run-test.mjs "src/orchestration/beforeSession.acceptance.test.ts::ChatOrchestrator when beforeSession throws runs onError and afterSession in order and still rejects with the thrown error"`:

```text
FAIL src/orchestration/beforeSession.acceptance.test.ts
  ● ChatOrchestrator when beforeSession throws › runs onError and afterSession in order and still rejects with the thrown error

    expect(received).toEqual(expected) // deep equality

    - Expected  - 31
    + Received  +  1

      Object {
    -   "observed": Array [
    -     Object {
    -       "error": [Error: span allocation failed],
    -       "hook": "onError",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s1",
    -         "userId": "u1",
    -       },
    -     },
    -     Object {
    -       "hook": "afterSession",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s1",
    -         "userId": "u1",
    -       },
    -     },
    -   ],
    +   "observed": Array [],
        "rejection": [Error: span allocation failed],
      }

      38 |       .catch((error: unknown) => error);
      39 |
    > 40 |     expect({rejection, observed}).toEqual({
         |                                   ^
      41 |       rejection: allocationFailure,
      42 |       observed: [
      43 |         {hook: 'onError', session, error: allocationFailure},

      at Object.<anonymous> (src/orchestration/beforeSession.acceptance.test.ts:40:35)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}