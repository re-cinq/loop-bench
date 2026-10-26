Perfect! I've completed the first round of the TDD loop. Here's what I did:

## Summary

**RED phase**: Wrote a focused unit test `called when beforeSession throws` that validates:
- When `beforeSession` throws, `onError` hook is called with the error
- `afterSession` hook is called 
- Error propagates to caller
- Test initially failed as expected

**GREEN phase**: Made the minimal code change:
- Moved `beforeSession` from line 91 (outside try block) to inside the try block
- All 24 existing tests continue to pass

**REFACTOR phase**: No refactoring needed—the change is already simple and correct.

**Delivery**:
- Updated `.lore/dod.md` to mark first facet complete
- Committed with clear message explaining the fix
- Pushed to origin

The code now ensures that when `beforeSession` throws, both `onError` and `afterSession` hooks execute, fixing the issue where hooks were skipped on `beforeSession` failures.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}