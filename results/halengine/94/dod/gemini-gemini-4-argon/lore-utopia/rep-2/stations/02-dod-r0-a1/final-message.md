The Definition of Done (`.lore/dod.md`), spec link (`specs/hal-engine-config-hooks/spec.md`), and acceptance test (`src/orchestration/beforeSessionThrow.acceptance.test.ts`) are committed, pushed, and up to date with `origin/main`.

### Red Acceptance Test Output

```text
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● ChatOrchestrator hooks when beforeSession throws › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 6
    + Received  + 2

      Object {
    -   "afterSessionEntryRoles": Array [
    -     "user",
    -   ],
    +   "afterSessionEntryRoles": Array [],
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorMessage": "beforeSession boom",
    +   "onErrorMessage": undefined,
        "outcome": "beforeSession boom",
      }

      62 |       callOrder,
      63 |       afterSessionEntryRoles,
    > 64 |     }).toEqual({
         |        ^
      65 |       outcome: 'beforeSession boom',
      66 |       onErrorMessage: 'beforeSession boom',
      67 |       callOrder: ['beforeSession', 'onError', 'afterSession'],

      at Object.<anonymous> (src/orchestration/beforeSessionThrow.acceptance.test.ts:64:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}