Perfect! The Definition of Done is properly set up. Here's what I found:

## Summary

The acceptance tests for ticket #95 "Call onError for a rejection that is not an Error" are already in place and failing as expected. The tests comprehensively cover the ticket's acceptance criteria:

### Test File Location
`src/orchestration/chatOrchestrator.acceptance.test.ts`

### Tests Status
Running the tests confirms they fail for the RIGHT reason (the feature is not yet implemented):

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

**Failing tests (red bar):**
1. ✗ **calls onError with an Error wrapping a string rejection, and the caller receives the original string** — onError not called for string rejections
2. ✗ **calls onError with an Error wrapping a plain object rejection, and the caller receives the original object** — onError not called for object rejections  
3. ✗ **calls onError with an Error wrapping an undefined rejection, and the caller receives the original undefined** — onError not called for undefined rejections

**Passing test (green bar):**
4. ✓ **passes an Error rejection as the same instance to onError, not wrapped** — existing behavior for Error instances is correct

### Failure Details
The tests fail because `onError` is not being called for non-Error rejections. The current code at `src/orchestration/chatOrchestrator.ts:150` checks `error instanceof Error` before calling the hook, causing non-Error rejections to bypass `onError` entirely.

### Definition of Done
The `.lore/dod.md` file documents:
- **Strategy**: `direct` — A seam already exists in the catch block
- **Test names**: Four tests covering string, object, undefined, and Error rejections
- **Facets**: The three implementation steps needed

### Branch Status
- Branch: `loop-bench/95`
- Status: up to date with origin
- Working tree: clean

The acceptance tests are ready and properly define the done criteria for this ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}