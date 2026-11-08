I have defined the **Definition of Done** for ticket #95 and implemented the corresponding acceptance tests. 

The strategy used was `direct`, leveraging the `createChatOrchestrator` factory to install an `onError` hook and verify its behavior when the provider rejects with non-`Error` values.

### Changes:
- Created `src/orchestration/onError.acceptance.test.ts` with four tests covering rejections with strings, plain objects, `undefined`, and `Error` instances.
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the "Measured semantics" out-of-scope section with the new guarantee that `onError` is called for all rejections.
- Added a "Fixed" entry to `CHANGELOG.md` describing the change in behavior.
- Initialized and completed the DoD in `.lore/dod.md`.
- Formatted all modified files with Prettier.

### Test Failure Output:
The acceptance tests failed as expected because the current implementation bypasses `onError` for non-`Error` rejections:

```text
FAIL src/orchestration/onError.acceptance.test.ts
  ● onError acceptance tests › calls onError with a wrapped Error when a provider rejects with a string

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined

  ● onError acceptance tests › calls onError with a wrapped Error when a provider rejects with a plain object

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined

  ● onError acceptance tests › calls onError with a wrapped Error when a provider rejects with undefined

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value: undefined

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}