The acceptance tests are already committed and pushed (commit `77b572f`). The tests fail for the right reason — `onErrorCallCount` received 0, expected 1 — because the `instanceof Error` gate at `chatOrchestrator.ts:L150` blocks non-Error rejections. The `.lore/dod.md` is also committed with the correct strategy and test list.

Everything is already in place. The red bar is confirmed:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● calls onError with a wrapped Error when the provider rejects with a string, and re-throws the original string
    expect(received).toBe(expected)
    Expected: 1
    Received: 0

  ● calls onError with a wrapped Error when the provider rejects with a plain object, and re-throws the original object
    Expected: 1
    Received: 0

  ● calls onError with a wrapped Error when the provider rejects with undefined, and re-throws undefined
    Expected: 1
    Received: 0

Tests: 3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}