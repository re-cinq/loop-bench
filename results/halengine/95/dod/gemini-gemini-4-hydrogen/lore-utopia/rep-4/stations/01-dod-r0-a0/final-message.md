Defined the Definition of Done for re-cinq/HALEngine#95 using the `direct` strategy, committed on `loop-bench/95` (`f209ab5`), and pushed to `origin/loop-bench/95` (up to date with `origin/main`):

- `.lore/dod.md` — records the verbatim claim, `direct` strategy, acceptance test, implementation facets (including `CHANGELOG.md` update and preserving existing `onError` tests unedited), and out-of-scope items.
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator(...).processMessage(...)` against providers rejecting with `'upstream timeout'`, `{code: 'ECONNRESET', retryable: true}`, and `undefined`.
- `specs/hal-engine-config-hooks/spec.md` — replaces the `Measured semantics — out of scope` flaw section with the new guarantee linked to `chatOrchestrator.acceptance.test.ts#L8` (verified with `check-spec-anchor-names.mjs` and `check-spec-links.mjs`).

Failure output from `NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for thrown values that are not Error instances › calls onError once with an Error cause for string, object, and undefined rejections

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isError": true,
    -     "onErrorCalls": 1,
    +     "causeIsOriginal": false,
    +     "isError": false,
    +     "onErrorCalls": 0,
        },
      ]

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}