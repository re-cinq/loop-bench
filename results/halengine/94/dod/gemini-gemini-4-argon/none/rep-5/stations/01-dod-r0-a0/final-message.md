Defined the Definition of Done in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md`, and added the failing acceptance test in `src/orchestration/beforeSessionThrow.acceptance.test.ts`.

Failure output from `node scripts/lore-run-test.mjs "src/orchestration/beforeSessionThrow.acceptance.test.ts::when beforeSession throws runs onError with the session and error, then afterSession, and still rejects"`:

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● when beforeSession throws › runs onError with the session and error, then afterSession, and still rejects

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 0

      Object {
        "events": Array [
          "beforeSession",
    -     "onError:s1:allocation failed",
    -     "afterSession:s1:1",
        ],
        "rejection": "rejected:allocation failed",
      }

      58 |       .catch((error: Error) => `rejected:${error.message}`);
      59 |
    > 60 |     expect({rejection, events}).toEqual({
         |                                 ^
      61 |       rejection: 'rejected:allocation failed',
      62 |       events: ['beforeSession', 'onError:s1:allocation failed', 'afterSession:s1:1'],
      63 |     });

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:60:33)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}