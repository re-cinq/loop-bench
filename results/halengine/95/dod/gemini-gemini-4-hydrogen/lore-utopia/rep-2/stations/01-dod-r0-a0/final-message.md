Added the failing acceptance test, spec traceability link, and Definition of Done for `re-cinq/HALEngine#95` (`strategy: direct`) and pushed commit `28d4ebd` to `origin/loop-bench/95` (up to date with `origin/main`).

Files committed:
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(...)` with a rejecting provider for string, plain object, and `undefined` rejections.
- `specs/hal-engine-config-hooks/spec.md` — adds the normative `onError` guarantee under `## Installing hooks through config` citing `src/orchestration/chatOrchestrator.acceptance.test.ts#L11`.
- `.lore/dod.md` — records the verbatim claim, `direct` strategy, acceptance test, implementation facets (including removing `## Measured semantics — out of scope` and adding the `CHANGELOG.md` entry), and out-of-scope items.

Actual red bar from `npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`:
```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for rejections that are not Error instances › calls onError with an Error cause wrapper for string, object, and undefined rejections

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerGotOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "passedErrorInstance": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "passedErrorInstance": false,
        },
        Object {
          "callerGotOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "passedErrorInstance": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "passedErrorInstance": false,
        },
        Object {
          "callerGotOriginal": true,
    -     "causePreserved": true,
    -     "onErrorCalls": 1,
    -     "passedErrorInstance": true,
    +     "causePreserved": false,
    +     "onErrorCalls": 0,
    +     "passedErrorInstance": false,
        },
      ]

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:34:22)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}