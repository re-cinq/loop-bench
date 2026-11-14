Defined Done for **re-cinq/HALEngine#95** under the `direct` strategy (`5ebd67b` pushed to `origin/loop-bench/95`, up to date with `origin/main`):

- **Acceptance test**: `src/orchestration/chatOrchestrator.acceptance.test.ts` (`wraps non-Error rejections with cause, keeps Error instances, and rethrows originals`)
- **Spec link**: `specs/hal-engine-config-hooks/spec.md` replaces the out-of-scope `instanceof Error` note with the new `onError` guarantee citing `../../src/orchestration/chatOrchestrator.acceptance.test.ts#L71`
- **Triage & facets**: `.lore/dod.md`

### Red-bar output (`npm test -- src/orchestration/chatOrchestrator.acceptance.test.ts`)

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › wraps non-Error rejections with cause, keeps Error instances, and rethrows originals

    expect(received).toEqual(expected) // deep equality

    - Expected  - 15
    + Received  + 15

    @@ -8,31 +8,31 @@
          "isErrorInstance": true,
          "sameErrorInstance": true,
        },
        "objectOutcome": Object {
          "callerReceivedOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "hasOwnCause": true,
    -     "hookCalls": 1,
    -     "hookSessionId": "session-rejection",
    -     "isErrorInstance": true,
    +     "causeMatchesOriginal": false,
    +     "hasOwnCause": false,
    +     "hookCalls": 0,
    +     "hookSessionId": undefined,
    +     "isErrorInstance": false,
          "sameErrorInstance": false,
        },
        "stringOutcome": Object {
          "callerReceivedOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "hasOwnCause": true,
    -     "hookCalls": 1,
    -     "hookSessionId": "session-rejection",
    -     "isErrorInstance": true,
    +     "causeMatchesOriginal": false,
    +     "hasOwnCause": false,
    +     "hookCalls": 0,
    +     "hookSessionId": undefined,
    +     "isErrorInstance": false,
          "sameErrorInstance": false,
        },
        "undefinedOutcome": Object {
          "callerReceivedOriginal": true,
    -     "causeMatchesOriginal": true,
    -     "hasOwnCause": true,
    -     "hookCalls": 1,
    -     "hookSessionId": "session-rejection",
    -     "isErrorInstance": true,
    +     "causeMatchesOriginal": false,
    +     "hasOwnCause": false,
    +     "hookCalls": 0,
    +     "hookSessionId": undefined,
    +     "isErrorInstance": false,
          "sameErrorInstance": false,
        },
      }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}