Added failing acceptance tests (`src/orchestration/beforeSessionFailure.acceptance.test.ts`), spec traceability links (`specs/hal-engine-config-hooks/spec.md`), and `.lore/dod.md` using strategy `direct`, committed (`77dea9f`), merged `origin/main` (already up to date), and pushed to `origin/loop-bench/94`.

Command run:
```bash
NODE_OPTIONS="--experimental-vm-modules" npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Observed failure output:
```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● beforeSession failure handling › fires onError with the session and error and still rejects when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  +  2

      Object {
        "outcome": "beforeSession failed",
    -   "receivedError": [Error: beforeSession failed],
    -   "receivedSession": Object {
    -     "entries": Array [
    -       Object {
    -         "content": "hello",
    -         "role": "user",
    -         "timestamp": "2026-01-01T00:00:00.000Z",
    -       },
    -     ],
    -     "sessionId": "s1",
    -     "userId": "u1",
    -   },
    +   "receivedError": undefined,
    +   "receivedSession": undefined,
      }

  ● beforeSession failure handling › fires afterSession after onError without starting the turn when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 1

      Object {
    -   "afterSessionSessionId": "s1",
    +   "afterSessionSessionId": undefined,
        "hookOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
        "outcome": "beforeSession failed",
        "providerCalls": 0,
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}