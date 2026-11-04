Perfect! I've defined the acceptance tests that validate the ticket #95 requirements. Here's what I created:

## Summary

I've written **4 acceptance tests** in `/src/orchestration/chatOrchestrator.acceptance.test.ts` that verify the ticket's central claim: **onError must be called for every rejection, not just Error instances**.

### Test Failures (as Expected)

The test output shows **3 failures and 1 pass**:

1. ❌ **calls onError with Error wrapper when provider rejects with string** — `onError` not called (callCount=0)
2. ❌ **calls onError with Error wrapper when provider rejects with plain object** — `onError` not called (callCount=0)
3. ❌ **calls onError with Error wrapper when provider rejects with undefined** — `onError` not called (callCount=0)
4. ✅ **passes Error instance unchanged to onError when provider rejects with Error** — Already works

### Why They Fail (Correctly)

All three failures are for the RIGHT reason: Lines 150-152 of `chatOrchestrator.ts` contain `if (hooks?.onError && error instanceof Error)`, which gates `onError` invocation on the error being an Error instance. Non-Error rejections bypass the hook entirely.

### What the Tests Validate

Each test verifies:
- The hook is called exactly once for non-Error rejections
- The hook receives an `Error` instance (wrapper)
- The original rejection is preserved as the `cause` property
- The **original rejection is re-thrown unchanged** to the caller (not the wrapper)

### Definition of Done

I've created `.lore/dod.md` documenting the ticket's central claim, the direct strategy, and the four acceptance tests that define completion.

**Branch status**: Committed and pushed to `origin/loop-bench/95`, up to date with `origin/main`.

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}