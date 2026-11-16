Added the red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, cited it in `specs/hal-engine-config-hooks/spec.md`, recorded the Definition of Done in `.lore/dod.md`, and pushed commit `6667e1e` to `origin/loop-bench/95` (`origin/main` already up to date).

Failure output from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for arbitrary rejections › calls onError once with an Error wrapping the rejection as cause and rethrows the original value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    +     "causeIsOriginal": false,
          "label": "string",
    -     "onErrorCallCount": 1,
    -     "receivedAnError": true,
    +     "onErrorCallCount": 0,
    +     "receivedAnError": false,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    +     "causeIsOriginal": false,
          "label": "plainObject",
    -     "onErrorCallCount": 1,
    -     "receivedAnError": true,
    +     "onErrorCallCount": 0,
    +     "receivedAnError": false,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    +     "causeIsOriginal": false,
          "label": "undefined",
    -     "onErrorCallCount": 1,
    -     "receivedAnError": true,
    +     "onErrorCallCount": 0,
    +     "receivedAnError": false,
        },
      ]

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:31:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}