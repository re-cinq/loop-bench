Defined the Definition of Done in `.lore/dod.md`, linked the updated statement in `specs/hal-engine-config-hooks/spec.md`, and verified the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`.

Failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › calls onError with an Error preserving cause and propagates the original rejection for a string, plain object, or undefined

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 2

    @@ -1,16 +1,9 @@
      Object {
        "allErrors": true,
    -   "callCount": 3,
    -   "causes": Array [
    -     "vendor string rejection",
    -     Object {
    -       "code": "VENDOR_FAULT",
    -       "detail": "bad gateway",
    -     },
    -     undefined,
    -   ],
    +   "callCount": 0,
    +   "causes": Array [],
        "outcomes": Array [
          Object {
            "rejected": true,
            "value": "vendor string rejection",
          },

      62 |       causes: seen.map(err => err.cause),
      63 |       outcomes: [stringOutcome, objectOutcome, undefinedOutcome],
    > 64 |     }).toEqual({
         |        ^
      65 |       callCount: 3,
      66 |       allErrors: true,
      67 |       causes: ['vendor string rejection', thrownObject, undefined],

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:64:8)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}