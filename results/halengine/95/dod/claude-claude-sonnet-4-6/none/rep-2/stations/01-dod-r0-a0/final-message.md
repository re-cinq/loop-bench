Branch is clean and pushed. Here's the summary:

---

**Strategy: `direct`** — the `catch` block at `chatOrchestrator.ts:150` is the entry point; `createChatOrchestrator` with a throwing provider is a callable seam today.

**3 acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`, all red for the right reason:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● calls onError with a wrapped Error when the provider rejects with a string
    expect(received).toBe(expected)
    Expected: 1
    Received: 0        ← onError was never called

  ● calls onError with a wrapped Error when the provider rejects with a plain object
    Expected: 1 / Received: 0

  ● calls onError with a wrapped Error when the provider rejects with undefined
    Expected: 1 / Received: 0

Tests: 3 failed, 3 total
```

Each test fails at `expect(onErrorCallCount).toBe(1)` — `onError` is not called because the current `instanceof Error` gate skips it for strings, objects, and `undefined`. The fix is to remove that gate and wrap non-Error values in `new Error(…, {cause: originalValue})` before calling `onError`, while re-throwing the original value unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}