Defined the Definition of Done for `#94` using strategy `direct` in `.lore/dod.md`, updated `specs/hal-engine-config-hooks/spec.md` with the normative `beforeSession` error-path guarantee and `([validated by: ...])` link, and added the red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`.

### Red Acceptance Test Output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure lifecycle › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 0

      Object {
        "events": Array [
          "beforeSession:s1",
    -     "onError:s1:beforeSession boom",
    -     "afterSession:s1",
        ],
        "outcome": "beforeSession boom",
      }

      39 |       .catch((error: Error) => error.message);
      40 |
    > 41 |     expect({outcome, events}).toEqual({
         |                               ^
      42 |       outcome: 'beforeSession boom',
      43 |       events: ['beforeSession:s1', 'onError:s1:beforeSession boom', 'afterSession:s1'],
      44 |     });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:41:31)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}