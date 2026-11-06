The branch is pushed and up to date. Here's the summary:

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and the `catch` block at line 150 of `chatOrchestrator.ts` is the exact seam. Tests inject a throwing provider and observe whether `onError` fires.

**Three acceptance tests** in `src/orchestration/onErrorNonError.acceptance.test.ts`, all failing for the right reason:

```
● calls onError when the provider rejects with a string ...
  expect(received).toHaveLength(expected)
  Expected length: 1, Received length: 0 — []

● calls onError when the provider rejects with a plain object ...
  expect(received).toHaveLength(expected)
  Expected length: 1, Received length: 0 — []

● calls onError when the provider rejects with undefined ...
  expect(received).toHaveLength(expected)
  Expected length: 1, Received length: 0 — []
```

Each test fails because `onError` is never called (the `instanceof Error` gate at line 150 blocks it for non-Error rejections). Once the fix removes that guard and wraps non-Error values in `new Error(..., {cause: original})`, all three will go green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}