Defined Done for `re-cinq/HALEngine#95` under strategy `direct` in `.lore/dod.md`, added the failing acceptance test in `src/orchestration/onErrorRejection.acceptance.test.ts`, and linked the normative statement in `specs/hal-engine-config-hooks/spec.md` (`#L62`), committed and pushed as `402c8a4` on `loop-bench/95`.

Actual failure output from `NODE_OPTIONS='--experimental-vm-modules' npx jest --runTestsByPath src/orchestration/onErrorRejection.acceptance.test.ts`:

```text
FAIL src/orchestration/onErrorRejection.acceptance.test.ts
  ● onError on non-Error rejections › wraps a non-Error rejection in an Error with cause while keeping Error instances and caller rejections unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 13
    + Received  + 13

    @@ -5,28 +5,28 @@
          "receivedSession": true,
          "sameAsThrown": true,
        },
        "plainObject": Object {
          "callerRejectedUnchanged": true,
    -     "causeMatchesThrown": true,
    -     "onErrorCalls": 1,
    -     "receivedErrorInstance": true,
    -     "receivedSession": true,
    +     "causeMatchesThrown": false,
    +     "onErrorCalls": 0,
    +     "receivedErrorInstance": false,
    +     "receivedSession": false,
          "sameAsThrown": false,
        },
        "string": Object {
          "callerRejectedUnchanged": true,
    -     "causeMatchesThrown": true,
    -     "onErrorCalls": 1,
    -     "receivedErrorInstance": true,
    -     "receivedSession": true,
    +     "causeMatchesThrown": false,
    +     "onErrorCalls": 0,
    +     "receivedErrorInstance": false,
    +     "receivedSession": false,
          "sameAsThrown": false,
        },
        "undefinedValue": Object {
          "callerRejectedUnchanged": true,
    -     "causeMatchesThrown": true,
    -     "onErrorCalls": 1,
    -     "receivedErrorInstance": true,
    -     "receivedSession": true,
    -     "sameAsThrown": false,
    +     "causeMatchesThrown": false,
    +     "onErrorCalls": 0,
    +     "receivedErrorInstance": false,
    +     "receivedSession": false,
    +     "sameAsThrown": true,
        },
      }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}