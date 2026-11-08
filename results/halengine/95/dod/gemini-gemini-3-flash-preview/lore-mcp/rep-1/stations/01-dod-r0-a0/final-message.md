I have defined "DONE" for ticket #95 by writing four acceptance tests in a new file `src/orchestration/onError-rejection.acceptance.test.ts`. These tests verify that the orchestrator calls `onError` for every rejection, including non-`Error` values (strings, plain objects, and `undefined`), while preserving the original rejection to the caller.

**Strategy: `direct`**
I used the existing orchestrator lifecycle to call `processMessage` with a provider that rejects with various types. The tests fail because the current implementation gates `onError` on `error instanceof Error`.

The following changes were committed and pushed:
- `.lore/dod.md`: Defined the acceptance criteria and strategy.
- `src/orchestration/onError-rejection.acceptance.test.ts`: Added the new acceptance tests.
- `specs/hal-engine-config-hooks/spec.md`: Updated to replace the "measured-flaw" section with the new guarantee and linked the tests.
- `CHANGELOG.md`: Added an entry to the `Fixed` section of `[Unreleased]`.

### Test Failure Output

```text
FAIL src/orchestration/onError-rejection.acceptance.test.ts
  ● onError rejection acceptance tests › rejects with a string calls onError with a wrapped Error

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      57 |
      58 |     expect(outcome).toBe('string boom');
    > 59 |     expect(capturedError).toBeInstanceOf(Error);
         |                           ^
      60 |     expect(capturedError?.cause).toBe('string boom');
      61 |   });

  ● onError rejection acceptance tests › rejects with a plain object calls onError with a wrapped Error

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      84 |
      85 |     expect(outcome).toBe(errorObj);
    > 86 |     expect(capturedError).toBeInstanceOf(Error);
         |                           ^
      87 |     expect(capturedError?.cause).toBe(errorObj);
      88 |   });

  ● onError rejection acceptance tests › rejects with undefined calls onError with a wrapped Error

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error

    Received value has no prototype
    Received value: undefined

      110 |
      111 |     expect(outcome).toBeUndefined();
    > 112 |     expect(capturedError).toBeInstanceOf(Error);
          |                           ^
      113 |     expect(capturedError?.cause).toBeUndefined();
      114 |   });

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}