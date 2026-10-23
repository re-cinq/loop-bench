Perfect! I've completed the first facet of this ticket. Here's what I did:

## Summary of this round

**Facet completed**: Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`.

### Changes made:
1. **Code fix** (`chatOrchestrator.ts`): Moved the `beforeSession` hook call from outside the try block (where it would escape error handling) to inside it, so errors from `beforeSession` now reach both the `catch` block (invoking `onError`) and the `finally` block (invoking `afterSession`).

2. **Unit test** (`chatOrchestrator.test.ts`): Added a test "when it throws, onError and afterSession are called" to verify that when `beforeSession` throws, both hooks execute properly and the error propagates to the caller.

3. **Test verification**: All 24 tests in `chatOrchestrator.test.ts` pass, confirming the fix works correctly.

### What's left
The remaining two facets for the next round:
- Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee for `beforeSession`
- Document in the CHANGELOG what changes for an existing consumer

The acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts` should now pass when CI runs it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}