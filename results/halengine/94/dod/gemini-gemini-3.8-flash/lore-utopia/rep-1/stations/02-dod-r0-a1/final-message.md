The acceptance test for issue #94 ("Run onError and afterSession when beforeSession throws") is defined in `src/orchestration/chatOrchestrator.acceptance.test.ts`, documented in `.lore/dod.md` using strategy `direct`, and anchored in `specs/hal-engine-config-hooks/spec.md`.

### Failure Output

Running `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
> @re-cinq/hal-engine@0.3.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts

(node:288588) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator hooks › beforeSession › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
    -   "afterSessionEntryCount": 1,
    +   "afterSessionEntryCount": undefined,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorMessage": "beforeSession boom",
    +   "onErrorMessage": undefined,
        "outcome": "beforeSession boom",
      }

      56 |         onErrorMessage,
      57 |         afterSessionEntryCount,
    > 58 |       }).toEqual({
         |          ^
      59 |         outcome: 'beforeSession boom',
      60 |         callOrder: ['beforeSession', 'onError', 'afterSession'],
      61 |         onErrorMessage: 'beforeSession boom',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:58:10)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.191 s, estimated 1 s
Ran all test suites matching src/orchestration/chatOrchestrator.acceptance.test.ts.
```

The test fails strictly because `beforeSession` is awaited before entering the `try` block: `beforeSession` executes and rejects to the caller, but neither `onError` nor `afterSession` executes. All commits are pushed and the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}