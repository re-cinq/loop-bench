I have defined the Definition of Done for ticket #95. I created a new acceptance test file `src/orchestration/onError.acceptance.test.ts` with four tests covering string, object, `undefined`, and `Error` rejections. I verified that the first three tests fail because `onError` is currently bypassed for non-`Error` rejections, while the fourth test passes as it validates the existing correct behavior for `Error` instances. I also updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and linked the new tests, and added a corresponding entry to `CHANGELOG.md`.

### Failure Output
```
FAIL src/orchestration/onError.acceptance.test.ts
  ● onError acceptance tests › calls onError for string rejection
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined
      47 |     expect(capturedError).toBeInstanceOf(Error);

  ● onError acceptance tests › calls onError for object rejection
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined
      80 |     expect(capturedError).toBeInstanceOf(Error);

  ● onError acceptance tests › calls onError for undefined rejection
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined
      111 |     expect(capturedError).toBeInstanceOf(Error);

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}