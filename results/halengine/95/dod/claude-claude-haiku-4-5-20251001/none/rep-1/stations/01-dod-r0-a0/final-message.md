Perfect! I have successfully defined DONE for ticket #95 with executable acceptance tests. Here's what I've delivered:

## Summary

I've created three acceptance tests that verify the ticket's central claim: **`onError` must be called for every rejection, including those that are not `Error` instances**.

### Test file: `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

The tests verify:

1. **String rejection**: `onError` receives an `Error` instance with the string as `cause`, while the caller still gets the original string
2. **Plain object rejection**: `onError` receives an `Error` instance with the object as `cause`, while the caller still gets the original object  
3. **Undefined rejection**: `onError` receives an `Error` instance with `undefined` as `cause`, while the caller still gets `undefined`

### Failure output

All three tests fail for the correct reason — `onError` is currently bypassed:

```
expect(received).toEqual(expected)
- Expected: onErrorCalled: true, onErrorIsError: true, onErrorCause: "rejection string"
+ Received: onErrorCalled: false, onErrorIsError: false, onErrorCause: undefined

But callerReceivesOriginal: "rejection string" (rejection still propagates unchanged)
```

This confirms the bug: the catch block at `src/orchestration/chatOrchestrator.ts:150` gates `onError` on `error instanceof Error`, silently dropping non-Error rejections from monitoring while they still propagate to callers.

### Definition of Done

I've also created `.lore/dod.md` documenting:
- The central claim from the ticket (verbatim)
- Strategy: **`direct`** — the seam already exists in the catch block
- The four acceptance tests that must pass (three new, plus existing onError tests staying green)
- The faceted work: wrap non-Error rejections, call onError for all cases, re-throw originals unchanged

### Commits

The tests and `.lore/dod.md` are committed with attribution:
```
1b7d973 test(orchestrator): acceptance tests for onError with non-Error rejections
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}