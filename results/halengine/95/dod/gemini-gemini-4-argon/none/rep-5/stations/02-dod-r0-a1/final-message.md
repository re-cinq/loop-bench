Defined the acceptance test for #95 in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked it from `specs/hal-engine-config-hooks/spec.md`, and recorded the Definition of Done in `.lore/dod.md`.

Failure output from `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator non-Error rejections › wraps a non-Error rejection in an Error with cause for onError and rethrows the original rejection unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 11
    + Received  +  8

    @@ -2,25 +2,22 @@
        "fromObject": Object {
          "callerRejection": Object {
            "code": 503,
            "detail": "upstream unavailable",
          },
    -     "onErrorCount": 1,
    -     "receivedCause": Object {
    -       "code": 503,
    -       "detail": "upstream unavailable",
    -     },
    -     "receivedErrorInstance": true,
    +     "onErrorCount": 0,
    +     "receivedCause": undefined,
    +     "receivedErrorInstance": false,
        },
        "fromString": Object {
          "callerRejection": "string rejection",
    -     "onErrorCount": 1,
    -     "receivedCause": "string rejection",
    -     "receivedErrorInstance": true,
    +     "onErrorCount": 0,
    +     "receivedCause": undefined,
    +     "receivedErrorInstance": false,
        },
        "fromUndefined": Object {
          "callerRejection": undefined,
    -     "onErrorCount": 1,
    +     "onErrorCount": 0,
          "receivedCause": undefined,
    -     "receivedErrorInstance": true,
    +     "receivedErrorInstance": false,
        },
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}