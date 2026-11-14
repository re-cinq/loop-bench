Defined Done for `re-cinq/HALEngine#95` under strategy `direct`:

- Added `src/orchestration/chatOrchestrator.acceptance.test.ts` driving string, plain-object, and `undefined` rejections through `createChatOrchestrator(...).processMessage(...)`.
- Replaced the recorded-flaw section in `specs/hal-engine-config-hooks/spec.md` with the linked normative guarantee citing `src/orchestration/chatOrchestrator.acceptance.test.ts#L8`.
- Recorded the triage, acceptance test, facets, and out-of-scope boundaries in `.lore/dod.md`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError non-Error rejections › wraps non-Error rejections with cause and rethrows the original value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 14
    + Received  + 14

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    +     "causeIsOriginal": false,
          "label": "string",
    -     "onErrorCallCount": 1,
    -     "preservesCauseProperty": true,
    -     "receivedErrorInstance": true,
    -     "receivedSameSession": true,
    +     "onErrorCallCount": 0,
    +     "preservesCauseProperty": false,
    +     "receivedErrorInstance": false,
    +     "receivedSameSession": false,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    +     "causeIsOriginal": false,
          "label": "plain object",
    -     "onErrorCallCount": 1,
    -     "preservesCauseProperty": true,
    -     "receivedErrorInstance": true,
    -     "receivedSameSession": true,
    +     "onErrorCallCount": 0,
    +     "preservesCauseProperty": false,
    +     "receivedErrorInstance": false,
    +     "receivedSameSession": false,
        },
        Object {
          "callerReceivedOriginal": true,
          "causeIsOriginal": true,
          "label": "undefined",
    -     "onErrorCallCount": 1,
    -     "preservesCauseProperty": true,
    -     "receivedErrorInstance": true,
    -     "receivedSameSession": true,
    +     "onErrorCallCount": 0,
    +     "preservesCauseProperty": false,
    +     "receivedErrorInstance": false,
    +     "receivedSameSession": false,
        },
      ]

      23 |     });
      24 |
    > 25 |     expect(outcomes).toEqual([expectedFor('string'), expectedFor('plain object'), expectedFor('undefined')]);
         |                      ^
      26 |   });
      27 | });
      28 |

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:25:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}