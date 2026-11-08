I have defined the Definition of Done for ticket #95 "Call onError for a rejection that is not an Error" by creating and enhancing a set of executable acceptance tests that observe the reported failure.

### Strategy: `direct`
The `ChatOrchestrator` already possesses an `onError` hook and a `catch` block that handles rejections. The acceptance tests provide a provider that rejects with non-`Error` values (string, plain object, `undefined`, and `null`) and verify that `onError` is NOT called for these cases under the current implementation, which contains an `instanceof Error` gate. A final test confirms that `Error` instances still correctly reach the hook.

### Acceptance Tests
The tests are located in `src/orchestration/onError-non-error.acceptance.test.ts` and are linked to the updated "Error Handling" section in `specs/hal-engine-config-hooks/spec.md`. They assert that:
1. `onError` is called exactly once for every rejection.
2. If the rejection is not an `Error`, it is wrapped in one with the original value as its `cause`.
3. The original rejection reaches the caller unchanged.
4. Existing behavior for `Error` instances is preserved.

The tests fail as expected because the current code in `src/orchestration/chatOrchestrator.ts` bypasses `onError` for anything that isn't an `instanceof Error`.

### Failure Output
```text
FAIL src/orchestration/onError-non-error.acceptance.test.ts
  ● onError for non-Error rejections › calls onError for string rejection
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 0
    > 55 |     expect(callCount).toBe(1);

  ● onError for non-Error rejections › calls onError for object rejection
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 0
    > 83 |     expect(callCount).toBe(1);

  ● onError for non-Error rejections › calls onError for undefined rejection
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 0
    > 112 |     expect(callCount).toBe(1);

  ● onError for non-Error rejections › calls onError for null rejection
    expect(received).toBe(expected) // Object.is equality
    Expected: 1
    Received: 0
    > 141 |     expect(callCount).toBe(1);

Test Suites: 1 failed, 1 total
Tests:       4 failed, 1 passed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}