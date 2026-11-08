I have defined the Definition of Done for ticket #95. I created a new acceptance test file `src/orchestration/onError.acceptance.test.ts` with four tests that exercise various rejection types (string, plain object, `undefined`, and `Error`). I also updated the `hal-engine-config-hooks` specification to replace the recorded flaw with the new guarantee and added a corresponding entry to the `CHANGELOG.md`.

The tests currently fail as expected because `chatOrchestrator.ts` only calls `onError` when the rejection is an instance of `Error`.

Failure output:
```
FAIL src/orchestration/onError.acceptance.test.ts
  ● onError Acceptance Tests › rejection with string calls onError with wrapped Error
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined

  ● onError Acceptance Tests › rejection with plain object calls onError with wrapped Error
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined

  ● onError Acceptance Tests › rejection with undefined calls onError with wrapped Error
    expect(received).toBeInstanceOf(expected)
    Expected constructor: Error
    Received value has no prototype
    Received value: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}