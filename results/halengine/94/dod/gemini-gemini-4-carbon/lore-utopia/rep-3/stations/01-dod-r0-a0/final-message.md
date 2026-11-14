Defined Done for `re-cinq/HALEngine#94` under the `direct` strategy (`19fcf33` pushed to `origin/loop-bench/94`):

- Added `src/orchestration/beforeSessionThrow.acceptance.test.ts` testing `createChatOrchestrator(...).processMessage(session)` when `beforeSession` throws an `Error`: asserts the caller still receives that rejection, `onError` and `afterSession` fire in `beforeSession` → `onError` → `afterSession` order with `(session, error)` and `(session)` respectively, no downstream turn hook runs, and `session.entries` remains untouched when `afterSession` runs.
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw bullet with the linked normative guarantee, and recorded the triage in `.lore/dod.md`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionThrow.acceptance.test.ts`:

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● beforeSession hook failure lifecycle › fires onError and afterSession in order and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 36
    + Received  +  0

    @@ -2,44 +2,8 @@
        "events": Array [
          Object {
            "hook": "beforeSession",
            "sessionId": "s-before-throw",
          },
    -     Object {
    -       "error": [Error: beforeSession failed],
    -       "hook": "onError",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-throw",
    -         "userId": "u1",
    -       },
    -     },
    -     Object {
    -       "entriesSnapshot": Array [
    -         Object {
    -           "content": "hello",
    -           "role": "user",
    -           "timestamp": "2026-01-01T00:00:00.000Z",
    -         },
    -       ],
    -       "hook": "afterSession",
    -       "session": Object {
    -         "entries": Array [
    -           Object {
    -             "content": "hello",
    -             "role": "user",
    -             "timestamp": "2026-01-01T00:00:00.000Z",
    -           },
    -         ],
    -         "sessionId": "s-before-throw",
    -         "userId": "u1",
    -       },
    -     },
        ],
        "rejection": [Error: beforeSession failed],
      }

      52 |     );
      53 |
    > 54 |     expect({rejection, events}).toEqual({
         |                                 ^
      55 |       rejection: thrown,
      56 |       events: [
      57 |         {hook: 'beforeSession', sessionId: 's-before-throw'},

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:54:33)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}