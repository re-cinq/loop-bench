Pushed and up to date. Here's the summary:

**Strategy: `direct`** — The seam already exists. `createChatOrchestrator` accepts an `onError` hook; a provider that throws a non-Error value exercises the existing `catch` block directly.

**Three acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`, all failing for the right reason:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● calls onError with wrapped Error when provider rejects with a string, and re-throws the original string
    expect(onErrorCallCount).toBe(1);  →  Expected: 1 / Received: 0

  ● calls onError with wrapped Error when provider rejects with a plain object, and re-throws the original object
    expect(onErrorArg).toBeInstanceOf(Error);  →  Received value: undefined

  ● calls onError with wrapped Error when provider rejects with undefined, and re-throws undefined
    expect(onErrorCalled).toBe(true);  →  Expected: true / Received: false
```

Each test fails because the current `if (hooks?.onError && error instanceof Error)` gate in `chatOrchestrator.ts:150` silently drops the `onError` call when the rejection is not an `Error` instance — exactly the claim the ticket makes. The fix is to remove the `instanceof` gate, wrapping non-Error values before passing them to the hook.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}