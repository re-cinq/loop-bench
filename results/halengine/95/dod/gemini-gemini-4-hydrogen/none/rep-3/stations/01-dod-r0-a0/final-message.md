Added failing acceptance tests for ticket #95 in `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`, recorded the `direct` Definition of Done in `.lore/dod.md`, and linked the new guarantee in `specs/hal-engine-config-hooks/spec.md` (replacing the `Measured semantics — out of scope` section while keeping `Status: Shipped`). All changes were formatted with Prettier, verified with `check-spec-links.mjs`, `check-spec-anchor-names.mjs`, `check-spec-status.mjs --coverage`, and `repoint-spec-anchors.mjs --check origin/main`, committed (`84fca7e`), synced with `origin/main`, and pushed to `origin/loop-bench/95`.

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`:

```
FAIL src/orchestration/onErrorNonErrorRejection.acceptance.test.ts
  ● onError for non-Error rejections › calls onError once with an Error whose cause is the thrown string and preserves the string rejection

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "callerOutcome": Object {
          "reason": "provider string rejection",
          "rejected": true,
        },
    -   "hookCallCount": 1,
    -   "isErrorInstance": true,
    -   "reportedCause": "provider string rejection",
    +   "hookCallCount": 0,
    +   "isErrorInstance": false,
    +   "reportedCause": undefined,
      }

  ● onError for non-Error rejections › calls onError once with an Error whose cause is the thrown plain object and preserves the object rejection

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "hookCallCount": 1,
    -   "isErrorInstance": true,
    +   "hookCallCount": 0,
    +   "isErrorInstance": false,
        "sameCallerReference": true,
    -   "sameCauseReference": true,
    +   "sameCauseReference": false,
      }

  ● onError for non-Error rejections › calls onError once with an Error whose cause is undefined and preserves the undefined rejection

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
        "callerOutcome": Object {
          "reason": undefined,
          "rejected": true,
        },
    -   "hasCauseProperty": true,
    -   "hookCallCount": 1,
    -   "isErrorInstance": true,
    +   "hasCauseProperty": false,
    +   "hookCallCount": 0,
    +   "isErrorInstance": false,
        "reportedCause": undefined,
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}