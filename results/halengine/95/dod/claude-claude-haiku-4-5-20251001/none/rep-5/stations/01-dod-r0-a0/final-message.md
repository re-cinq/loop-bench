## Summary

I've created acceptance tests and Definition of Done for ticket #95. Here's what was delivered:

### Test File: `chatOrchestrator.onError-non-error.acceptance.test.ts`

Four acceptance tests covering the required behavior:

1. **String rejection** — Tests that a provider rejecting with a string results in `onError` being called with an Error wrapper (with the string as `cause`), while the caller receives the original string unchanged.

2. **Plain object rejection** — Tests that a rejection with a plain object results in `onError` receiving an Error wrapper with the object as `cause`, while caller receives the original object.

3. **Undefined rejection** — Tests that a rejection with `undefined` results in `onError` receiving an Error wrapper with `undefined` as `cause`, while caller receives the original `undefined`.

4. **Error rejection** — Tests that an Error instance passes through as-is (same instance) to both `onError` and caller, with no wrapping.

### Definition of Done: `.lore/dod.md`

Documents the ticket's requirement, strategy, and acceptance criteria with clear file references.

### Test Failure Output

All three non-Error cases fail as expected:

```
  ● string rejection › calls onError with an Error wrapper whose cause is the string
    Expected: onErrorWasCalledWith has isError: true, message, and cause: "rejected with string"
    Received: onErrorWasCalledWith: null
    
  ● plain object rejection › calls onError with an Error wrapper whose cause is the object
    Expected: onErrorWasCalledWith has isError: true and cause: {errorCode, message}
    Received: onErrorWasCalledWith: null
    
  ● undefined rejection › calls onError with an Error wrapper whose cause is undefined
    Expected: onErrorCalled: true, onErrorCause: undefined
    Received: onErrorCalled: false
```

The Error rejection test passes (1 passed, 3 failed).

This is the correct red bar. The code currently gates `onError` on `error instanceof Error` (line 150 of chatOrchestrator.ts), causing non-Error rejections to bypass the hook entirely.

---

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}