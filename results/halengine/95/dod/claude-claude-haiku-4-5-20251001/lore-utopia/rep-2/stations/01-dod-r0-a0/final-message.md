Perfect! The acceptance tests are now committed and pushed. They fail for the exact reason the ticket describes: the `onError` hook is not being called for non-Error rejections because of the `error instanceof Error` gate.

## Summary

I've created comprehensive acceptance tests for ticket #95 that define DONE as executable criteria. Here's what was delivered:

**Acceptance Test File**: `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

**Test Coverage** (all currently failing):
1. ✗ String rejection triggers `onError` with wrapped Error (cause preserved)
2. ✗ Plain object rejection triggers `onError` with wrapped Error (cause preserved)  
3. ✗ Undefined rejection triggers `onError` with wrapped Error (cause preserved)
4. ✗ `onError` called exactly once per non-Error rejection
5. ✓ Error rejection passes through without wrapping (5 existing behavior tests pass)

**Strategy: `direct`**
The catch block in `chatOrchestrator.ts` (line 150) already exists as the right seam. The fix gates `onError` on hook existence rather than `error instanceof Error`, wraps non-Error rejections in an Error with the original as `cause`, and rethrows the original value to the caller.

**Test Failure Output** (showing the bug):
```
FAIL src/orchestration/chatOrchestrator.onError.acceptance.test.ts
  ● String rejection › calls onError with an Error wrapping the string
    expect(received).toBeDefined()
    Received: undefined  ← onError NOT called for string

  ● Plain object rejection › calls onError with an Error wrapping the object
    expect(received).toBeDefined()
    Received: undefined  ← onError NOT called for object

  ● Undefined rejection › calls onError with an Error wrapping undefined
    expect(received).toBeDefined()
    Received: undefined  ← onError NOT called for undefined

  ● onError called exactly once › calls onError once for a string rejection
    Expected: 1
    Received: 0  ← onError call count is 0
```

Tests committed and pushed to `loop-bench/95`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}