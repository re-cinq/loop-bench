Added the red acceptance test and Definition of Done for `#95` using the `direct` strategy, linked it in `specs/hal-engine-config-hooks/spec.md`, and pushed commit `5499da0` to `origin/loop-bench/95`.

### Files changed
- `.lore/dod.md` — recorded the verbatim ticket claim, `direct` strategy, acceptance test, facets, and out-of-scope items.
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — exercises `createChatOrchestrator` with string, plain-object, and `undefined` rejections and asserts `onError` is called once with an `Error` whose `cause` is the thrown value while the caller receives the original rejection unchanged.
- `specs/hal-engine-config-hooks/spec.md` — added the normative guarantee bullet citing `src/orchestration/chatOrchestrator.acceptance.test.ts#L34` (with `Status` left untouched).

### Red test failure output
Ran `NODE_OPTIONS=--experimental-vm-modules node node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › calls onError once with an Error whose cause is the rejection and rethrows the original value

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  8

      Array [
        Object {
          "callerRejection": "provider failed with a string",
          "label": "string",
    -     "onErrorCalls": 1,
    -     "passedCause": "provider failed with a string",
    -     "passedIsError": true,
    +     "onErrorCalls": 0,
    +     "passedCause": undefined,
    +     "passedIsError": false,
        },
        Object {
          "callerRejection": Object {
            "code": "UPSTREAM_FAIL",
            "status": 502,
          },
          "label": "plain-object",
    -     "onErrorCalls": 1,
    -     "passedCause": Object {
    -       "code": "UPSTREAM_FAIL",
    -       "status": 502,
    +     "onErrorCalls": 0,
    +     "passedCause": undefined,
    +     "passedIsError": false,
        },
    -     "passedIsError": true,
    -   },
        Object {
          "callerRejection": undefined,
          "label": "undefined",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
          "passedCause": undefined,
    -     "passedIsError": true,
    +     "passedIsError": false,
        },
      ]
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}