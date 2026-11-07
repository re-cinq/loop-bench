The Definition of Done for ticket #95 has been established as a set of acceptance tests in `src/orchestration/onError.acceptance.test.ts`. These tests verify that the `onError` hook is called for all rejections, including non-`Error` values, and that such values are wrapped in an `Error` with the original value as the `cause`.

I have also updated `specs/hal-engine-config-hooks/spec.md` to reflect this new guarantee and added a corresponding entry to `CHANGELOG.md`.

The tests currently fail because `onError` is bypassed for non-`Error` rejections:

```
FAIL src/orchestration/onError.acceptance.test.ts
  ● ChatOrchestrator onError acceptance › calls onError with a wrapped Error when provider rejects with a string

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      53 |
      54 |     // onError is called with an Error whose cause is that string
    > 55 |     expect(receivedError).toBeInstanceOf(Error);
         |                           ^
      56 |     expect(receivedError?.cause).toBe('string boom');

  ● ChatOrchestrator onError acceptance › calls onError with a wrapped Error when provider rejects with a plain object

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      77 |
      78 |     expect(caught).toBe(errorObj);
    > 79 |     expect(receivedError).toBeInstanceOf(Error);
         |                           ^
      80 |     expect(receivedError?.cause).toBe(errorObj);

  ● ChatOrchestrator onError acceptance › calls onError with a wrapped Error when provider rejects with undefined

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      100 |
      101 |     expect(caught).toBe(undefined);
    > 102 |     expect(receivedError).toBeInstanceOf(Error);
          |                           ^
      103 |     expect(receivedError?.cause).toBe(undefined);

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}