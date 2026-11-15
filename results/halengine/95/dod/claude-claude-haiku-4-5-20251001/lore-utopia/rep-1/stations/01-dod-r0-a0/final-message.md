## Summary

I've successfully created acceptance tests for ticket #95 "Call onError for a rejection that is not an Error". 

**Strategy: `direct`** — The orchestrator's `processMessage` entry point already exists, allowing us to test the real catch block directly and observe whether the onError hook receives wrapped or original rejections.

### Tests Created

Four acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`:

1. **calls onError with Error wrapping a string rejection, preserving the string as cause** — Tests that string rejections trigger onError and are wrapped in an Error with the string as cause, while the caller receives the original string
2. **calls onError with Error wrapping a plain object rejection, preserving the object as cause** — Tests plain object rejections are wrapped in Error with the object as cause
3. **calls onError with Error wrapping an undefined rejection, preserving undefined as cause** — Tests undefined rejections are wrapped in Error with undefined as cause
4. **calls onError with the same Error instance for Error rejections, not wrapped** — Tests Error instances pass through unchanged (this one passes, showing existing behavior is preserved)

### Test Failure Output

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError for non-Error rejections › calls onError with Error wrapping a string rejection, preserving the string as cause

    expect(received).toBeInstanceOf(expected)

    Expected constructor: Error
    Received value has no prototype
    Received value: undefined

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:54:27)
```

The tests fail for the **right reason**: the `catch` block at line 150 of `chatOrchestrator.ts` gates `onError` on `error instanceof Error`, so non-Error rejections bypass the hook entirely and `receivedError` stays `undefined`.

### Deliverables

- ✅ Acceptance tests written and committed
- ✅ `.lore/dod.md` created documenting the strategy and test names
- ✅ Code formatted with prettier
- ✅ Committed and pushed to `loop-bench/95` branch
- ✅ Tests failing for the correct reason (the ticket's stated problem)

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}