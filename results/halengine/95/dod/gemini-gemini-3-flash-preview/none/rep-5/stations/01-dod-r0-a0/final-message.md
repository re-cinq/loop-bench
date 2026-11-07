I have defined the **Definition of Done** for ticket #95 and implemented a set of **direct acceptance tests** that verify the required behavior.

I identified that `chatOrchestrator.ts` currently bypasses the `onError` hook when a provider rejection is not an instance of `Error` (e.g., a string, plain object, or `undefined`). I created a new acceptance test suite to pin the required behavior: `onError` must be called for every rejection, and non-Error values must be wrapped in an `Error` instance with the original value preserved as the `cause`.

### Definition of Done

The [DoD](.lore/dod.md) is established with the following strategy:

- **Strategy: `direct`** — The orchestrator's hooks seam allows us to inject a provider that rejects with various types and verify if `onError` is called with the expected wrapper.

### Acceptance tests

The following tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` currently **fail** as expected:

- **calls onError for a string rejection** — Fails because `onError` is not called.
- **calls onError for a plain object rejection** — Fails because `onError` is not called.
- **calls onError for an undefined rejection** — Fails because `onError` is not called.

The test for a standard `Error` instance passes, confirming that existing behavior is preserved.

### Failure output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator acceptance tests › calls onError for a string rejection

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined

  ● chatOrchestrator acceptance tests › calls onError for a plain object rejection

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined

  ● chatOrchestrator acceptance tests › calls onError for an undefined rejection

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined
```

I have also updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and added a corresponding entry to the `CHANGELOG.md`. All changes have been formatted and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}