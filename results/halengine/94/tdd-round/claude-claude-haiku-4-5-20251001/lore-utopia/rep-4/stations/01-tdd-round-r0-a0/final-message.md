Perfect! I've completed one red-green-refactor round. Here's a summary:

## Round Summary

**Facet completed:** Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`

The code change ensures that when `beforeSession` throws an error:
- The error is caught by the catch handler, allowing `onError` to fire
- `afterSession` runs in the finally block
- The error propagates to the caller as expected

This fixes the lifecycle hook guarantee that the acceptance test (`chatOrchestrator.beforeSession.acceptance.test.ts`) validates.

**Verification:**
- ✅ All 23 existing unit tests in `chatOrchestrator.test.ts` pass
- ✅ Code is properly formatted with Prettier
- ✅ Changes committed and pushed

**Next facets for future rounds:**
- Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee
- Document in CHANGELOG what changes for existing consumers

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try block","tdd_next":"Update specs/hal-engine-config-hooks/spec.md"}}