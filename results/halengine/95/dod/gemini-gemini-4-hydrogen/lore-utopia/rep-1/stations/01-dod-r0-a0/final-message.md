Added the red acceptance test, spec traceability link, and `.lore/dod.md` for `re-cinq/HALEngine#95` (strategy: `direct`), committed (`3109ada`) and pushed to `origin/loop-bench/95` (up to date with `origin/main`).

Files changed:
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(...)` when `provider.sendMessage` rejects with a string, a plain object, and `undefined`, asserting `onError` is called once per turn with an `Error` whose `cause` is the thrown value while the caller still receives the original rejection unchanged.
- `specs/hal-engine-config-hooks/spec.md` — adds the cited guarantee under `## Installing hooks through config` (`[validated by: wraps non-Error rejections with cause for onError and rethrows the original value](../../src/orchestration/chatOrchestrator.acceptance.test.ts#L17)`).
- `.lore/dod.md` — records the quoted claim, `direct` strategy, acceptance test, facets, and out-of-scope items.

Command run and actual failure output:
```text
$ NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for primitive and object rejections › wraps non-Error rejections with cause for onError and rethrows the original value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerMatchesOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "onErrorCallCount": 1,
    -     "passedIsError": true,
    +     "causeMatchesOriginal": false,
    +     "onErrorCallCount": 0,
    +     "passedIsError": false,
          "rejectionKind": "string",
        },
        Object {
          "callerMatchesOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "onErrorCallCount": 1,
    -     "passedIsError": true,
    +     "causeMatchesOriginal": false,
    +     "onErrorCallCount": 0,
    +     "passedIsError": false,
          "rejectionKind": "plain object",
        },
        Object {
          "callerMatchesOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "onErrorCallCount": 1,
    -     "passedIsError": true,
    +     "causeMatchesOriginal": false,
    +     "onErrorCallCount": 0,
    +     "passedIsError": false,
          "rejectionKind": "undefined",
        },
      ]

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:25:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}