I have defined the **Definition of Done** for ticket #95 and implemented a set of **acceptance tests** that reproduce the reported bug.

### Triage & Strategy
**Strategy: `direct`**
The `chatOrchestrator` already contains the `try/catch` block that fires the `onError` hook. The bug is an explicit `instanceof Error` gate that skips the hook for non-Error rejections (like strings or plain objects). I used a `direct` strategy, calling the orchestrator's real entry point with a provider that rejects with these values.

### Definition of Done
The DoD is recorded in `.lore/dod.md`. It defines success as `onError` being called exactly once for string, object, and `undefined` rejections, with the value wrapped in an `Error` (preserving the original as `.cause`), while the caller still receives the original rejection.

### Acceptance Tests
I created a new acceptance test file: `src/orchestration/onError-non-error.acceptance.test.ts`.
It contains two tests:
1. **"wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original"**: This test iterates through `string`, `object`, and `undefined` rejections. It asserts that `onError` is called, the received error is an `Error` instance with the correct `cause`, and the caller's rejection matches the original value by identity.
2. **"does not wrap a rejection that is already an Error"**: This pins the existing behavior to ensure no double-wrapping occurs for standard `Error` instances.

### Verification (Red Bar)
I ran the tests using `npm test`, and they failed for the exact reason stated in the ticket: `onErrorCallCount` was `0` and the hook was never triggered for non-Error rejections.

```text
FAIL src/orchestration/onError-non-error.acceptance.test.ts
  ● onError (acceptance) › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "cause": "string boom",
    -   "isError": true,
    +   "cause": undefined,
    +   "isError": false,
        "name": "string",
    -   "onErrorCallCount": 1,
    +   "onErrorCallCount": 0,
        "rejection": "string boom",
      }
```

### Documentation & Traceability
- **Spec**: Updated `specs/hal-engine-config-hooks/spec.md` to remove the "out of scope" flaw and added a normative guarantee citing the new acceptance test.
- **Changelog**: Added an entry to `CHANGELOG.md` under `[Unreleased] > Fixed` explaining the change for consumers.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}